export const supplier = {
  id: "SUP-847",
  name: "Nova Manufacturing Ltd.",
  category: "Electronics",
  location: "Shenzhen, China",
  riskScore: 72,
  trend: "up",
  status: "Medium Risk",
};

export const kpis = [
  {
    id: 1,
    title: "Operational",
    value: 84,
    change: "+6%",
    color: "emerald",
  },
  {
    id: 2,
    title: "Financial",
    value: 69,
    change: "-3%",
    color: "cyan",
  },
  {
    id: 3,
    title: "Compliance",
    value: 91,
    change: "+1%",
    color: "blue",
  },
  {
    id: 4,
    title: "Sentiment",
    value: 58,
    change: "-12%",
    color: "rose",
  },
];

export const chartData = [
  { day: "Mon", score: 94, forecast: null },
  { day: "Tue", score: 91, forecast: null },
  { day: "Wed", score: 88, forecast: null },
  { day: "Thu", score: 82, forecast: null },
  { day: "Fri", score: 79, forecast: null },
  { day: "Today", score: 72, forecast: 72 },
  { day: "+2", score: null, forecast: 69 },
  { day: "+4", score: null, forecast: 66 },
  { day: "+6", score: null, forecast: 63 },
  { day: "+8", score: null, forecast: 60 },
  { day: "+10", score: null, forecast: 57 },
  { day: "+12", score: null, forecast: 54 },
  { day: "+14", score: null, forecast: 51 },
];

export const aiSummary = {
  confidence: "96%",
  explanation:
    "Supplier risk increased because of repeated shipment delays, declining financial indicators and a sudden rise in negative news sentiment across multiple monitored sources.",

  recommendation:
    "Reduce dependency, initiate alternate sourcing and increase shipment monitoring over the next two weeks.",

  drivers: [
    "Delivery delays (+18%)",
    "Financial health deterioration",
    "Negative media sentiment",
    "Compliance audit overdue",
  ],
};

export const forecast = {
  current: 72,
  predicted: 51,
  confidence: "94%",
  direction: "Downward",
};

export const latestAlert = {
  severity: "High",
  title: "Financial Risk Escalation",
  description:
    "AI detected worsening liquidity indicators that may impact production within 14 days.",
  time: "12 mins ago",
};

export const timeline = [
  {
    title: "Healthy Supplier",
    description:
      "Supplier operates normally with stable deliveries and financial performance.",
  },
  {
    title: "Risk Signals",
    description:
      "Shipment delays and declining financial metrics are detected.",
  },
  {
    title: "AI Analysis",
    description:
      "SupplyGuard correlates operational, compliance and sentiment signals.",
  },
  {
    title: "Forecast",
    description:
      "Supplier Risk Score projected to decline over the next 14 days.",
  },
  {
    title: "Alert",
    description:
      "Procurement teams receive explainable AI recommendations.",
  },
  {
    title: "Business Action",
    description:
      "Alternative suppliers are engaged before disruption occurs.",
  },
];

export const riskDrivers = [
  {
    title: "Operational Delay",
    impact: "High",
    score: 88,
  },
  {
    title: "Financial Health",
    impact: "Medium",
    score: 72,
  },
  {
    title: "Compliance",
    impact: "Low",
    score: 91,
  },
  {
    title: "Public Sentiment",
    impact: "High",
    score: 58,
  },
];