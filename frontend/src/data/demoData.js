// Grounded in the ACTUAL scoring engine's output shape and one real supplier
// from scoring/mock_data.py (Sharma Textiles Pvt Ltd, SRS 47  HIGH RISK,
// declining trend). This ties the marketing demo to the real product instead
// of inventing generic placeholder numbers.

export const supplier = {
  name: "Sharma Textiles Pvt Ltd",
  category: "Fashion · Surat",
  location: "Surat, Gujarat",
  status: "High Risk",
  riskScore: 47,
  trend: "up", // risk trending up = declining supplier health
};

export const kpis = [
  { id: 1, title: "Operational", value: 58, color: "amber", change: "-4%" },
  { id: 2, title: "Financial", value: 52, color: "amber", change: "-2%" },
  { id: 3, title: "Compliance", value: 49, color: "rose", change: "-9%" },
  { id: 4, title: "Sentiment", value: 41, color: "rose", change: "-6%" },
];

export const chartData = [
  { day: "Day 1", score: 58, forecast: null },
  { day: "Day 2", score: 56, forecast: null },
  { day: "Day 3", score: 54, forecast: null },
  { day: "Day 4", score: 52, forecast: null },
  { day: "Day 5", score: 50, forecast: null },
  { day: "Day 6", score: 49, forecast: null },
  { day: "Day 7", score: 48, forecast: null },
  { day: "Day 8", score: 47, forecast: 47 },
  { day: "Day 14", score: null, forecast: 38 },
];

export const forecast = {
  current: 47,
  predicted: 38,
  direction: "Declining",
  confidence: "82%",
};

export const aiSummary = {
  confidence: "91%",
  explanation:
    "Sharma Textiles' score has fallen 11 points in the last 8 days. Average dispatch delay rose to 3.4 days, up from 1.2 days six weeks ago, while 3 regulatory notices from the Textile Ministry remain unresolved.",
  drivers: [
    "Dispatch delay up to 3.4 days (from 1.2)",
    "3 pending regulatory notices",
    "Negative sentiment from a Surat factory dispute",
  ],
  recommendation:
    "Hold new orders until compliance notices clear. Anand Textiles (SRS 88) is a lower-risk alternative in the same category.",
};

export const latestAlert = {
  severity: "High",
  title: "Sharma Textiles crossed into High Risk",
  description:
    "Score dropped from 58 to 47 over 8 days, driven primarily by dispatch delays and open compliance notices.",
  time: "2 hours ago",
};