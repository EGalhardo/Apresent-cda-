import React, { useState, useEffect, useRef } from 'react';
import { ERPProvider } from './context/ERPContext';
import Sidebar, { Page } from './components/layout/Sidebar';
import ToastContainer from './components/ui/ToastContainer';
import PresentationPage from './pages/PresentationPage';
import StrategicGoalsPage from './pages/StrategicGoalsPage';
import FinancialPlanPage from './pages/FinancialPlanPage';
import CostStructurePage from './pages/CostStructurePage';
import RevenueProjectionsPage from './pages/RevenueProjectionsPage';
import PhaseGatesPage from './pages/PhaseGatesPage';
import KPIsPage from './pages/KPIsPage';
import Institutions from './pages/Institutions';
import Invoices from './pages/Invoices';
import Expenses from './pages/Expenses';
import Employees from './pages/Employees';
import Settings from './pages/Settings';
import BrandLogoPage from './pages/BrandLogoPage';
import { Menu } from 'lucide-react';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('logo');
  const [mobileOpen, setMobileOpen] = useState(false);
  const mainScrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll-to-top on page navigation (Requirement 10)
  useEffect(() => {
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    setMobileOpen(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      // Apresentação
      case 'intro':
      case 'problem':
      case 'solution':
      case 'benefits':
      case 'conclusion':
        return <PresentationPage topic={currentPage} onNavigate={handleNavigate} />;

      // Plano Financeiro
      case 'objectives':
      case 'business_model':
      case 'monetization':
      case 'commercial_strategy':
      case 'growth_hypotheses':
      case 'initial_investment':
      case 'commercial_kpis':
      case 'growth_strategy':
      case 'final_considerations':
        return <FinancialPlanPage topic={currentPage} onNavigate={handleNavigate} />;

      case 'strategic_goals':
        return <StrategicGoalsPage />;

      case 'cost_structure':
        return <CostStructurePage />;

      case 'revenue_projections':
        return <RevenueProjectionsPage />;

      case 'phase_gates':
        return <PhaseGatesPage />;

      case 'kpis':
        return <KPIsPage />;

      // Management System Pages
      case 'logo':
        return <BrandLogoPage />;
      case 'institutions':
        return <Institutions />;
      case 'invoices':
        return <Invoices />;
      case 'expenses':
        return <Expenses />;
      case 'employees':
        return <Employees />;
      case 'settings':
        return <Settings />;

      default:
        return <PresentationPage topic="intro" onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden font-inter antialiased">
      {/* Sidebar - Left Navigation */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main Content Area - Full Width without AppBar (Requirement 1) */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0 relative bg-white">
        {/* Mobile Header Bar - Only visible on small screens (md:hidden) to open Sidebar */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200 z-10">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
            aria-label="Abrir menu lateral"
          >
            <Menu size={20} />
          </button>

          <button
            onClick={() => handleNavigate('logo')}
            className="hover:opacity-80 transition-opacity cursor-pointer p-1 rounded-lg"
            title="Ver Logomarca Oficial"
          >
            <img
              src="https://i.postimg.cc/FzX16XZQ/logomarca-cda.png"
              alt="Logo CDA"
              className="h-8 object-contain"
            />
          </button>
        </div>

        {/* Scrollable Main Area */}
        <main
          ref={mainScrollRef}
          className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scroll-smooth bg-white"
        >
          {renderPage()}
        </main>
      </div>

      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <ERPProvider>
      <AppContent />
    </ERPProvider>
  );
}
