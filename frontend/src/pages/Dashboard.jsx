import { useState } from "react";
import { LayoutDashboard, Building2, TriangleAlert, GitCompareArrows, MessageSquare } from "lucide-react";
import DashboardOverview from "../components/dashboard/DashboardOverview.jsx";
import SuppliersList from "../components/dashboard/SuppliersList.jsx";
import SupplierDetail from "../components/dashboard/SupplierDetail.jsx";
import AlertsList from "../components/dashboard/AlertsList.jsx";
import CompareTab from "../components/dashboard/CompareTab.jsx";
import ChatTab from "../components/dashboard/ChatTab.jsx";

const TABS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "suppliers", label: "Suppliers", icon: Building2 },
  { key: "alerts", label: "Alerts", icon: TriangleAlert },
  { key: "compare", label: "Compare", icon: GitCompareArrows },
  { key: "assistant", label: "Assistant", icon: MessageSquare },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);

  function goToSupplier(id) {
    setSelectedSupplierId(id);
    setActiveTab("suppliers");
  }

  return (
    // flex row: fixed-width sidebar + flexible content area. min-h-screen
    // on the OUTER wrapper (not each child) so the sidebar's dark background
    // extends the full page height even if content is short.
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* SIDEBAR — vertical, fixed width, sits for the full height */}
      <aside className="w-60 shrink-0 bg-slate-950 text-white flex flex-col">
        <div className="px-5 py-5 border-b border-white/10">
          <div className="text-lg font-extrabold tracking-tight">
            Argus<span className="text-amber-400">IQ</span>
          </div>
          <div className="text-xs text-slate-400 mt-0.5">Supplier Risk Intelligence</div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {t.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* MAIN CONTENT — takes all remaining width. No max-w cap here, only
          generous padding, so tables/cards can actually use the full screen
          instead of being squeezed into a centered 6xl column. */}
      <main className="flex-1 min-w-0 p-6 lg:p-8">
        {activeTab === "dashboard" && <DashboardOverview onSelectSupplier={goToSupplier} />}

        {activeTab === "suppliers" && (
          <>
            <SuppliersList onSelectSupplier={goToSupplier} />
            {selectedSupplierId && <SupplierDetail supplierId={selectedSupplierId} />}
          </>
        )}

        {activeTab === "alerts" && <AlertsList onSelectSupplier={goToSupplier} />}
        {activeTab === "compare" && <CompareTab />}
        {activeTab === "assistant" && <ChatTab />}
      </main>
    </div>
  );
}