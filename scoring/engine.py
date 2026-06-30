"""
ArgusIQ Scoring Engine
SRS = (Operational × 0.35) + (Financial × 0.30) + (Compliance × 0.20) + (Sentiment × 0.15)
Higher score = LOWER risk = safer supplier (0 is worst, 100 is best)
"""


def normalize(value, min_val, max_val, higher_is_better=True):
    """
    Convert any raw value to a 0-100 score.
    Examples:
      normalize(97, 50, 100) → 94.0   (good on-time rate)
      normalize(3.4, 0, 7, False) → 51.4  (high delay = bad)
      normalize(0, 0, 20, False) → 100.0  (zero complaints = perfect)
    """
    if max_val == min_val:
        return 50.0
    normalized = (value - min_val) / (max_val - min_val) * 100
    normalized = max(0.0, min(100.0, normalized))
    if not higher_is_better:
        normalized = 100.0 - normalized
    return round(normalized, 2)


def score_operational(op: dict) -> dict:
    """Operational Health — 35% of SRS"""
    s_delivery  = normalize(op["on_time_delivery"], 40, 100)
    s_delay     = normalize(op["avg_dispatch_delay"], 0, 7, higher_is_better=False)
    s_fill      = normalize(op["order_fill_rate"], 50, 100)
    s_return    = normalize(op["return_rate"], 0, 20, higher_is_better=False)
    s_sla       = normalize(op["sla_breaches"], 0, 15, higher_is_better=False)

    score = (s_delivery * 0.30 + s_delay * 0.25 + s_fill * 0.20
             + s_return * 0.15 + s_sla * 0.10)

    # Find the weakest signal for explanation
    signals = {
        "on-time delivery": s_delivery,
        "dispatch delay":   s_delay,
        "order fill rate":  s_fill,
        "return/defect rate": s_return,
        "SLA breaches":     s_sla,
    }
    weakest = min(signals, key=signals.get)

    return {
        "score": round(score, 2),
        "breakdown": {k: round(v, 1) for k, v in signals.items()},
        "weakest_signal": weakest,
        "weakest_value": round(signals[weakest], 1),
    }


def score_financial(fin: dict) -> dict:
    """Financial Stability — 30% of SRS"""
    s_gst_reg   = normalize(fin["gst_filing_regularity"], 20, 100)
    s_gst_days  = normalize(fin["days_since_gst_return"], 0, 60, higher_is_better=False)
    s_payment   = normalize(fin["payment_delay_history"], 20, 100)
    s_credit    = normalize(fin["credit_score"], 20, 100)
    s_bank      = 90.0 if fin["bank_stability"] else 20.0

    score = (s_gst_reg * 0.30 + s_gst_days * 0.20 + s_payment * 0.25
             + s_credit * 0.15 + s_bank * 0.10)

    signals = {
        "GST filing regularity": s_gst_reg,
        "GST return recency":    s_gst_days,
        "payment history":       s_payment,
        "credit score":          s_credit,
        "bank stability":        s_bank,
    }
    weakest = min(signals, key=signals.get)

    return {
        "score": round(score, 2),
        "breakdown": {k: round(v, 1) for k, v in signals.items()},
        "weakest_signal": weakest,
        "weakest_value": round(signals[weakest], 1),
    }


def score_compliance(comp: dict) -> dict:
    """Compliance & Regulatory — 20% of SRS"""
    s_bis       = 90.0 if comp["bis_fssai_valid"] else 5.0
    s_gst_reg   = 95.0 if comp["gst_active"] else 5.0
    s_notices   = normalize(comp["regulatory_notices"], 0, 5, higher_is_better=False)
    s_expiry    = normalize(max(0, comp["licence_expiry_days"]), 0, 365)

    score = (s_gst_reg * 0.30 + s_bis * 0.25 + s_notices * 0.20 + s_expiry * 0.15
             + 80.0 * 0.10)   # export compliance placeholder

    # Anomaly: BIS/FSSAI lapse OR GST inactive OR 3+ regulatory notices
    anomaly = (not comp["bis_fssai_valid"]
               or not comp["gst_active"]
               or comp["regulatory_notices"] >= 3)

    signals = {
        "BIS/FSSAI licence":  s_bis,
        "GST registration":   s_gst_reg,
        "regulatory notices": s_notices,
        "licence expiry":     s_expiry,
    }
    weakest = min(signals, key=signals.get)

    return {
        "score": round(score, 2),
        "breakdown": {k: round(v, 1) for k, v in signals.items()},
        "weakest_signal": weakest,
        "weakest_value": round(signals[weakest], 1),
        "anomaly_flag": anomaly,
        "anomaly_reason": (
            "BIS/FSSAI licence expired" if not comp["bis_fssai_valid"] else
            "GST registration inactive" if not comp["gst_active"] else
            f"{comp['regulatory_notices']} regulatory notices pending" if comp["regulatory_notices"] >= 3 else
            None
        ),
    }


def score_sentiment(sent: dict) -> dict:
    """Sentiment & Reputation — 15% of SRS"""
    s_news      = normalize(sent["avg_sentiment"], -1.0, 1.0)
    s_social    = normalize(sent["social_polarity"], -1.0, 1.0)
    s_reviews   = normalize(sent["review_score"], 1.0, 5.0)
    s_complaints= normalize(sent["complaint_signals"], 0, 20, higher_is_better=False)
    s_controversy= 15.0 if sent["controversy_flag"] else 90.0

    score = (s_reviews * 0.30 + s_news * 0.25 + s_social * 0.20
             + s_complaints * 0.15 + s_controversy * 0.10)

    signals = {
        "news sentiment":     s_news,
        "social polarity":    s_social,
        "buyer reviews":      s_reviews,
        "complaint signals":  s_complaints,
        "controversy flag":   s_controversy,
    }
    weakest = min(signals, key=signals.get)

    return {
        "score": round(score, 2),
        "breakdown": {k: round(v, 1) for k, v in signals.items()},
        "weakest_signal": weakest,
        "weakest_value": round(signals[weakest], 1),
    }


def compute_srs(supplier: dict) -> dict:
    """
    MASTER FUNCTION — computes full ArgusIQ Supplier Risk Score.
    Call this with any supplier dict from mock_data.py.
    """
    op   = score_operational(supplier["operational"])
    fin  = score_financial(supplier["financial"])
    comp = score_compliance(supplier["compliance"])
    sent = score_sentiment(supplier["sentiment"])

    # Weighted composite
    srs = round(
        op["score"]   * 0.35
        + fin["score"]  * 0.30
        + comp["score"] * 0.20
        + sent["score"] * 0.15,
        2
    )

    # Anomaly override: compliance failure forces score into HIGH RISK band
    anomaly_triggered = comp["anomaly_flag"]
    if anomaly_triggered and srs > 49:
        srs = min(srs, 49.0)

    # Risk band
    if srs >= 75:
        band, color = "LOW RISK", "green"
    elif srs >= 50:
        band, color = "MODERATE", "yellow"
    elif srs >= 25:
        band, color = "HIGH RISK", "orange"
    else:
        band, color = "CRITICAL", "red"

    # Anomaly detection: did score drop 10+ points from previous?
    history = supplier.get("score_history", [srs])
    score_drop = (history[-2] - srs) if len(history) >= 2 else 0
    anomaly_drop = score_drop >= 10

    # Top 3 risk drivers (lowest sub-score dimensions first)
    dimensions = [
        ("Operational",  op["score"],   op["weakest_signal"],   op["weakest_value"]),
        ("Financial",    fin["score"],  fin["weakest_signal"],  fin["weakest_value"]),
        ("Compliance",   comp["score"], comp["weakest_signal"], comp["weakest_value"]),
        ("Sentiment",    sent["score"], sent["weakest_signal"], sent["weakest_value"]),
    ]
    top_risks = sorted(dimensions, key=lambda x: x[1])[:3]

    # Plain-English explanation
    explanation = _build_explanation(
        supplier["name"], srs, band,
        op, fin, comp, sent,
        anomaly_triggered, comp.get("anomaly_reason")
    )

    return {
        "supplier_id":       supplier["id"],
        "supplier_name":     supplier["name"],
        "category":          supplier["category"],
        "location":          supplier["location"],
        "srs":               srs,
        "risk_band":         band,
        "color":             color,
        "anomaly_triggered": anomaly_triggered or anomaly_drop,
        "anomaly_reason":    comp.get("anomaly_reason") or (
            f"Score dropped {round(score_drop, 1)} points" if anomaly_drop else None
        ),
        "sub_scores": {
            "operational": op["score"],
            "financial":   fin["score"],
            "compliance":  comp["score"],
            "sentiment":   sent["score"],
        },
        "sub_score_details": {
            "operational": op["breakdown"],
            "financial":   fin["breakdown"],
            "compliance":  comp["breakdown"],
            "sentiment":   sent["breakdown"],
        },
        "top_risk_drivers": [
            {
                "dimension":    d,
                "sub_score":    round(sc, 1),
                "key_signal":   sig,
                "signal_score": sv,
            }
            for d, sc, sig, sv in top_risks
        ],
        "score_history":  history,
        "explanation":    explanation,
    }


def _build_explanation(name, srs, band, op, fin, comp, sent,
                        anomaly, anomaly_reason) -> str:
    parts = []
    if anomaly and anomaly_reason:
        parts.append(f"⚠️ ANOMALY: {anomaly_reason}.")
    if op["score"] < 55:
        parts.append(f"Operational performance is weak — {op['weakest_signal']} is the primary issue.")
    if fin["score"] < 55:
        parts.append(f"Financial health is stressed — particularly {fin['weakest_signal']}.")
    if comp["score"] < 55:
        parts.append(f"Compliance risk is high — {comp['weakest_signal']} needs urgent attention.")
    if sent["score"] < 45:
        parts.append("Negative market sentiment and buyer complaints are elevated.")
    if not parts:
        parts.append(f"{name} is performing well across all dimensions.")
    return f"{name} scores {srs}/100 ({band}). " + " ".join(parts)