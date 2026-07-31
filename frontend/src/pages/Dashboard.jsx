import { useState } from "react";
import DashboardOverview from "../components/dashboard/DashboardOverview.jsx";
import SuppliersList from "../components/dashboard/SuppliersList.jsx";
import SupplierDetail from "../components/dashboard/SupplierDetail.jsx";
import AlertsList from "../components/dashboard/AlertsList.jsx";
import CompareTab from "../components/dashboard/CompareTab.jsx";
import ChatTab from "../components/dashboard/ChatTab.jsx";

const TABS = [
  { key: "dashboard", label: "Dashboard" },
  { key: "suppliers", label: "Suppliers" },
  { key: "alerts", label: "Alerts" },
  { key: "compare", label: "Compare" },
  { key: "assistant", label: "Assistant" },
];

export default function Dashboard() {
  // This ONE piece of state replaces the vanilla JS approach of toggling
  // .active classes on <section class="tab"> elements — React just decides
  // what to render based on activeTab, nothing is ever hidden-but-present
  // in the DOM like the original.
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);

  // Passed down to every list component so clicking a row can both switch
  // tabs AND remember which supplier to show.
  function goToSupplier(id) {
    setSelectedSupplierId(id);
    setActiveTab("suppliers");
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-slate-950 text-white px-6 py-4">
        <div className="text-lg font-extrabold tracking-tight">
          Argus<span className="text-amber-400">IQ</span>
        </div>
      </header>

      <nav className="bg-slate-950 flex gap-1 px-6 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === t.key
                ? "text-white border-amber-400"
                : "text-slate-400 border-transparent hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className="max-w-6xl mx-auto p-6">
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