import React, { useState } from 'react';
import {
  ChevronDown, ChevronRight, ChevronLeft,
  Presentation, Landmark, Compass, HelpCircle,
  Lightbulb, Award, CheckCircle2, Target,
  FileCheck2, Building2, Coins, ArrowUpRight,
  TrendingUp, PieChart, Landmark as BankIcon, DollarSign,
  Briefcase, Activity, ShieldCheck, MapPin, Flag,
  Menu, X, Sparkles, Layers, Sliders, BarChart3,
} from 'lucide-react';
import { cn } from '../../utils/format';
import Tooltip from '../ui/Tooltip';

export type Page =
  // Apresentação
  | 'intro'
  | 'problem'
  | 'solution'
  | 'benefits'
  | 'conclusion'
  // Plano Financeiro
  | 'objectives'
  | 'strategic_goals'
  | 'business_model'
  | 'monetization'
  | 'commercial_strategy'
  | 'growth_hypotheses'
  | 'cost_structure'
  | 'initial_investment'
  | 'revenue_projections'
  | 'phase_gates'
  | 'kpis'
  | 'commercial_kpis'
  | 'growth_strategy'
  | 'final_considerations';

interface SubMenuItem {
  id: Page;
  label: string;
  icon: React.ElementType;
  purpose: string;
  meaning: string;
}

interface MenuGroup {
  id: 'apresentacao' | 'plano_financeiro';
  title: string;
  icon: React.ElementType;
  items: SubMenuItem[];
}

const menuGroups: MenuGroup[] = [
  {
    id: 'apresentacao',
    title: 'Apresentação',
    icon: Presentation,
    items: [
      { id: 'intro', label: 'Introdução', icon: Compass, purpose: 'Visão geral e contexto do Correio Digital Angola', meaning: 'Apresentação institucional da plataforma unificada de mensagens oficiais do Estado' },
      { id: 'problem', label: 'Problema Actual', icon: HelpCircle, purpose: 'Diagnóstico dos custos e atrasos do correio em papel', meaning: 'Custos elevados, extravios e lentidão nas comunicações em papel' },
      { id: 'solution', label: 'A Nossa Solução', icon: Lightbulb, purpose: 'Plataforma digital para envio seguro de notificações e documentos', meaning: 'Envio de correio digital certificado para o Governo, Empresas e Cidadãos' },
      { id: 'benefits', label: 'Benefícios', icon: Award, purpose: 'Economia de custos e rapidez para o Estado e Cidadãos', meaning: 'Redução de custos até 90% na entrega de documentos oficiais' },
      { id: 'conclusion', label: 'Conclusão & Visão', icon: CheckCircle2, purpose: 'Resumo dos passos para a modernização do correio', meaning: 'Passo decisivo para a transformação digital em Angola' },
    ],
  },
  {
    id: 'plano_financeiro',
    title: 'Plano Financeiro',
    icon: Landmark,
    items: [
      { id: 'objectives', label: 'Objectivos Financeiros', icon: Target, purpose: 'Metas de facturação e sustentabilidade do projecto', meaning: 'Garantir a autonomia financeira e o retorno do investimento' },
      { id: 'strategic_goals', label: 'Metas Estratégicas', icon: Flag, purpose: 'Acompanhamento do progresso das metas por etapa', meaning: 'Lista de objetivos com barra de progresso e estado de conclusão' },
      { id: 'business_model', label: 'Modelo de Negócio', icon: Briefcase, purpose: 'Como a plataforma gera receitas com o Governo e Empresas', meaning: 'Subscrições mensais, taxas de adesão e envio por volume' },
      { id: 'monetization', label: 'Tabelas de Preços', icon: Coins, purpose: 'Valores dos planos e tarifários por mensagem e serviço', meaning: 'Planos para Instituições Públicas, Bancos e Empresas Privadas' },
      { id: 'commercial_strategy', label: 'Estratégia Comercial', icon: Building2, purpose: 'Plano de adesão do INAPEM, Ministérios e Bancos', meaning: 'Aproximação aos clientes e expansão no mercado' },
      { id: 'growth_hypotheses', label: 'Crescimento do Uso', icon: ArrowUpRight, purpose: 'Previsão do aumento de mensagens e utilizadores activos', meaning: 'Estimativa do número de mensagens enviadas por mês' },
      { id: 'cost_structure', label: 'Estrutura de Custos', icon: PieChart, purpose: 'Despesas mensais de funcionamento e salários da equipa', meaning: 'Gestão transparente de despesas operacionais e pessoal' },
      { id: 'initial_investment', label: 'Investimento Inicial', icon: DollarSign, purpose: 'Valor necessário para criar a tecnologia e iniciar operações', meaning: 'Investimento em equipamentos, desenvolvimento e reserva' },
      { id: 'revenue_projections', label: 'Receitas & Projeções', icon: TrendingUp, purpose: 'Previsão de ganhos a 12 meses e ponto de equilíbrio', meaning: 'Mês em que as receitas cobrem todas as despesas' },
      { id: 'phase_gates', label: 'Fases de Validação', icon: ShieldCheck, purpose: 'Etapas de segurança e aprovação antes de avançar', meaning: 'Passos garantidos de segurança e ligação entre sistemas' },
      { id: 'kpis', label: 'Indicadores de Sucesso', icon: BarChart3, purpose: 'Painel com os resultados mais importantes do projeto', meaning: 'Controlo do crescimento das receitas e clientes activos' },
      { id: 'commercial_kpis', label: 'Indicadores de Vendas', icon: Activity, purpose: 'Métricas de desempenho da equipa comercial', meaning: 'Reuniões realizadas, propostas e novos contratos' },
      { id: 'growth_strategy', label: 'Expansão Nacional', icon: Layers, purpose: 'Plano de expansão pelas províncias de Angola', meaning: 'Crescimento gradual em todo o território nacional' },
      { id: 'final_considerations', label: 'Resumo do Investimento', icon: Sparkles, purpose: 'Conclusão sobre a viabilidade e retorno do projeto', meaning: 'Resumo para decisores, investidores e diretores' },
    ],
  },
];

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function Sidebar({ currentPage, onNavigate, mobileOpen = false, onCloseMobile }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  // Accordion behavior: determine active group based on currentPage or user toggle
  const getGroupForPage = (page: Page): 'apresentacao' | 'plano_financeiro' => {
    const isPresentation = menuGroups[0].items.some(i => i.id === page);
    return isPresentation ? 'apresentacao' : 'plano_financeiro';
  };

  const [expandedGroup, setExpandedGroup] = useState<'apresentacao' | 'plano_financeiro'>(() => getGroupForPage(currentPage));

  const toggleGroup = (groupId: 'apresentacao' | 'plano_financeiro') => {
    // Single expanded group accordion
    setExpandedGroup(prev => (prev === groupId ? groupId : groupId));
  };

  const handleSelectPage = (page: Page) => {
    onNavigate(page);
    setExpandedGroup(getGroupForPage(page));
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
        />
      )}

      <aside
        className={cn(
          'h-screen bg-white text-slate-800 flex flex-col transition-all duration-300 ease-in-out flex-shrink-0 z-40 border-r border-slate-200/80',
          'fixed lg:static top-0 left-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          collapsed ? 'w-20' : 'w-72'
        )}
      >
        {/* Brand Header */}
        <div className={cn('p-4 border-b border-slate-100 flex items-center justify-between', collapsed && 'flex-col items-center gap-3')}>
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex-shrink-0 flex items-center justify-center">
              <img
                src="https://i.postimg.cc/FzX16XZQ/logomarca-cda.png"
                alt="Correio Digital Angola"
                className="h-8 w-auto object-contain max-w-[140px]"
              />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <span className="text-xs font-extrabold text-slate-900 tracking-tight block truncate">Correio Digital Angola</span>
                <span className="text-[11px] text-blue-700 font-bold block truncate">Plano Executivo GovTech</span>
              </div>
            )}
          </div>

          {/* Toggle Collapse Button in Desktop Header */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors"
            title={collapsed ? 'Expandir Barra Lateral' : 'Recolher Barra Lateral'}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Accordion Navigation Groups */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-200">
          {menuGroups.map(group => {
            const isGroupExpanded = expandedGroup === group.id;
            const hasActiveChild = group.items.some(item => item.id === currentPage);

            return (
              <div key={group.id} className="space-y-1">
                {/* Accordion Group Header */}
                {!collapsed ? (
                  <button
                    onClick={() => toggleGroup(group.id)}
                    className={cn(
                      'w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all border',
                      hasActiveChild
                        ? 'bg-blue-600 text-white border-blue-700 shadow-xs hover:bg-blue-700'
                        : isGroupExpanded
                        ? 'bg-slate-100 text-slate-900 border-slate-200 hover:bg-slate-200/80'
                        : 'text-slate-700 border-transparent hover:bg-slate-100 hover:text-slate-900'
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <group.icon size={16} className={hasActiveChild ? 'text-white' : 'text-slate-700'} />
                      <span className={hasActiveChild ? 'text-white' : undefined}>{group.title}</span>
                    </div>
                    <div className={hasActiveChild ? 'text-white' : 'text-slate-500'}>
                      {isGroupExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </div>
                  </button>
                ) : (
                  <div
                    className={cn(
                      'text-center py-2 text-[10px] uppercase font-extrabold tracking-wider rounded-lg mx-1 transition-all',
                      hasActiveChild ? 'bg-blue-600 text-white shadow-2xs' : 'text-slate-600'
                    )}
                  >
                    {group.id === 'apresentacao' ? 'APR' : 'FIN'}
                  </div>
                )}

                {/* Group Items (Always visible if collapsed, or expanded if not collapsed) */}
                {(collapsed || isGroupExpanded) && (
                  <div className={cn('space-y-0.5', !collapsed && 'pl-2 border-l-2 border-blue-200/80 my-1')}>
                    {group.items.map(item => {
                      const isActive = currentPage === item.id;
                      const Icon = item.icon;

                      const navButton = (
                        <button
                          key={item.id}
                          onClick={() => handleSelectPage(item.id)}
                          className={cn(
                            'w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 relative group border',
                            isActive
                              ? 'bg-blue-50 text-blue-700 font-extrabold border-blue-200 shadow-2xs'
                              : 'text-slate-700 border-transparent hover:bg-slate-100 hover:text-blue-700',
                            collapsed && 'justify-center px-0 py-3'
                          )}
                        >
                          <div
                            className={cn(
                              'w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110',
                              isActive
                                ? 'bg-blue-600 text-white shadow-2xs'
                                : 'text-slate-600 group-hover:text-blue-700'
                            )}
                          >
                            <Icon size={17} />
                          </div>

                          {!collapsed && (
                            <span className="truncate flex-1 text-left font-bold">{item.label}</span>
                          )}

                          {isActive && !collapsed && (
                            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                          )}
                        </button>
                      );

                      // Tooltip wrapper
                      return (
                        <Tooltip
                          key={item.id}
                          title={item.label}
                          purpose={item.purpose}
                          meaning={item.meaning}
                          position={collapsed ? 'right' : 'right'}
                          className="w-full"
                        >
                          {navButton}
                        </Tooltip>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Bottom Status Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/60">
          <Tooltip title="Estado do Projecto GovTech" purpose="Indicação do ambiente e plano de homologação" meaning="Infraestrutura prevista para o Correio Digital Angola">
            <div className={cn('flex items-center gap-3 px-2.5 py-2 rounded-xl bg-white border border-slate-200', collapsed && 'justify-center px-0')}>
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping flex-shrink-0" />
              {!collapsed && (
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-slate-800 leading-tight truncate">Projecto em Desenvolvimento</p>
                  <p className="text-[10px] text-blue-600 font-semibold truncate">Piloto Previsto (INAPEM)</p>
                </div>
              )}
            </div>
          </Tooltip>
        </div>
      </aside>
    </>
  );
}
