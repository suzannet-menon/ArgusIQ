"""
ArgusIQ — Mock Supplier Data
10 realistic Indian suppliers with pre-calibrated risk profiles.
Distribution: 2 CRITICAL, 3 HIGH RISK, 3 MODERATE, 2 LOW RISK
"""

SUPPLIERS = [
    # ── CRITICAL (SRS ~16-18) ──────────────────────────────────────
    {
        "id": "S001",
        "name": "Delhi Spice Co.",
        "category": "Food",
        "location": "Delhi NCR",
        "gstin": "07AADCD1234B1Z3",
        "operational": {
            "on_time_delivery": 58,
            "avg_dispatch_delay": 4.8,
            "order_fill_rate": 70,
            "return_rate": 14,
            "sla_breaches": 11
        },
        "financial": {
            "gst_filing_regularity": 30,
            "days_since_gst_return": 55,
            "payment_delay_history": 35,
            "credit_score": 28,
            "bank_stability": False
        },
        "compliance": {
            "bis_fssai_valid": False,   # FSSAI licence EXPIRED — anomaly trigger
            "gst_active": True,
            "regulatory_notices": 4,
            "licence_expiry_days": -5   # already expired
        },
        "sentiment": {
            "avg_sentiment": -0.62,
            "social_polarity": -0.50,
            "review_score": 2.1,
            "complaint_signals": 18,
            "controversy_flag": True
        },
        "score_history": [28, 26, 24, 22, 20, 19, 18, 17, 16, 16],
        "target_srs": 16
    },
    {
        "id": "S002",
        "name": "Sunrise Cosmetics",
        "category": "Beauty",
        "location": "Himachal Pradesh",
        "gstin": "02AABCS9988C1Z1",
        "operational": {
            "on_time_delivery": 55,
            "avg_dispatch_delay": 5.2,
            "order_fill_rate": 68,
            "return_rate": 16,
            "sla_breaches": 12
        },
        "financial": {
            "gst_filing_regularity": 25,
            "days_since_gst_return": 58,
            "payment_delay_history": 30,
            "credit_score": 22,
            "bank_stability": False
        },
        "compliance": {
            "bis_fssai_valid": False,   # Compliance collapse
            "gst_active": False,        # GST inactive — double anomaly
            "regulatory_notices": 5,
            "licence_expiry_days": -12
        },
        "sentiment": {
            "avg_sentiment": -0.55,
            "social_polarity": -0.45,
            "review_score": 1.9,
            "complaint_signals": 21,
            "controversy_flag": True
        },
        "score_history": [30, 28, 26, 24, 22, 21, 20, 19, 18, 18],
        "target_srs": 18
    },

    # ── HIGH RISK (SRS ~32-47) ─────────────────────────────────────
    {
        "id": "S003",
        "name": "Sharma Textiles Pvt Ltd",
        "category": "Fashion",
        "location": "Surat",
        "gstin": "24AABCS1429B1ZB",
        "operational": {
            "on_time_delivery": 61,
            "avg_dispatch_delay": 3.4,
            "order_fill_rate": 78,
            "return_rate": 12,
            "sla_breaches": 8
        },
        "financial": {
            "gst_filing_regularity": 55,
            "days_since_gst_return": 42,
            "payment_delay_history": 52,
            "credit_score": 48,
            "bank_stability": True
        },
        "compliance": {
            "bis_fssai_valid": True,
            "gst_active": True,
            "regulatory_notices": 3,
            "licence_expiry_days": 15
        },
        "sentiment": {
            "avg_sentiment": -0.45,
            "social_polarity": -0.30,
            "review_score": 2.8,
            "complaint_signals": 12,
            "controversy_flag": True
        },
        "score_history": [58, 56, 54, 52, 50, 49, 48, 47, 47, 47],
        "target_srs": 47
    },
    {
        "id": "S004",
        "name": "Ravi Electronics",
        "category": "Electronics",
        "location": "Mumbai",
        "gstin": "27AADCR3848M1Z3",
        "operational": {
            "on_time_delivery": 65,
            "avg_dispatch_delay": 3.1,
            "order_fill_rate": 75,
            "return_rate": 10,
            "sla_breaches": 7
        },
        "financial": {
            "gst_filing_regularity": 42,
            "days_since_gst_return": 48,
            "payment_delay_history": 45,
            "credit_score": 40,
            "bank_stability": True
        },
        "compliance": {
            "bis_fssai_valid": True,
            "gst_active": True,
            "regulatory_notices": 2,
            "licence_expiry_days": 45
        },
        "sentiment": {
            "avg_sentiment": -0.20,
            "social_polarity": -0.10,
            "review_score": 3.1,
            "complaint_signals": 9,
            "controversy_flag": False
        },
        "score_history": [52, 50, 49, 48, 46, 45, 44, 43, 43, 43],
        "target_srs": 43
    },
    {
        "id": "S005",
        "name": "Mehta Garments",
        "category": "Fashion",
        "location": "Tirupur",
        "gstin": "33AABCM5678D1Z7",
        "operational": {
            "on_time_delivery": 60,
            "avg_dispatch_delay": 4.0,
            "order_fill_rate": 72,
            "return_rate": 13,
            "sla_breaches": 9
        },
        "financial": {
            "gst_filing_regularity": 38,
            "days_since_gst_return": 50,
            "payment_delay_history": 40,
            "credit_score": 35,
            "bank_stability": False
        },
        "compliance": {
            "bis_fssai_valid": True,
            "gst_active": True,
            "regulatory_notices": 2,
            "licence_expiry_days": 30
        },
        "sentiment": {
            "avg_sentiment": -0.30,
            "social_polarity": -0.20,
            "review_score": 2.9,
            "complaint_signals": 11,
            "controversy_flag": False
        },
        "score_history": [45, 43, 41, 39, 37, 35, 34, 33, 32, 32],
        "target_srs": 32
    },

    # ── MODERATE (SRS ~53-66) ──────────────────────────────────────
    {
        "id": "S006",
        "name": "Kapoor Plastics",
        "category": "Packaging",
        "location": "Pune",
        "gstin": "27AABCK3344E1Z5",
        "operational": {
            "on_time_delivery": 78,
            "avg_dispatch_delay": 2.0,
            "order_fill_rate": 85,
            "return_rate": 6,
            "sla_breaches": 3
        },
        "financial": {
            "gst_filing_regularity": 70,
            "days_since_gst_return": 22,
            "payment_delay_history": 68,
            "credit_score": 62,
            "bank_stability": True
        },
        "compliance": {
            "bis_fssai_valid": True,
            "gst_active": True,
            "regulatory_notices": 0,
            "licence_expiry_days": 18   # expiry risk in 18 days!
        },
        "sentiment": {
            "avg_sentiment": 0.10,
            "social_polarity": 0.05,
            "review_score": 3.6,
            "complaint_signals": 4,
            "controversy_flag": False
        },
        "score_history": [55, 55, 54, 54, 54, 53, 53, 53, 53, 53],
        "target_srs": 53
    },
    {
        "id": "S007",
        "name": "Sharma Exports",
        "category": "Handicrafts",
        "location": "Jaipur",
        "gstin": "08AABCS7799F1Z2",
        "operational": {
            "on_time_delivery": 80,
            "avg_dispatch_delay": 1.8,
            "order_fill_rate": 87,
            "return_rate": 5,
            "sla_breaches": 2
        },
        "financial": {
            "gst_filing_regularity": 65,
            "days_since_gst_return": 28,
            "payment_delay_history": 60,
            "credit_score": 55,
            "bank_stability": True
        },
        "compliance": {
            "bis_fssai_valid": True,
            "gst_active": True,
            "regulatory_notices": 1,
            "licence_expiry_days": 90
        },
        "sentiment": {
            "avg_sentiment": 0.05,
            "social_polarity": 0.02,
            "review_score": 3.4,
            "complaint_signals": 5,
            "controversy_flag": False
        },
        "score_history": [58, 57, 56, 56, 55, 55, 55, 54, 54, 54],
        "target_srs": 54
    },
    {
        "id": "S008",
        "name": "Navi Mumbai Steel",
        "category": "Materials",
        "location": "Navi Mumbai",
        "gstin": "27AABCN1122G1Z8",
        "operational": {
            "on_time_delivery": 85,
            "avg_dispatch_delay": 1.5,
            "order_fill_rate": 90,
            "return_rate": 4,
            "sla_breaches": 1
        },
        "financial": {
            "gst_filing_regularity": 75,
            "days_since_gst_return": 18,
            "payment_delay_history": 70,
            "credit_score": 65,
            "bank_stability": True
        },
        "compliance": {
            "bis_fssai_valid": True,
            "gst_active": True,
            "regulatory_notices": 0,
            "licence_expiry_days": 180
        },
        "sentiment": {
            "avg_sentiment": -0.08,
            "social_polarity": -0.05,
            "review_score": 3.8,
            "complaint_signals": 3,
            "controversy_flag": False
        },
        "score_history": [65, 65, 66, 65, 66, 66, 66, 66, 66, 66],
        "target_srs": 66
    },

    # ── LOW RISK (SRS ~82-88) ──────────────────────────────────────
    {
        "id": "S009",
        "name": "BrightPack Logistics",
        "category": "Logistics",
        "location": "Bengaluru",
        "gstin": "29AABCB4455H1Z6",
        "operational": {
            "on_time_delivery": 96,
            "avg_dispatch_delay": 0.6,
            "order_fill_rate": 98,
            "return_rate": 1,
            "sla_breaches": 0
        },
        "financial": {
            "gst_filing_regularity": 95,
            "days_since_gst_return": 5,
            "payment_delay_history": 90,
            "credit_score": 85,
            "bank_stability": True
        },
        "compliance": {
            "bis_fssai_valid": True,
            "gst_active": True,
            "regulatory_notices": 0,
            "licence_expiry_days": 300
        },
        "sentiment": {
            "avg_sentiment": 0.65,
            "social_polarity": 0.55,
            "review_score": 4.6,
            "complaint_signals": 1,
            "controversy_flag": False
        },
        "score_history": [79, 80, 80, 81, 81, 82, 82, 82, 82, 82],
        "target_srs": 82
    },
    {
        "id": "S010",
        "name": "Anand Textiles",
        "category": "Fashion",
        "location": "Tirupur",
        "gstin": "33AAAAA0000A1Z0",
        "operational": {
            "on_time_delivery": 97,
            "avg_dispatch_delay": 0.5,
            "order_fill_rate": 99,
            "return_rate": 1,
            "sla_breaches": 0
        },
        "financial": {
            "gst_filing_regularity": 98,
            "days_since_gst_return": 3,
            "payment_delay_history": 95,
            "credit_score": 90,
            "bank_stability": True
        },
        "compliance": {
            "bis_fssai_valid": True,
            "gst_active": True,
            "regulatory_notices": 0,
            "licence_expiry_days": 320
        },
        "sentiment": {
            "avg_sentiment": 0.72,
            "social_polarity": 0.65,
            "review_score": 4.8,
            "complaint_signals": 0,
            "controversy_flag": False
        },
        "score_history": [84, 85, 85, 86, 86, 87, 87, 88, 88, 88],
        "target_srs": 88
    },
]


def get_all_suppliers():
    return SUPPLIERS


def get_supplier_by_id(supplier_id: str):
    for s in SUPPLIERS:
        if s["id"] == supplier_id:
            return s
    return None