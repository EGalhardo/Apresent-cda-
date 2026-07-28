import React from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, Cell, PieChart, Pie, ReferenceLine,
} from 'recharts';
import { Printer, Download } from 'lucide-react';
import Card, { CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import AnimatedChartWrapper from '../components/ui/AnimatedChartWrapper';
import CountUp from '../components/ui/CountUp';
import ProgressBar from '../components/ui/ProgressBar';
import { formatAOA } from '../utils/format';
import { revenueProjection, capexData, scenarioData } from '../data/store';
import { useERP } from '../context/ERPContext';

export default function Financials() {
  const { settings, addToast } = useERP();
  const opexMonthly = settings.opexMonthly || 3850000;

  const cashFlow = revenueProjection.map((m, i) => {
    const rev = m.actual ?? m.projected;
    const net = rev - opexMonthly;
    const cumulative = revenueProjection.slice(0, i + 1).reduce((s, r) => s + ((r.actual ?? r.projected) - opexMonthly), 0);
    return { month: m.month, receita: rev, opex: opexMonthly, net, cumulative };
  });

  const trancheData = [
    { tranche: 'Tranche 1 (40%)', amount: 13836000, month: 'Mês 1', condition: 'CAPEX + Instalação Centro Operacional + Início Piloto INAPEM', color: '#3b82f6' },
    { tranche: 'Tranche 2 (35%)', amount: 12106500, month: 'Mês 3', condition: 'Relatório de Execução do Piloto + Evidências Operacionais', color: '#8b5cf6' },
    { tranche: 'Tranche 3 (25%)', amount: 8647500, month: 'Mês 6', condition: 'Evolução da plataforma + Base institucional + KPIs Phase 1', color: '#10b981' },
  ];

  function handlePrint() {
    addToast('A preparar documento para impressão/exportação PDF...', 'info');
    setTimeout(() => window.print(), 300);
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200 print:hidden">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Modelo Financeiro & Viabilidade</h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">Fluxo de caixa de 12 meses, cenários de viabilidade e tranches de investimento do Correio Digital Angola.</p>
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl text-xs transition-colors"
        >
          <Printer size={15} />
          Imprimir / Exportar PDF
        </button>
      </div>

      {/* Projection Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-200">
          <p className="text-xs text-gray-400 font-medium mb-1">Receita Anual Projectada</p>
          <p className="text-xl font-bold text-blue-600">{formatAOA(178000000, true)}</p>
          <p className="text-xs text-gray-400 mt-0.5">Cenário Moderado (Base)</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-200">
          <p className="text-xs text-gray-400 font-medium mb-1">Capital Recomendado</p>
          <p className="text-xl font-bold text-purple-600">{formatAOA(34590000, true)}</p>
          <p className="text-xs text-gray-400 mt-0.5">Opção 2 — Moderada</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-200">
          <p className="text-xs text-gray-400 font-medium mb-1">OPEX Total Ano 1</p>
          <p className="text-xl font-bold text-amber-600">{formatAOA(opexMonthly * 12, true)}</p>
          <p className="text-xs text-gray-400 mt-0.5">{formatAOA(opexMonthly, true)}/mês</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-200">
          <p className="text-xs text-gray-400 font-medium mb-1">Margem Operacional Anual</p>
          <p className="text-xl font-bold text-emerald-600">{formatAOA(178000000 - opexMonthly * 12, true)}</p>
          <p className="text-xs text-gray-400 mt-0.5">Ano 1 (Cenário Base)</p>
        </div>
      </div>

      {/* Revenue + Cash Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <CardTitle>Projecção de Receitas — 12 Meses</CardTitle>
              <p className="text-xs text-gray-400 mt-0.5">Receita vs OPEX Mensal ({formatAOA(opexMonthly, true)})</p>
            </div>
            <Badge variant="blue">Cenário Base</Badge>
          </div>
          <div className="h-60">
            <AnimatedChartWrapper className="w-full h-full">
              {({ isAnimationActive, key }) => (
                <ResponsiveContainer width="100%" height="100%" key={key}>
                  <AreaChart data={revenueProjection} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gProj" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                    <YAxis tickFormatter={v => formatAOA(v as number, true)} tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={70} />
                    <Tooltip formatter={(v: unknown) => formatAOA(v as number)} contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', fontSize: 12 }} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <ReferenceLine y={opexMonthly} stroke="#f59e0b" strokeDasharray="5 5" label={{ value: 'OPEX', fill: '#f59e0b', fontSize: 11 }} />
                    <Area type="monotone" dataKey="projected" name="Receita" stroke="#3b82f6" fill="url(#gProj)" strokeWidth={2} dot={false} isAnimationActive={isAnimationActive} animationDuration={1500} />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </AnimatedChartWrapper>
          </div>

          {/* Monthly table */}
          <div className="mt-4 border border-gray-100 rounded-xl overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-white border-b border-gray-100">
                <tr>
                  <th className="text-left px-3 py-2 text-gray-400 font-semibold">Mês</th>
                  <th className="text-right px-3 py-2 text-gray-400 font-semibold">Receita</th>
                  <th className="text-right px-3 py-2 text-gray-400 font-semibold">OPEX</th>
                  <th className="text-right px-3 py-2 text-gray-400 font-semibold">Resultado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {revenueProjection.map(m => {
                  const net = m.projected - opexMonthly;
                  return (
                    <tr key={m.month} className="hover:bg-blue-50/30">
                      <td className="px-3 py-2 font-medium text-gray-700">{m.month}</td>
                      <td className="px-3 py-2 text-right text-gray-900 font-semibold"><CountUp value={formatAOA(m.projected, true)} /></td>
                      <td className="px-3 py-2 text-right text-amber-600"><CountUp value={formatAOA(opexMonthly, true)} /></td>
                      <td className={`px-3 py-2 text-right font-bold ${net >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                        {net >= 0 ? '+' : ''}<CountUp value={formatAOA(net, true)} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Scenario Comparison */}
        <div className="space-y-4">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <CardTitle>3 Cenários de Financiamento</CardTitle>
            </div>
            <div className="h-44">
              <AnimatedChartWrapper className="w-full h-full">
                {({ isAnimationActive, key }) => (
                  <ResponsiveContainer width="100%" height="100%" key={key}>
                    <BarChart data={scenarioData} margin={{ top: 0, right: 5, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                      <XAxis dataKey="scenario" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                      <YAxis tickFormatter={v => formatAOA(v as number, true)} tick={{ fontSize: 9, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={70} />
                      <Tooltip formatter={(v: unknown) => formatAOA(v as number)} contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', fontSize: 12 }} />
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                      <Bar dataKey="capital" name="Capital Solicitado" fill="#6366f1" radius={[4, 4, 0, 0]} isAnimationActive={isAnimationActive} animationDuration={1500} />
                      <Bar dataKey="revenue" name="Receita Projetada" fill="#10b981" radius={[4, 4, 0, 0]} isAnimationActive={isAnimationActive} animationDuration={1500} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </AnimatedChartWrapper>
            </div>
            <div className="mt-3 space-y-2">
              {scenarioData.map((s, i) => (
                <div key={s.scenario} className={`p-3 rounded-xl border ${i === 1 ? 'border-blue-200 bg-blue-50' : 'border-gray-100 bg-white'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-gray-800">{s.scenario}</span>
                      {i === 1 && <Badge variant="blue" size="sm"> Recomendado</Badge>}
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Capital: <span className="font-bold text-gray-800"><CountUp value={formatAOA(s.capital, true)} /></span></p>
                      <p className="text-xs text-gray-500">Receita: <span className="font-bold text-emerald-600"><CountUp value={formatAOA(s.revenue, true)} /></span></p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{s.clients} clientes institucionais</p>
                </div>
              ))}
            </div>
          </Card>

          {/* CAPEX Breakdown */}
          <Card>
            <CardTitle>Estrutura de Investimento Inicial</CardTitle>
            <div className="mt-3 space-y-3">
              {capexData.map((item, i) => {
                const total = capexData.reduce((s, d) => s + d.value, 0);
                const pct = (item.value / total) * 100;
                const colors = ['red', 'blue', 'amber'] as const;
                return (
                  <div key={item.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.name}</span>
                      <span className="font-bold text-gray-900"><CountUp value={formatAOA(item.value, true)} /> <span className="text-gray-400 font-normal text-xs">({pct.toFixed(1)}%)</span></span>
                    </div>
                    <ProgressBar value={pct} color={colors[i]} duration={10000} />
                  </div>
                );
              })}
              <div className="pt-2 border-t border-gray-100 flex justify-between text-sm font-bold">
                <span className="text-gray-700">Total (Opção 2 Recomendada)</span>
                <span className="text-blue-600"><CountUp value={formatAOA(34590000, true)} /></span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Tranches */}
      <Card>
        <div className="flex items-center justify-between mb-5">
          <CardTitle>Cronograma de Desembolso por Tranches</CardTitle>
          <Badge variant="purple">34.590.000 AOA Total</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trancheData.map((t, i) => (
            <div key={t.tranche} className="relative">
              <div className="absolute top-5 right-full w-full h-0.5 bg-gray-200 hidden md:block" style={{ display: i === 0 ? 'none' : undefined }} />
              <div className="bg-white rounded-2xl p-5 border border-gray-200 hover:border-blue-200 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold" style={{ backgroundColor: t.color }}>
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{t.tranche}</p>
                    <p className="text-xs text-gray-400">{t.month} de Operação</p>
                  </div>
                </div>
                <p className="text-xl font-bold mb-2" style={{ color: t.color }}><CountUp value={formatAOA(t.amount, true)} /></p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  <strong className="text-gray-600">Condição:</strong> {t.condition}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Cumulative Cash Flow */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <CardTitle>Fluxo de Caixa Operacional Acumulado</CardTitle>
          <Badge variant={cashFlow[cashFlow.length - 1].cumulative >= 0 ? 'green' : 'red'}>
            <CountUp value={formatAOA(cashFlow[cashFlow.length - 1].cumulative, true)} /> acumulado
          </Badge>
        </div>
        <div className="h-56">
          <AnimatedChartWrapper className="w-full h-full">
            {({ isAnimationActive, key }) => (
              <ResponsiveContainer width="100%" height="100%" key={key}>
                <AreaChart data={cashFlow} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gCash" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={v => formatAOA(v as number, true)} tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={75} />
                  <Tooltip formatter={(v: unknown) => formatAOA(v as number)} contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <ReferenceLine y={0} stroke="#ef4444" strokeDasharray="4 4" />
                  <Area type="monotone" dataKey="cumulative" name="Fluxo Acumulado" stroke="#10b981" fill="url(#gCash)" strokeWidth={2.5} dot={false} isAnimationActive={isAnimationActive} animationDuration={1500} />
                  <Area type="monotone" dataKey="net" name="Resultado Mensal" stroke="#6366f1" fill="none" strokeWidth={1.5} strokeDasharray="4 4" dot={false} isAnimationActive={isAnimationActive} animationDuration={1500} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </AnimatedChartWrapper>
        </div>
      </Card>
    </div>
  );
}
