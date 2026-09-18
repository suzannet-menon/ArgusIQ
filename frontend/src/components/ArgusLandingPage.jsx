import React from "react";
import "./argusiq-landing.css";

const signals = [
  { label: "Operational health", short: "Operational", value: 58, weight: "35%" },
  { label: "Financial stability", short: "Financial", value: 52, weight: "30%" },
  { label: "Compliance", short: "Compliance", value: 49, weight: "20%" },
  { label: "Public/news sentiment", short: "Sentiment", value: 41, weight: "15%" },
];

const journey = [
  ["01", "Healthy supplier", "Everything appears normal", "Active purchase orders, valid compliance, stable delivery history."],
  ["02", "Risk signals detected", "Continuous monitoring", "Dispatch delays, GST filing gaps, and negative news are flagged automatically."],
  ["03", "AI explains why", "Explainable, not a black box", "The exact operational, financial, compliance, and sentiment drivers behind the score."],
  ["04", "Risk forecast", "Predict before disruption", "A 14-day forecast so procurement teams can intervene early."],
  ["05", "Smart alerts", "Real-time notifications", "High-risk suppliers trigger alerts with recommended actions."],
  ["06", "Confident decisions", "Data over guesswork", "Teams prioritize suppliers using evidence instead of reactive firefighting."],
];

const features = [
  ["01", "Real-time alerts", "Catch threshold and forecast warnings early."],
  ["02", "AI explanations", "See why a score moved, in plain language."],
  ["03", "Risk breakdown", "Operational, financial, compliance, sentiment."],
  ["04", "Supplier comparison", "Compare vendors before key orders."],
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  );
}

function ScoreRing({ value = 47, size = "large" }) {
  return (
    <div className={`score-ring score-ring-${size}`} style={{ "--score": `${value * 3.6}deg` }}>
      <div className="score-ring-inner">
        <strong>{value}</strong>
        <span>SRS</span>
      </div>
    </div>
  );
}

function MiniChart() {
  return (
    <svg className="mini-chart" viewBox="0 0 420 150" preserveAspectRatio="none" aria-label="Supplier risk trend chart">
      <defs>
        <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#d89b42" stopOpacity=".28" />
          <stop offset="100%" stopColor="#d89b42" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path className="chart-area" d="M0 44 C35 40 46 45 72 38 S110 55 130 50 S170 56 190 68 S230 64 246 78 S285 77 300 88 S350 92 370 112 S405 108 420 126 L420 150 L0 150Z" />
      <path className="chart-line" d="M0 44 C35 40 46 45 72 38 S110 55 130 50 S170 56 190 68 S230 64 246 78 S285 77 300 88 S350 92 370 112 S405 108 420 126" />
      <path className="forecast-line" d="M230 64 C266 70 283 92 310 88 S355 110 420 136" />
      <circle cx="230" cy="64" r="4" />
    </svg>
  );
}

function DashboardPreview({ compact = false }) {
  return (
    <div className={`dashboard-preview ${compact ? "dashboard-compact" : ""}`}>
      <aside className="dashboard-sidebar">
        <div className="dashboard-brand"><span className="brand-mark">A</span><span>ArgusIQ</span></div>
        <div className="sidebar-label">Workspace</div>
        <div className="sidebar-item active">Overview <b>10</b></div>
        <div className="sidebar-item">Suppliers</div>
        <div className="sidebar-item">Alerts <b className="alert-count">5</b></div>
        <div className="sidebar-item">Recommendations</div>
        <div className="sidebar-label sidebar-bottom">Manage</div>
        <div className="sidebar-item">Settings</div>
      </aside>
      <main className="dashboard-main">
        <div className="dashboard-topline">
          <div><small>ArgusIQ</small><h3>Supplier Intelligence Dashboard</h3></div>
          <div className="live-pill"><i /> Live monitoring <strong>24 / 7</strong></div>
        </div>
        <div className="supplier-heading">
          <div><span className="eyebrow">Supplier profile</span><h2>Sharma Textiles Pvt Ltd</h2><p>Fashion · Surat</p></div>
          <span className="risk-badge">High Risk</span>
        </div>
        <div className="dashboard-grid">
          <section className="score-panel">
            <div className="panel-heading"><span>Supplier Risk Score</span><span className="trend-down">↘ Increasing risk</span></div>
            <div className="score-display"><ScoreRing /><div><div className="score-number">47</div><p>Overall health <b>47%</b></p></div></div>
            <div className="signal-list">
              {signals.map((signal) => (
                <div className="signal-row" key={signal.short}>
                  <span>{signal.short}</span><div className="signal-bar"><i style={{ width: `${signal.value}%` }} /></div><b>{signal.value}</b>
                </div>
              ))}
            </div>
          </section>
          <section className="chart-panel">
            <div className="panel-heading"><span>Supplier risk trend</span><span className="chart-legend"><i /> Actual <i className="legend-forecast" /> Forecast</span></div>
            <MiniChart />
            <div className="chart-foot"><span>Current score <b>47</b></span><span>Predicted <b className="amber">38</b></span><span>Confidence <b>82%</b></span></div>
          </section>
        </div>
        <div className="dashboard-bottom">
          <section className="ai-panel">
            <div className="ai-heading"><span className="ai-spark">✦</span><div><b>AI intelligence</b><small>Explainable summary</small></div><span className="confidence">91% confidence</span></div>
            <h4>Why this score</h4>
            <p>Sharma Textiles&apos; score has fallen 11 points in the last 8 days. Average dispatch delay rose to 3.4 days, up from 1.2 days six weeks ago, while 3 regulatory notices from the Textile Ministry remain unresolved.</p>
            <div className="driver-list"><b>Risk drivers</b><span>Dispatch delay up to 3.4 days <em>(from 1.2)</em></span><span>3 pending regulatory notices</span><span>Negative sentiment from a Surat factory dispute</span></div>
          </section>
          <section className="recommendation-panel"><span className="eyebrow">Recommendation</span><p>Hold new orders until compliance notices clear.</p><div className="alternative"><span>Lower-risk alternative</span><b>Anand Textiles <em>SRS 88</em></b></div><button>View AI recommendation <ArrowIcon /></button></section>
        </div>
      </main>
    </div>
  );
}

function LaptopMockup() {
  return <div className="laptop-wrap"><div className="laptop-screen"><div className="screen-camera" /><DashboardPreview compact /></div><div className="laptop-base"><div className="keyboard" /><div className="trackpad" /></div></div>;
}

function PhoneMockup() {
  return (
    <div className="phone-mockup">
      <div className="phone-speaker" />
      <div className="phone-screen">
        <div className="phone-top"><span>9:41</span><span>●●●</span></div>
        <div className="phone-brand"><span className="brand-mark">A</span> ArgusIQ <span>⌁</span></div>
        <span className="eyebrow">Supplier alert</span>
        <h3>Sharma Textiles</h3><p className="muted">Fashion · Surat</p>
        <div className="phone-score"><ScoreRing value={47} size="small" /><div><b>High Risk</b><span>Increasing risk</span></div></div>
        <div className="phone-forecast"><span>14-day forecast</span><strong>38</strong><em>Declining</em></div>
        <div className="phone-drivers"><b>Risk drivers</b><span>● Dispatch delays</span><span>● Compliance notices</span><span>● Negative sentiment</span></div>
        <button className="phone-button">Review supplier <ArrowIcon /></button>
      </div>
    </div>
  );
}

function Navbar() {
  return <nav className="navbar"><a className="brand" href="#top"><span className="brand-mark">A</span> ArgusIQ</a><div className="nav-links"><a href="#problem">Problem</a><a href="#solution">Solution</a><a href="#how-it-works">How it works</a><a href="#journey">Product journey</a><a href="#features">Features</a></div><div className="nav-actions"><a href="/login">Log in</a><a className="nav-cta" href="/signup">Sign up <ArrowIcon /></a></div></nav>;
}

function PortfolioStats() {
  return <section className="portfolio-section container"><div><span className="eyebrow">Portfolio at a glance</span><h2>One score. Every supplier signal.</h2><p>10 suppliers monitored across categories 2 critical, 3 high risk, 3 moderate, 2 low risk, updated on every request.</p></div><div className="portfolio-stats"><div><strong>10</strong><span>Suppliers monitored</span></div><div><strong>5</strong><span>Active alerts</span></div><div className="portfolio-alert"><span>Active alert</span><b>Sharma Textiles <em>High Risk</em></b><strong>47</strong><p>Dispatch delays and open compliance notices are driving this decline.</p></div></div></section>;
}

function LandingPage() {
  return (
    <div className="argus-page" id="top">
      <Navbar />
      <header className="hero container">
        <div className="hero-copy"><span className="eyebrow hero-eyebrow"><i /> Supplier risk intelligence for modern teams</span><h1>Know your supplier risk <span>before it costs you</span></h1><p>ArgusIQ scores every supplier 0-100 across operations, finances, compliance, and sentiment and forecasts where they&apos;re headed 14 days out</p><div className="hero-actions"><a className="primary-button" href="/signup">Start tracking suppliers <ArrowIcon /></a><a className="text-link" href="#how-it-works">See how it works <ArrowIcon /></a></div></div>
        <div className="hero-visual"><div className="visual-glow" /><LaptopMockup /><PhoneMockup /></div>
      </header>
      <PortfolioStats />
      <section className="problem-section section" id="problem"><div className="container problem-grid"><div className="section-intro"><span className="eyebrow">The problem</span><h2>Supplier risk is usually visible <span>after the damage</span></h2><p>Supply teams need early signals, not post-incident spreadsheets.</p><div className="stat-callout"><strong>60%</strong><span>of sellers face supplier issues annually</span></div></div><div className="signal-scatter"><div className="scatter-title">Signals, scattered across the stack <span>Before ArgusIQ</span></div><div className="scatter-lines"><span>Dispatch log <b>3.4 days late</b></span><span>GST filing portal <b>Notice unresolved</b></span><span>News monitor <b>Sentiment declining</b></span><span>Order spreadsheet <b>Margin leakage</b></span></div><div className="problem-points"><div><b>Late deliveries</b><span>Ratings drop before teams can react.</span></div><div><b>No warning system</b><span>Signals stay scattered across tools.</span></div><div><b>Revenue leakage</b><span>Supplier failures hit orders directly.</span></div></div></div></div></section>
      <section className="solution-section section" id="solution"><div className="container"><div className="section-intro centered"><span className="eyebrow">The solution</span><h2>One clear score from <span>every supplier signal</span></h2><p>Operational, financial, compliance, and sentiment data weighted and combined into one 0-100 supplier risk score.</p></div><div className="signal-flow"><div className="flow-column">{signals.map((signal) => <div className="flow-signal" key={signal.label}><span>{signal.short}</span><b>{signal.weight}</b><i style={{ width: signal.weight }} /></div>)}</div><div className="flow-arrow">→</div><div className="central-score"><ScoreRing /><span>High risk</span><b>Declining → forecast <em>38</em> in 14 days</b></div><div className="flow-arrow">→</div><div className="flow-action"><span>AI explanation</span><strong>Why the score moved</strong><span>Procurement action</span><strong>Hold new orders</strong></div></div><p className="solution-note">One score combines every signal into a clear, decision-ready surface with the reasoning behind it, not a black box.</p></div></section>
      <section className="how-section section" id="how-it-works"><div className="container"><div className="split-heading"><div><span className="eyebrow">How it works</span><h2>Predict supplier risks <span>before they happen</span></h2></div><p>ArgusIQ continuously monitors supplier operations, financial health, compliance, and public sentiment to generate an explainable AI-powered Supplier Risk Score.</p></div><div className="showcase-wrap"><DashboardPreview /></div></div></section>
      <section className="journey-section section" id="journey"><div className="container"><div className="section-intro"><span className="eyebrow">Product journey</span><h2>From supplier risks to <span>proactive action</span></h2><p>Every supplier is continuously monitored and turned into one explainable risk score.</p></div><div className="journey-line">{journey.map(([number, title, subtitle, text], index) => <div className="journey-step" key={number}><div className="journey-number">{number}</div><div className="journey-copy"><span>{subtitle}</span><h3>{title}</h3><p>{text}</p></div>{index < journey.length - 1 && <div className="journey-arrow">↓</div>}</div>)}</div></div></section>
      <section className="features-section section" id="features"><div className="container"><div className="split-heading"><div><span className="eyebrow">Features</span><h2>Everything needed for <span>proactive supplier decisions</span></h2></div></div><div className="feature-grid">{features.map(([number, title, text]) => <div className="feature-item" key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div><ArrowIcon /></div>)}</div></div></section>
      <section className="cta-section section"><div className="container cta-inner"><span className="brand-mark">A</span><h2>Start tracking your suppliers today</h2><a className="primary-button" href="/signup">Get started <ArrowIcon /></a></div></section>
      <footer className="footer container"><a className="brand" href="#top"><span className="brand-mark">A</span> ArgusIQ</a><span>© 2026. All rights reserved.</span></footer>
    </div>
  );
}

export default LandingPage;
