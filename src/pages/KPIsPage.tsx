import React from 'react';
import { Target, TrendingUp, Zap, Shield, BarChart3, Clock, Printer, Award, Building2, Wallet, Users, Coins, Calendar, Bell } from 'lucide-react';
import Card, { CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Tooltip from '../components/ui/Tooltip';
import { formatAOA } from '../utils/format';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { useERP } from '../context/ERPContext';

const commercialKPIs = [
  { label: 'Receita Média por Cliente (ARPA)', value: '22M – 36M AOA', unit: 'anuais', icon: TrendingUp, color: 'blue' },
  { label: 'Ciclo de Vendas B2C', value: '3 – 6', unit: 'meses', icon: Clock, color: 'amber' },
  { label: 'N.º Clientes Âncora — Final Ano 1', value: '5 – 8', unit: 'instituições', icon: Award, color: 'purple' },
  { label: 'Transacções Oficialmente Notificadas', value: '> 50.000', unit: 'comunicações', icon: Bell, color: 'green' },
  { label: 'MRR Projectado — Mês 12', value: '32.000.000 AOA', unit: '/mês', icon: BarChart3, color: 'blue' },
  { label: 'Margem Cambial Prudencial', value: '+15% – 20%', unit: 'proteção infraestrutura', icon: Shield, color: 'gray' },
];

const iconColors: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-600',
  amber: 'bg-amber-100 text-amber-600',
  purple: 'bg-purple-100 text-purple-600',
  green: 'bg-emerald-100 text-emerald-600',
  gray: 'bg-slate-100 text-slate-600',
};

export default function KPIsPage() {
  const { invoices, addToast } = useERP();

  // Simulated metrics for KPI calculation
  const activeInstitutionsCount = 2; // INAPEM + MinJustiça pilot
  const currentMRR = 3000000;
  const totalPaidRevenue = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0);

  const mainProgressKpis = [
    {
      id: 'adoption',
      title: 'Adoção Institucional',
      actualText: `Actual: ${activeInstitutionsCount} / Meta: 8`,
      pct: 25.0,
      icon: Building2,
      iconBg: 'bg-blue-100 text-blue-600',
      meaning: 'Progresso em direcção às 8 instituições âncora previstas no Ano 1'
    },
    {
      id: 'arr',
      title: 'Receita Anual Recorrente (ARR)',
      actualText: `Actual: 38.0M AOA / Meta: 178.0M AOA`,
      pct: 20.2,
      icon: Wallet,
      iconBg: 'bg-emerald-100 text-emerald-600',
      meaning: 'Métrica de ritmo anualizado com base nas subscrições activas'
    },
    {
      id: 'trigger',
      title: 'Gatilho Salarial (MRR Mês 6)',
      actualText: `Actual: 3.0M AOA / Meta: 12.0M AOA`,
      pct: 25.0,
      icon: Users,
      iconBg: 'bg-purple-100 text-purple-600',
      meaning: 'Meta de 12M AOA no Mês 6 para activação da grelha salarial executiva'
    },
    {
      id: 'revenue',
      title: 'Receita Acumulada Cobrada',
      actualText: `Actual: 14.5M AOA / Meta: 178.0M AOA`,
      pct: 8.1,
      icon: Coins,
      iconBg: 'bg-amber-100 text-amber-600',
      meaning: 'Valor efectivo já faturado e liquidado pelas instituições públicas'
    },
  ];

  const radarData = [
    { metric: 'Adoção Inst.', value: 25 },
    { metric: 'MRR Recorrente', value: 25 },
    { metric: 'Receita Real', value: 20 },
    { metric: 'Cibersegurança', value: 85 },
    { metric: 'Infra-estrutura', value: 90 },
    { metric: 'Conformidade', value: 95 },
  ];

  function handlePrint() {
    addToast('A preparar relatório de KPIs para impressão PDF...', 'info');
    setTimeout(() => window.print(), 300);
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header matching image layout */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm print:hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
              <BarChart3 size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="blue">Painel de Métricas</Badge>
                <span className="text-xs text-slate-700 font-semibold">Indicadores Chave de Sucesso</span>
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Indicadores de Sucesso (KPIs)</h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5 max-w-4xl leading-relaxed text-justify">
                Os Indicadores-Chave de Desempenho (KPIs) permitem acompanhar, em tempo real, a evolução do Correio Digital Angola relativamente às metas estratégicas definidas. Entre os principais indicadores destacam-se a adoção institucional, crescimento das receitas recorrentes, sustentabilidade financeira, número de notificações oficiais processadas, retenção de clientes e evolução da rentabilidade da plataforma.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto justify-end">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
              <Calendar size={14} />
              <span>24 de Julho de 2026</span>
            </div>
            <Tooltip title="Imprimir Relatório de KPIs" purpose="Gerar ficheiro em PDF com as métricas do sistema" meaning="Abre o menu de impressão">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow-md active:scale-95"
              >
                <Printer size={16} />
                <span>Imprimir Relatório KPIs</span>
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Top 4 Stat Counter Cards matching reference image */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center gap-3.5 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 border border-blue-100">
              <Target size={22} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">ADOÇÃO B2C</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900">2 / 8</span>
                <span className="text-xs font-semibold text-slate-500">Pilotos</span>
              </div>
            </div>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full w-1/4 rounded-full" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3.5 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 border border-emerald-100">
              <TrendingUp size={22} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">RECEITA COBRADA</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-emerald-600">14.5M AOA</span>
                <span className="text-xs font-bold text-emerald-700">YTD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3.5 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0 border border-purple-100">
              <Award size={22} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">GATILHO MÊS 6</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-purple-700">12M AOA</span>
                <span className="text-xs font-bold text-purple-600">MRR</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3.5 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 border border-amber-100">
              <Zap size={22} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">META NOTIFICAÇÕES</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-amber-800">&gt; 50.000</span>
                <span className="text-xs font-bold text-amber-700">Ano 1</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Main Progress Cards (2x2 Grid) matching image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {mainProgressKpis.map(kpi => {
          const IconComp = kpi.icon;
          return (
            <Tooltip
              key={kpi.id}
              title={kpi.title}
              purpose={`Acompanhamento de meta: ${kpi.title}`}
              meaning={kpi.meaning}
              className="w-full"
            >
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3.5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${kpi.iconBg}`}>
                      <IconComp size={22} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{kpi.title}</h3>
                      <p className="text-xs text-slate-600 font-medium mt-0.5">{kpi.actualText}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-black text-blue-600">{kpi.pct.toFixed(1)}%</p>
                    <p className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">DA META</p>
                  </div>
                </div>

                <div className="h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 mb-2">
                  <div className="h-full bg-blue-600 rounded-full transition-all duration-700" style={{ width: `${kpi.pct}%` }} />
                </div>

                <div className="flex justify-between text-[11px] text-slate-400 font-medium px-1">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100% (Meta Concluída)</span>
                </div>
              </div>
            </Tooltip>
          );
        })}
      </div>

      {/* Bottom Grid (Radar + Commercial) matching image */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Card: Multidimensional Radar */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-bold text-slate-900">Desempenho Operacional Multidimensional (% da Meta)</h3>
              <Badge variant="blue" className="font-bold">6 Dimensões</Badge>
            </div>
            <p className="text-xs text-slate-500 font-medium mb-4">
              Equilíbrio estratégico entre segurança, adopção B2C, infraestrutura e conformidade
            </p>
          </div>

          <div className="h-72 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: '#1e293b', fontWeight: 600 }} />
                <Radar name="Execução Actual" dataKey="value" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.4} strokeWidth={2.5} />
                <RechartsTooltip formatter={(v: unknown) => `${(v as number).toFixed(1)}%`} contentStyle={{ borderRadius: 12, border: '1px solid #cbd5e1', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontSize: 12, fontWeight: 700 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Bottom Legend */}
          <div className="flex flex-wrap items-center justify-around gap-2 pt-4 border-t border-slate-100 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
              <span>Abaixo da Meta</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>Em Desenvolvimento</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <span>No Caminho</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Meta Concluída</span>
            </div>
          </div>
        </div>

        {/* Right Card: Commercial KPIs */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-bold text-slate-900">Indicadores Comerciais & Financeiros Chave</h3>
              <span className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-full">
                Parâmetros B2C
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mb-4">
              Parâmetros de rentabilidade e velocidade de conversão no sector público
            </p>
          </div>

          <div className="space-y-3">
            {commercialKPIs.map(kpi => {
              const IconComp = kpi.icon;
              return (
                <Tooltip
                  key={kpi.label}
                  title={kpi.label}
                  purpose={`Indicador comercial: ${kpi.label}`}
                  meaning={`Valor de referência projectado: ${kpi.value} (${kpi.unit})`}
                  className="w-full"
                >
                  <div className="flex items-center gap-4 p-3.5 bg-white rounded-2xl hover:bg-slate-50 transition-colors border border-slate-300 shadow-2xs">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-200 ${iconColors[kpi.color]}`}>
                      <IconComp size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-800 font-bold">{kpi.label}</p>
                      <p className="text-sm font-extrabold text-slate-900">{kpi.value}</p>
                    </div>
                    <span className="text-xs text-slate-700 font-bold bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-300 flex-shrink-0">
                      {kpi.unit}
                    </span>
                  </div>
                </Tooltip>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

