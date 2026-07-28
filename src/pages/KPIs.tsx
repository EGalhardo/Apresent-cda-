import React from 'react';
import { CheckCircle2, Clock, ArrowRight, Target, Zap, Shield, TrendingUp, BarChart3, Printer } from 'lucide-react';
import Card, { CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { formatAOA } from '../utils/format';
import { phaseGates } from '../data/store';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import { useERP } from '../context/ERPContext';

const commercialKPIs = [
  { label: 'Receita Média por Cliente (ARPA)', value: '22M – 36M AOA', unit: 'anuais', icon: TrendingUp, color: 'blue' },
  { label: 'Ciclo de Vendas B2G', value: '3 – 6', unit: 'meses', icon: Clock, color: 'amber' },
  { label: 'N.º Clientes — Final do Ano', value: '5 – 8', unit: 'instituições', icon: Target, color: 'purple' },
  { label: 'Transacções — Ano 1', value: '> 50.000', unit: 'comunicações oficiais', icon: Zap, color: 'green' },
  { label: 'MRR — Mês 12', value: '32.000.000 AOA', unit: '/mês', icon: BarChart3, color: 'blue' },
  { label: 'Margem Cambial Prudencial', value: '+15% – 20%', unit: 'sobre tecnologia', icon: Shield, color: 'gray' },
];

const iconColors: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-600',
  amber: 'bg-amber-100 text-amber-600',
  purple: 'bg-purple-100 text-purple-600',
  green: 'bg-emerald-100 text-emerald-600',
  gray: 'bg-gray-100 text-gray-600',
};

export default function KPIs() {
  const { institutions, invoices, addToast } = useERP();

  const activeInstitutionsCount = institutions.filter(i => i.status === 'active').length;
  const currentMRR = institutions.filter(i => i.status === 'active').reduce((s, i) => s + i.mrr, 0);
  const totalPaidRevenue = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0);

  const dynamicKpis = [
    { label: 'Adoção Institucional', current: activeInstitutionsCount, target: 8, unit: 'instituições' },
    { label: 'Receita Anual Recorrente (ARR)', current: currentMRR * 12, target: 178000000, unit: 'AOA' },
    { label: 'Gatilho Salarial (MRR Mês 6)', current: currentMRR, target: 12000000, unit: 'AOA' },
    { label: 'Receita Acumulada Cobrada', current: totalPaidRevenue, target: 178000000, unit: 'AOA' },
  ];

  const radarData = [
    { metric: 'Adoção Inst.', value: Math.min(100, (activeInstitutionsCount / 8) * 100), full: 100 },
    { metric: 'MRR', value: Math.min(100, (currentMRR / 12000000) * 100), full: 100 },
    { metric: 'Receita Real', value: Math.min(100, (totalPaidRevenue / 178000000) * 100), full: 100 },
    { metric: 'Cibersegurança', value: 85, full: 100 },
    { metric: 'Infra-estrutura', value: 90, full: 100 },
    { metric: 'Conformidade', value: 95, full: 100 },
  ];

  function handlePrint() {
    addToast('A preparar relatório de KPIs para impressão...', 'info');
    setTimeout(() => window.print(), 300);
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200 print:hidden">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Indicadores de Desempenho (KPIs)</h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">Acompanhamento em tempo real das metas operacionais, comerciais e financeiras do Correio Digital Angola.</p>
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl text-xs transition-colors"
        >
          <Printer size={15} />
          Imprimir / Exportar PDF
        </button>
      </div>

      {/* KPI Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dynamicKpis.map(kpi => {
          const pct = Math.min(100, (kpi.current / kpi.target) * 100);
          const color = pct >= 75 ? '#10b981' : pct >= 40 ? '#f59e0b' : '#3b82f6';
          return (
            <Card key={kpi.label}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-semibold text-gray-700">{kpi.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Actual: <span className="font-semibold text-gray-700">
                      {kpi.unit === 'AOA' ? formatAOA(kpi.current, true) : kpi.current.toLocaleString()}
                    </span>
                    {' '}/ Meta: <span className="font-semibold text-gray-700">
                      {kpi.unit === 'AOA' ? formatAOA(kpi.target, true) : kpi.target.toLocaleString()}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold" style={{ color }}>{pct.toFixed(1)}%</p>
                  <p className="text-xs text-gray-400">da meta</p>
                </div>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${pct}%`, backgroundColor: color }} />
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Marcos de Controlo */}
      <Card>
        <div className="flex items-center justify-between mb-5">
          <CardTitle>Marcos de Controlo — Critérios de Transição</CardTitle>
          <Badge variant="blue">3 Fases</Badge>
        </div>
        <div className="space-y-4">
          {phaseGates.map(gate => {
            const isActive = gate.status === 'in_progress';
            const isDone = gate.status === 'done';
            return (
              <div key={gate.id} className={`relative p-5 rounded-2xl border-2 transition-all ${
                isActive ? 'border-blue-300 bg-blue-50' :
                isDone ? 'border-emerald-300 bg-emerald-50' :
                'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isActive ? 'bg-blue-500' : isDone ? 'bg-emerald-500' : 'bg-gray-300'
                  }`}>
                    {isDone ? (
                      <CheckCircle2 size={18} className="text-white" />
                    ) : isActive ? (
                      <Clock size={18} className="text-white" />
                    ) : (
                      <span className="text-white font-bold text-sm">{gate.id}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="font-bold text-gray-800">{gate.name}</span>
                      <Badge variant={isActive ? 'blue' : isDone ? 'green' : 'gray'}>
                        {isActive ? 'Em Progresso' : isDone ? 'Concluído' : 'Pendente'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
                      <span className="font-medium bg-white px-3 py-1 rounded-lg border border-gray-200">{gate.from}</span>
                      <ArrowRight size={14} className="text-gray-400 flex-shrink-0" />
                      <span className="font-medium bg-white px-3 py-1 rounded-lg border border-gray-200">{gate.to}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                      <strong className="text-gray-600">Condição:</strong> {gate.condition}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Radar + Commercial KPIs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Radar */}
        <Card>
          <CardTitle>Desempenho Operacional (% da Meta)</CardTitle>
          <div className="h-64 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#f0f0f0" />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: '#6b7280' }} />
                <Radar name="Actual" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} strokeWidth={2} />
                <Tooltip formatter={(v: unknown) => `${(v as number).toFixed(1)}%`} contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', fontSize: 12 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Commercial KPIs */}
        <Card>
          <CardTitle>Indicadores Comerciais Esperados</CardTitle>
          <div className="mt-3 space-y-3">
            {commercialKPIs.map(kpi => {
              const IconComp = kpi.icon;
              return (
                <div key={kpi.label} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${iconColors[kpi.color]}`}>
                    <IconComp size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">{kpi.label}</p>
                    <p className="text-sm font-bold text-gray-900">{kpi.value}</p>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{kpi.unit}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Expansion Strategy */}
      <Card>
        <CardTitle>Estratégia de Crescimento e Expansão</CardTitle>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { phase: 'Fase 1', title: 'Piloto INAPEM', desc: 'Validar a proposta de operação. Integrar primeiros parceiros institucionais. Ajustar modelo financeiro.', color: 'from-blue-500 to-blue-600', status: 'Em Planeamento' },
            { phase: 'Fase 2', title: 'Expansão Provincial', desc: 'Implementação gradual nas 21 províncias. Formação de equipas locais. Expansão B2G.', color: 'from-purple-500 to-purple-600', status: 'Planeado' },
            { phase: 'Fase 3', title: 'Escala Nacional', desc: 'Cobertura nacional. Integração com serviços públicos. Consolidação da plataforma.', color: 'from-emerald-500 to-emerald-600', status: 'Futuro' },
            { phase: 'Fase 4', title: 'Expansão Internacional', desc: 'CPLP, PALOP e SADC. Exportação do modelo GovTech. Parcerias regionais.', color: 'from-amber-500 to-amber-600', status: 'Longo Prazo' },
          ].map(p => (
            <div key={p.phase} className="rounded-2xl overflow-hidden border border-gray-200">
              <div className={`bg-gradient-to-br ${p.color} p-4 text-white`}>
                <p className="text-xs font-semibold opacity-80">{p.phase}</p>
                <p className="font-bold text-base mt-0.5">{p.title}</p>
                <Badge variant="gray" size="sm">{p.status}</Badge>
              </div>
              <div className="p-4 bg-white">
                <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
