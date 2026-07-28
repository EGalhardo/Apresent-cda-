import React from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell,
} from 'recharts';
import {
  Building2, TrendingUp, Wallet, Receipt,
  Users, AlertCircle, CheckCircle2, Clock, Download,
} from 'lucide-react';
import { useERP } from '../context/ERPContext';
import { formatAOA } from '../utils/format';
import StatCard from '../components/ui/StatCard';
import Card, { CardHeader, CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { revenueProjection, opexBreakdown, kpiTargets } from '../data/store';

export default function Dashboard() {
  const { institutions, invoices, expenses, settings, addToast } = useERP();

  const opexMonthly = settings.opexMonthly || 3850000;
  const activeInstitutions = institutions.filter(i => i.status === 'active').length;
  const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0);
  const pendingRevenue = invoices.filter(i => i.status === 'pending').reduce((s, i) => s + i.amount, 0);
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const mrr = institutions.filter(i => i.status === 'active').reduce((s, i) => s + i.mrr, 0);

  const recentInvoices = [...invoices].sort((a, b) => b.issueDate.localeCompare(a.issueDate)).slice(0, 5);

  const customTooltipFormatter = (value: unknown) => formatAOA(value as number, true);

  const breakEvenMonth = revenueProjection.findIndex(m => m.projected >= opexMonthly);

  function handleExportDashboard() {
    const csvRows = [
      ['Indicador', 'Valor Actual'],
      ['Empresa', settings.companyName],
      ['Fase', settings.phase],
      ['Instituicoes Activas', `${activeInstitutions}/${institutions.length}`],
      ['Receita Acumulada', totalRevenue],
      ['Receita Pendente', pendingRevenue],
      ['MRR Actual', mrr],
      ['OPEX Mensal', opexMonthly],
      ['Despesas Totais Registadas', totalExpenses],
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CDA_Resumo_Executivo_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Relatório Resumo Executivo exportado em CSV com sucesso!', 'success');
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200">
        <div>
          <h2 className="text-base font-bold text-gray-900">{settings.companyName} — Painel de Controlo</h2>
          <p className="text-xs text-gray-500">{settings.phase} | Visão executiva em tempo real</p>
        </div>
        <button
          onClick={handleExportDashboard}
          className="flex items-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 font-semibold px-4 py-2 rounded-xl text-xs transition-colors"
        >
          <Download size={14} />
          Exportar Resumo (CSV)
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Instituições Activas"
          value={`${activeInstitutions} / ${institutions.length}`}
          subtitle="Meta: 8 no Mês 12"
          icon={Building2}
          color="blue"
          trend={{ value: 'Piloto INAPEM Previsto', up: true }}
        />
        <StatCard
          title="Receita Acumulada"
          value={formatAOA(totalRevenue, true)}
          subtitle="Meta: 178M AOA (Ano 1)"
          icon={TrendingUp}
          color="green"
          trend={{ value: formatAOA(pendingRevenue, true) + ' pendente', up: true }}
        />
        <StatCard
          title="MRR Actual"
          value={formatAOA(mrr, true)}
          subtitle={`Meta Gatilho: ${formatAOA(settings.mrrTrigger, true)}`}
          icon={Receipt}
          color="purple"
          trend={{ value: 'Gatilho Salarial: Mês 6', up: true }}
        />
        <StatCard
          title="OPEX Mensal"
          value={formatAOA(opexMonthly, true)}
          subtitle={`${formatAOA(opexMonthly * 12, true)} / ano`}
          icon={Wallet}
          color="amber"
          trend={{ value: `${formatAOA(totalExpenses, true)} total registado`, up: false }}
        />
      </div>

      {/* Revenue Chart + OPEX Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Area Chart */}
        <Card className="lg:col-span-2" padding={false}>
          <div className="p-6 pb-2">
            <CardHeader className="mb-0">
              <CardTitle>Projecção de Receitas vs OPEX — Ano 1</CardTitle>
              <Badge variant="blue">178M AOA meta</Badge>
            </CardHeader>
          </div>
          <div className="px-2 pb-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueProjection} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={v => formatAOA(v, true)} tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={70} />
                <Tooltip formatter={customTooltipFormatter} contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="projected" name="Receita Projectada" stroke="#3b82f6" fill="url(#gradRevenue)" strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="actual" name="Receita Real" stroke="#10b981" fill="url(#gradActual)" strokeWidth={2.5} dot={{ fill: '#10b981', r: 4 }} connectNulls={false} />
                <Area type="monotone" dataKey="opex" name="OPEX Mensal" stroke="#f59e0b" fill="none" strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* OPEX Breakdown Pie */}
        <Card padding={false}>
          <div className="p-6 pb-2">
            <CardTitle>Distribuição OPEX</CardTitle>
            <p className="text-xs text-slate-700 font-medium mt-0.5">{formatAOA(opexMonthly, true)} / mês</p>
          </div>
          <div className="h-44 px-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={opexBreakdown} dataKey="value" cx="50%" cy="50%" outerRadius={70} innerRadius={40}>
                  {opexBreakdown.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: unknown) => formatAOA(v as number)} contentStyle={{ borderRadius: 8, fontSize: 12, border: '1px solid #cbd5e1', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="px-5 pb-5 space-y-1.5">
            {opexBreakdown.map(item => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-800 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-gray-900">{formatAOA(item.value, true)}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* KPI Progress + Recent Invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* KPI Cards */}
        <Card>
          <CardHeader>
            <CardTitle>KPIs — Progresso Fase Piloto</CardTitle>
            <Badge variant="yellow">Mês {Math.floor(totalRevenue / (178000000 / 12)) + 1} estimado</Badge>
          </CardHeader>
          <div className="space-y-4">
            {kpiTargets.map(kpi => {
              const pct = Math.min(100, (kpi.current / kpi.target) * 100);
              return (
                <div key={kpi.label}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-slate-800 font-semibold">{kpi.label}</span>
                    <span className="text-gray-900 font-bold">
                      {kpi.unit === 'AOA' ? formatAOA(kpi.current, true) : kpi.current.toLocaleString()}
                      <span className="text-slate-600 font-semibold"> / {kpi.unit === 'AOA' ? formatAOA(kpi.target, true) : kpi.target.toLocaleString()}</span>
                    </span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        background: pct >= 75 ? '#10b981' : pct >= 40 ? '#f59e0b' : '#3b82f6',
                      }}
                    />
                  </div>
                  <p className="text-xs text-slate-700 font-medium mt-0.5">{pct.toFixed(1)}% da meta</p>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Recent Invoices */}
        <Card>
          <CardHeader>
            <CardTitle>Últimas Facturas</CardTitle>
            <Badge variant="blue">{invoices.length} total</Badge>
          </CardHeader>
          <div className="space-y-2">
            {recentInvoices.map(inv => (
              <div key={inv.id} className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-blue-50/30 transition-colors border border-gray-200">
                <div className="flex items-center gap-3">
                  {inv.status === 'paid' ? (
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                  ) : inv.status === 'overdue' ? (
                    <AlertCircle size={16} className="text-red-600 flex-shrink-0" />
                  ) : (
                    <Clock size={16} className="text-amber-600 flex-shrink-0" />
                  )}
                  <div>
                    <p className="text-sm font-bold text-gray-900 truncate max-w-[180px]">{inv.institutionName}</p>
                    <p className="text-xs text-slate-600 font-medium">{inv.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-extrabold text-gray-900">{formatAOA(inv.amount, true)}</p>
                  <Badge variant={inv.status === 'paid' ? 'green' : inv.status === 'pending' ? 'yellow' : 'red'}>
                    {inv.status === 'paid' ? 'Pago' : inv.status === 'pending' ? 'Pendente' : 'Vencido'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Building2 size={15} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-blue-800">Piloto INAPEM Previsto</p>
            <p className="text-xs text-blue-600 mt-0.5">Marco de Controlo 1 em planeamento. Preparação para o piloto em curso.</p>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <div className="w-8 h-8 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <AlertCircle size={15} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-amber-800">Gatilho Salarial — Mês 6</p>
            <p className="text-xs text-amber-600 mt-0.5">Revisão salarial activada quando MRR ≥ {formatAOA(settings.mrrTrigger, true)}.</p>
          </div>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <TrendingUp size={15} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-emerald-800">Break-Even: Mês {breakEvenMonth >= 0 ? breakEvenMonth + 1 : '—'}</p>
            <p className="text-xs text-emerald-600 mt-0.5">Receita supera OPEX a partir do Mês {breakEvenMonth >= 0 ? breakEvenMonth + 1 : '—'} projectado.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

