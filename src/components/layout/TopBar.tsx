import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, User, Menu, Building2, Receipt, Wallet, Users, RotateCcw, Check, X, Shield, AlertTriangle } from 'lucide-react';
import { Page } from './Sidebar';
import { useERP } from '../../context/ERPContext';
import { formatAOA } from '../../utils/format';

const pageTitles: Record<Page, string> = {
  intro: 'Apresentação — Introdução',
  problem: 'Apresentação — Problema',
  solution: 'Apresentação — Solução',
  benefits: 'Apresentação — Benefícios',
  conclusion: 'Apresentação — Conclusão',
  objectives: 'Plano Financeiro — Objectivos',
  strategic_goals: 'Plano Financeiro — Metas Estratégicas',
  business_model: 'Plano Financeiro — Modelo de Negócio',
  monetization: 'Plano Financeiro — Estratégia de Monetização',
  commercial_strategy: 'Plano Financeiro — Estratégia Comercial',
  growth_hypotheses: 'Plano Financeiro — Hipóteses de Crescimento',
  cost_structure: 'Plano Financeiro — Estrutura de Custos',
  initial_investment: 'Plano Financeiro — Investimento Inicial',
  revenue_projections: 'Plano Financeiro — Receitas & Projeções',
  phase_gates: 'Plano Financeiro — Phase Gates & Riscos',
  kpis: 'Plano Financeiro — KPIs Financeiros',
  commercial_kpis: 'Plano Financeiro — KPIs Comerciais',
  growth_strategy: 'Plano Financeiro — Estratégia de Crescimento',
  final_considerations: 'Plano Financeiro — Considerações Finais',
};

interface TopBarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onToggleMobileMenu?: () => void;
}

export default function TopBar({ currentPage, onNavigate, onToggleMobileMenu }: TopBarProps) {
  const { institutions, invoices, expenses, employees, resetToDefaults, settings } = useERP();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const today = new Date().toLocaleDateString('pt-PT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  // Close popovers on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Live search filtering
  const matchedInvoices = searchQuery.trim()
    ? invoices.filter(i => i.institutionName.toLowerCase().includes(searchQuery.toLowerCase()) || i.id.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3)
    : [];

  const matchedInstitutions = searchQuery.trim()
    ? institutions.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()) || i.contact.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3)
    : [];

  const matchedExpenses = searchQuery.trim()
    ? expenses.filter(e => e.description.toLowerCase().includes(searchQuery.toLowerCase()) || (e.supplier || '').toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3)
    : [];

  const matchedEmployees = searchQuery.trim()
    ? employees.filter(e => e.name.toLowerCase().includes(searchQuery.toLowerCase()) || e.role.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3)
    : [];

  const hasSearchResults = matchedInvoices.length > 0 || matchedInstitutions.length > 0 || matchedExpenses.length > 0 || matchedEmployees.length > 0;

  // System Notifications
  const alerts = [
    { id: '1', title: 'Piloto INAPEM — Phase Gate 1', desc: 'Testes de cibersegurança e emissão de parecer em progresso.', type: 'info', date: 'Hoje' },
    { id: '2', title: 'Gatilho Salarial (Mês 6)', desc: `Meta de MRR: ${formatAOA(settings.mrrTrigger, true)}. Tabela remuneratória será reajustada.`, type: 'warning', date: 'Mês 6' },
    { id: '3', title: 'Facturas Pendentes', desc: `${invoices.filter(i => i.status === 'pending').length} facturas aguardando liquidação.`, type: 'info', date: 'Facturação' },
  ];

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-6 flex-shrink-0 relative z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl lg:hidden"
          title="Abrir menu"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">{pageTitles[currentPage]}</h1>
          <p className="text-[11px] sm:text-xs text-gray-600 font-medium capitalize">{today}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Live Search Input */}
        <div ref={searchRef} className="relative hidden md:block">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-xl px-3 py-1.5 text-sm w-56 focus-within:w-72 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
            <Search size={14} className="text-gray-600 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              placeholder="Pesquisar..."
              className="bg-transparent border-none outline-none text-xs text-gray-900 placeholder-gray-500 w-full font-medium"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-gray-500 hover:text-gray-700">
                <X size={12} />
              </button>
            )}
          </div>

          {/* Search Dropdown Results */}
          {showSearchDropdown && searchQuery.trim().length > 0 && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-2xl p-3 z-50 space-y-3">
              {!hasSearchResults ? (
                <p className="text-xs text-gray-400 text-center py-4">Nenhum resultado encontrado para "{searchQuery}"</p>
              ) : (
                <>
                  {matchedInstitutions.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1 px-2 flex items-center gap-1">
                        <Building2 size={10} /> Instituições
                      </p>
                      {matchedInstitutions.map(inst => (
                        <button
                          key={inst.id}
                          onClick={() => {
                            onNavigate('growth_hypotheses');
                            setShowSearchDropdown(false);
                          }}
                          className="w-full text-left p-2 rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-between"
                        >
                          <span className="text-xs font-semibold text-gray-800">{inst.name}</span>
                          <span className="text-[10px] text-blue-600 font-medium">{formatAOA(inst.mrr, true)}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {matchedInvoices.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1 px-2 flex items-center gap-1">
                        <Receipt size={10} /> Facturas & Receitas
                      </p>
                      {matchedInvoices.map(inv => (
                        <button
                          key={inv.id}
                          onClick={() => {
                            onNavigate('revenue_projections');
                            setShowSearchDropdown(false);
                          }}
                          className="w-full text-left p-2 rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-between"
                        >
                          <div>
                            <p className="text-xs font-semibold text-gray-800">{inv.id}</p>
                            <p className="text-[10px] text-gray-400">{inv.institutionName}</p>
                          </div>
                          <span className="text-xs font-bold text-gray-900">{formatAOA(inv.amount, true)}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {matchedExpenses.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1 px-2 flex items-center gap-1">
                        <Wallet size={10} /> Despesas
                      </p>
                      {matchedExpenses.map(exp => (
                        <button
                          key={exp.id}
                          onClick={() => {
                            onNavigate('cost_structure');
                            setShowSearchDropdown(false);
                          }}
                          className="w-full text-left p-2 rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-between"
                        >
                          <span className="text-xs font-semibold text-gray-800 truncate max-w-[180px]">{exp.description}</span>
                          <span className="text-xs font-bold text-red-600">{formatAOA(exp.amount, true)}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {matchedEmployees.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1 px-2 flex items-center gap-1">
                        <Users size={10} /> Colaboradores
                      </p>
                      {matchedEmployees.map(emp => (
                        <button
                          key={emp.id}
                          onClick={() => {
                            onNavigate('cost_structure');
                            setShowSearchDropdown(false);
                          }}
                          className="w-full text-left p-2 rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-between"
                        >
                          <div>
                            <p className="text-xs font-semibold text-gray-800">{emp.name}</p>
                            <p className="text-[10px] text-gray-400">{emp.role}</p>
                          </div>
                          <span className="text-xs font-semibold text-gray-700">{formatAOA(emp.salary, true)}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Notifications Button & Dropdown */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setShowNotifications(p => !p)}
            className="relative p-2.5 rounded-xl hover:bg-gray-100 text-gray-700 transition-colors"
            title="Notificações"
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-300 rounded-2xl p-4 z-50 shadow-sm">
              <div className="flex items-center justify-between mb-3 border-b border-gray-200 pb-2">
                <p className="text-sm font-bold text-gray-900">Notificações do Sistema</p>
                <span className="text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-300 px-2 py-0.5 rounded-lg">3 Activas</span>
              </div>
              <div className="space-y-2.5">
                {alerts.map(a => (
                  <div key={a.id} className="p-2.5 rounded-xl bg-gray-50 border border-gray-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-gray-900">{a.title}</span>
                      <span className="text-[10px] text-gray-500 font-medium">{a.date}</span>
                    </div>
                    <p className="text-xs text-gray-700 font-medium leading-snug">{a.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <button
          onClick={() => setShowProfileModal(true)}
          className="flex items-center gap-2.5 pl-3 border-l border-gray-300 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xs">
            CD
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-bold text-gray-900 leading-tight">Admin CDA</p>
            <p className="text-[10px] text-blue-700 font-semibold">Piloto INAPEM</p>
          </div>
        </button>
      </div>

      {/* Admin Quick Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-2xl max-w-sm w-full p-6 relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setShowProfileModal(false)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                CD
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{settings.companyName}</h3>
                <p className="text-xs text-blue-600 font-semibold">{settings.phase}</p>
              </div>
            </div>

            <div className="space-y-2 border-t border-gray-100 pt-3 text-xs mb-5">
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">OPEX Mensal</span>
                <span className="font-semibold text-gray-800">{formatAOA(settings.opexMonthly, true)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Gatilho Salarial</span>
                <span className="font-semibold text-gray-800">{formatAOA(settings.mrrTrigger, true)} MRR</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Cibersegurança & Backup</span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1">
                  <Shield size={12} /> Activo
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  onNavigate('kpis');
                  setShowProfileModal(false);
                }}
                className="w-full py-2 px-4 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                Ver KPIs & Desempenho
              </button>

              <button
                onClick={() => {
                  if (confirm('Tem a certeza que deseja restaurar todos os dados para o estado inicial de fábrica?')) {
                    resetToDefaults();
                    setShowProfileModal(false);
                  }
                }}
                className="w-full py-2 px-4 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw size={13} />
                Restaurar Dados Originais
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

