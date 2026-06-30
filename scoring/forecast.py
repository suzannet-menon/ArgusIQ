"""
ArgusIQ 14-Day Risk Forecast
Uses simple linear regression on score history.
No external ML library needed — pure Python math.
"""


def forecast_14_days(score_history: list) -> dict:
    """
    Given a list of past SRS scores, predicts the score 14 days from now
    and calculates how many days until the supplier hits HIGH RISK (score < 50).
    """
    if not score_history or len(score_history) < 3:
        last = score_history[-1] if score_history else 50
        return {
            "forecast_14_days": last,
            "trend": "stable",
            "days_to_high_risk": None,
            "days_to_critical": None,
            "slope": 0.0,
            "forecast_available": False,
        }

    n = len(score_history)
    x_mean = (n - 1) / 2
    y_mean = sum(score_history) / n

    numerator   = sum((i - x_mean) * (score_history[i] - y_mean) for i in range(n))
    denominator = sum((i - x_mean) ** 2 for i in range(n))
    slope = numerator / denominator if denominator != 0 else 0.0

    current = score_history[-1]
    forecast = max(0.0, min(100.0, round(current + slope * 14, 1)))

    # Trend label
    if slope > 1.0:
        trend = "improving"
    elif slope < -1.0:
        trend = "declining"
    else:
        trend = "stable"

    # Days until HIGH RISK threshold (score drops to 49)
    days_to_high_risk = None
    if slope < 0 and current > 50:
        raw = (50 - current) / slope
        if 0 < raw <= 90:
            days_to_high_risk = round(raw)

    # Days until CRITICAL threshold (score drops to 24)
    days_to_critical = None
    if slope < 0 and current > 25:
        raw = (25 - current) / slope
        if 0 < raw <= 180:
            days_to_critical = round(raw)

    # Human-readable prediction text
    if days_to_high_risk:
        prediction = (
            f"At the current trend, this supplier will hit HIGH RISK "
            f"in approximately {days_to_high_risk} days."
        )
    elif trend == "improving":
        prediction = f"Score is improving. Projected to reach {forecast} in 14 days."
    elif trend == "declining":
        prediction = f"Score is slowly declining. Monitor closely over the next 14 days."
    else:
        prediction = f"Score is expected to remain stable around {current}."

    return {
        "forecast_14_days":  forecast,
        "trend":             trend,
        "slope":             round(slope, 3),
        "days_to_high_risk": days_to_high_risk,
        "days_to_critical":  days_to_critical,
        "prediction_text":   prediction,
        "forecast_available": True,
    }