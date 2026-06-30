"""
ArgusIQ API Routes
5 endpoints that power the entire frontend.
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

from scoring.mock_data import get_all_suppliers, get_supplier_by_id
from scoring.engine import compute_srs
from scoring.forecast import forecast_14_days
from agents.supplier_agent import chat_with_agent

router = APIRouter()


# ── 1. Health check ──────────────────────────────────────────────────────────
@router.get("/health")
def health():
    """Required by Render for free-tier deployment."""
    return {"status": "ok", "service": "ArgusIQ API", "version": "1.0.0"}


# ── 2. Portfolio ──────────────────────────────────────────────────────────────
@router.get("/portfolio")
def get_portfolio():
    """
    Returns all 10 suppliers scored and sorted by risk (riskiest first).
    This is what loads the Portfolio Dashboard.
    """
    suppliers = get_all_suppliers()
    scored = []

    for s in suppliers:
        result = compute_srs(s)
        fc = forecast_14_days(s["score_history"])
        scored.append({
            "id":              result["supplier_id"],
            "name":            result["supplier_name"],
            "category":        result["category"],
            "location":        result["location"],
            "srs":             result["srs"],
            "risk_band":       result["risk_band"],
            "color":           result["color"],
            "anomaly":         result["anomaly_triggered"],
            "anomaly_reason":  result.get("anomaly_reason"),
            "score_history":   s["score_history"],
            "forecast_14d":    fc["forecast_14_days"],
            "trend":           fc["trend"],
            "top_driver":      result["top_risk_drivers"][0] if result["top_risk_drivers"] else None,
        })

    # Sort riskiest first (lowest SRS at top)
    scored.sort(key=lambda x: x["srs"])

    summary = {
        "total":    len(scored),
        "critical": sum(1 for s in scored if s["color"] == "red"),
        "high":     sum(1 for s in scored if s["color"] == "orange"),
        "moderate": sum(1 for s in scored if s["color"] == "yellow"),
        "low":      sum(1 for s in scored if s["color"] == "green"),
    }

    return {"summary": summary, "suppliers": scored}


# ── 3. Supplier detail ────────────────────────────────────────────────────────
@router.get("/suppliers/{supplier_id}")
def get_supplier(supplier_id: str):
    """
    Returns the full detail for one supplier:
    SRS, sub-scores, anomaly, risk drivers, score history, 14-day forecast.
    """
    s = get_supplier_by_id(supplier_id)
    if not s:
        raise HTTPException(status_code=404, detail=f"Supplier '{supplier_id}' not found")

    result = compute_srs(s)
    fc = forecast_14_days(s["score_history"])

    return {
        **result,
        "forecast": fc,
        "score_history_full": [
            {"day": i + 1, "srs": v}
            for i, v in enumerate(s["score_history"])
        ],
    }


# ── 4. Alerts ────────────────────────────────────────────────────────────────
@router.get("/alerts")
def get_alerts():
    """
    Returns all suppliers in HIGH RISK or CRITICAL band,
    plus any with anomaly flags. Powers the Alerts screen.
    """
    suppliers = get_all_suppliers()
    alerts = []

    for s in suppliers:
        result = compute_srs(s)
        fc = forecast_14_days(s["score_history"])

        if result["color"] in ("red", "orange") or result["anomaly_triggered"]:
            alerts.append({
                "id":             result["supplier_id"],
                "name":           result["supplier_name"],
                "category":       result["category"],
                "location":       result["location"],
                "srs":            result["srs"],
                "risk_band":      result["risk_band"],
                "color":          result["color"],
                "anomaly":        result["anomaly_triggered"],
                "anomaly_reason": result.get("anomaly_reason"),
                "anomaly_message": (
                    result.get("anomaly_reason") or
                    f"Score at {result['srs']} — {result['risk_band']}"
                ),
                "forecast_14d":   fc["forecast_14_days"],
                "days_to_high_risk": fc.get("days_to_high_risk"),
                "trend":          fc["trend"],
                "explanation":    result["explanation"],
                "top_driver":     result["top_risk_drivers"][0] if result["top_risk_drivers"] else None,
            })

    alerts.sort(key=lambda x: x["srs"])

    return {
        "alert_count": len(alerts),
        "alerts": alerts,
    }


# ── 5. AI Chat ───────────────────────────────────────────────────────────────
class ChatRequest(BaseModel):
    message: str
    supplier_id: Optional[str] = None


@router.post("/chat")
def chat(req: ChatRequest):
    """
    Accepts a natural language question.
    Calls Claude API with full portfolio context.
    Falls back gracefully if API is unavailable.
    """
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    reply = chat_with_agent(req.message.strip(), req.supplier_id)
    return {"reply": reply, "supplier_id": req.supplier_id}


# ── 6. Compare two suppliers ─────────────────────────────────────────────────
@router.get("/compare")
def compare(id1: str, id2: str):
    """Compare two suppliers side by side."""
    s1 = get_supplier_by_id(id1)
    s2 = get_supplier_by_id(id2)
    if not s1 or not s2:
        raise HTTPException(status_code=404, detail="One or both supplier IDs not found")

    r1 = compute_srs(s1)
    r2 = compute_srs(s2)
    better = r1["supplier_name"] if r1["srs"] > r2["srs"] else r2["supplier_name"]

    return {
        "supplier_1": r1,
        "supplier_2": r2,
        "recommendation": better,
        "summary": f"{better} is the safer choice based on current SRS scores.",
    }