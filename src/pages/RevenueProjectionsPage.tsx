import React, { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, ResponsiveContainer, Legend, ReferenceLine
} from 'recharts';
import { TrendingUp, AlertTriangle, CheckCircle2, Printer, Info, Calculator, DollarSign, Layers } from 'lucide-react';
import Card, { CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Tooltip from '../components/ui/Tooltip';
import { useERP } from '../context/ERPContext';
import { formatAOA } from '../utils/format';

export default function RevenueProjectionsPage() {
  const { settings, addToast } = useERP();
  const opexMonthly = settings.opexMonthly || 3850000;

  // State to toggle Mês 1 Adjustment (Análise Crítica Mês 1)
  const [adjustedMonth1, setAdjustedMonth1] = useState(true);

  // Original projection vs Adjusted Projection
  // Mês 1 original was 2.000.000 AOA. Adjusted Mês 1 is 500.000 AOA (Taxa de Preparação & Piloto INAPEM)
  const rawProjections = [
    { month: 'Mês 1 (Jan)', rawProjected: 2000000, adjProjected: 500000, note: 'Piloto INAPEM (Taxa de Ajuste Piloto)' },
    { month: 'Mês 2 (Fev)', rawProjected: 3000000, adjProjected: 3000000, note: 'Conclusão Gate 1 & Assinatura SaaS' },
    { month: 'Mês 3 (Mar)', rawProjected: 5000000, adjProjected: 5000000, note: 'Break-even Operacional (MRR > OPEX)' },
    { month: 'Mês 4 (Abr)', rawProjected: 7000000, adjProjected: 7000000, note: 'Expansão Min. Justiça' },
    { month: 'Mês 5 (Mai)', rawProjected: 9000000, adjProjected: 9000000, note: 'Adesão AGT / Finanças' },
    { month: 'Mês 6 (Jun)', rawProjected: 12000000, adjProjected: 12000000, note: 'Meta Gatilho Salarial (12M AOA)' },
    { month: 'Mês 7 (Jul)', rawProjected: 15000000, adjProjected: 15000000, note: 'Entrada Banco BFA' },
    { month: 'Mês 8 (Ago)', rawProjected: 18000000, adjProjected: 18000000, note: 'Adesão INSS' },
    { month: 'Mês 9 (Set)', rawProjected: 22000000, adjProjected: 22000000, note: 'Escala B2G Provincial' },
    { month: 'Mês 10 (Out)', rawProjected: 25000000, adjProjected: 25000000, note: 'Empresas Públicas Âncora' },
    { month: 'Mês 11 (Nov)', rawProjected: 28000000, adjProjected: 28000000, note: 'Consolidação de Licenças' },
    { month: 'Mês 12 (Dez)', rawProjected: 32000000, adjProjected: 32000000, note: 'Encerramento Ano 1' },
  ];

  const projectionsData = rawProjections.map((p, index) => {
    const projected = adjustedMonth1 ? p.adjProjected : p.rawProjected;
    const net = projected - opexMonthly;
    return {
      month: p.month,
      receita: projected,
      opex: opexMonthly,
      net,
      note: p.note,
    };
  });

  // Recalculate totals dynamically
  const totalRevenue = projectionsData.reduce((sum, item) => sum + item.receita, 0);
  const totalOpex = opexMonthly * 12;
  const totalNetMargin = totalRevenue - totalOpex;
  const breakEvenMonthItem = projectionsData.find(item => item.receita >= opexMonthly);

  // Cumulative calculation
  let runningCumulative = 0;
  const cashFlowData = projectionsData.map(item => {
    runningCumulative += item.net;
    return {
      ...item,
      cumulative: runningCumulative,
    };
  });

  function handlePrint() {
    addToast('A preparar Projeção Financeira para impressão PDF...', 'info');
    setTimeout(() => window.print(), 300);
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl print:hidden">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="blue">Demonstrativo Financeiro</Badge>
            <span className="text-xs text-gray-400 font-mono">Ano 1 (12 Meses)</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Projeções de Receita</h1>
          <p className="text-xs sm:text-sm text-gray-600 font-medium max-w-4xl leading-relaxed text-justify">
            As projeções financeiras apresentam a evolução prevista das receitas, custos operacionais, margem bruta, EBITDA e rentabilidade durante o primeiro ano de atividade. As estimativas baseiam-se na adoção progressiva da plataforma por instituições públicas e privadas, permitindo demonstrar a sustentabilidade económica do modelo de negócio e o potencial de crescimento do projeto.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Tooltip title="Imprimir / Exportar PDF" purpose="Gerar relatório impresso da demonstração financeira" meaning="Abre o assistente de impressão do navegador">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-xl text-xs transition-colors"
            >
              <Printer size={15} />
              Exportar PDF
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Critical Analysis Box - Requirement 8 */}
      <Card className="p-6 bg-white border border-amber-300 rounded-3xl space-y-4 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-100 text-amber-800 rounded-xl">
              <AlertTriangle size={22} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Análise Crítica: Ajuste de Receita do Mês 1 (Piloto INAPEM)</h2>
              <p className="text-xs text-slate-900 font-bold">Reavaliação de coerência entre o plano operacional, fase de teste e modelo financeiro</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-300 shadow-xs">
            <button
              onClick={() => {
                setAdjustedMonth1(true);
                addToast('Projeção actualizada: Valor corrigido Mês 1 (500.000 AOA)', 'success');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                adjustedMonth1 ? 'bg-blue-600 text-white border-blue-700 shadow-2xs' : 'border-transparent text-slate-800 hover:bg-slate-100'
              }`}
            >
              Com Ajuste Crítico (500k)
            </button>
            <button
              onClick={() => {
                setAdjustedMonth1(false);
                addToast('Aviso: Projeção original sem ajuste de arranque piloto (2M AOA)', 'warning');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                !adjustedMonth1 ? 'bg-amber-600 text-white border-amber-700 shadow-2xs' : 'border-transparent text-slate-800 hover:bg-slate-100'
              }`}
            >
              Sem Ajuste (2M)
            </button>
          </div>
        </div>

        <div className="text-xs sm:text-sm text-slate-900 font-medium leading-relaxed space-y-2">
          <p className="text-slate-900 font-medium">
            <strong className="text-slate-900 font-bold">Justificação Técnica e Comercial:</strong> No Mês 1 de operação, o Correio Digital Angola executa a instalação do Centro Operacional, testes de penetração e a homologação do piloto no INAPEM. Cobrar a totalidade da mensalidade SaaS de 2.000.000 AOA antes do fecho do Phase Gate 1 criava uma inconsistência comercial.
          </p>
          <p className="text-slate-900 text-xs sm:text-sm font-medium">
            A receita do Mês 1 foi assim ajustada para <strong className="text-blue-700 font-extrabold">500.000 AOA</strong> (correspondente à taxa de preparação inicial e testes do protocolo), permitindo que a cobrança integral SaaS arranque com o parecer favorável no Mês 2.
          </p>
        </div>
      </Card>

      {/* Key Financial KPIs Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Tooltip title="Receita Total Ano 1" purpose="Somatório das receitas projectadas ao longo de 12 meses" meaning="Valor total acumulado com ajuste do Mês 1">
          <Card className="p-5">
            <p className="text-xs text-slate-700 font-semibold mb-1">Receita Total Ano 1</p>
            <p className="text-xl font-extrabold text-blue-600">{formatAOA(totalRevenue, true)}</p>
            <p className="text-[11px] text-slate-600 font-medium mt-1">Média: {formatAOA(Math.round(totalRevenue / 12), true)} / mês</p>
          </Card>
        </Tooltip>

        <Tooltip title="Custos de Funcionamento Anuais" purpose="Custos operacionais fixos acumulados durante 12 meses" meaning="Calculado com base em 3.850.000 AOA/mês">
          <Card className="p-5">
            <p className="text-xs text-slate-700 font-semibold mb-1">Custos Totais (Ano 1)</p>
            <p className="text-xl font-extrabold text-amber-600">{formatAOA(totalOpex, true)}</p>
            <p className="text-[11px] text-slate-600 font-medium mt-1">{formatAOA(opexMonthly, true)} / mês</p>
          </Card>
        </Tooltip>

        <Tooltip title="Margem Operacional Líquida" purpose="Resultado operacional antes de impostos (Receita - Custos)" meaning="Rentabilidade líquida gerada pela operação no Ano 1">
          <Card className="p-5">
            <p className="text-xs text-slate-700 font-semibold mb-1">Margem Operacional Ano 1</p>
            <p className={`text-xl font-extrabold ${totalNetMargin >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
              {formatAOA(totalNetMargin, true)}
            </p>
            <p className="text-[11px] text-slate-600 font-medium mt-1">Margem Líquida: {Math.round((totalNetMargin / totalRevenue) * 100)}%</p>
          </Card>
        </Tooltip>

        <Tooltip title="Ponto de Equilíbrio (Autonomia)" purpose="Mês em que a receita mensal supera os custos de funcionamento" meaning="Momento em que a operação se torna auto-sustentável">
          <Card className="p-5">
            <p className="text-xs text-slate-700 font-semibold mb-1">Ponto de Equilíbrio</p>
            <p className="text-xl font-extrabold text-purple-600">
              {breakEvenMonthItem ? breakEvenMonthItem.month : 'Mês 3'}
            </p>
            <p className="text-[11px] text-emerald-700 font-bold mt-1">Receita ≥ {formatAOA(opexMonthly, true)}</p>
          </Card>
        </Tooltip>
      </div>

      {/* Chart Section */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
          <div>
            <CardTitle>Evolução de Receita vs OPEX Mensal</CardTitle>
            <p className="text-xs text-slate-700 font-medium">Comparativo mensal e linha de custo fixo operacional</p>
          </div>
          <Badge variant="blue">Cenário Base Reavaliado</Badge>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={projectionsData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#334155', fontWeight: 600 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={v => formatAOA(v as number, true)} tick={{ fontSize: 11, fill: '#334155', fontWeight: 600 }} axisLine={false} tickLine={false} width={80} />
              <RechartsTooltip formatter={(v: unknown) => formatAOA(v as number)} contentStyle={{ borderRadius: 12, border: '1px solid #cbd5e1', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontSize: 12, fontWeight: 600 }} />
              <Legend wrapperStyle={{ fontSize: 12, fontWeight: 600 }} />
              <ReferenceLine y={opexMonthly} stroke="#d97706" strokeDasharray="5 5" label={{ value: `OPEX (${formatAOA(opexMonthly, true)})`, fill: '#b45309', fontSize: 11, fontWeight: 700 }} />
              <Area type="monotone" dataKey="receita" name="Receita Projetada" stroke="#2563eb" fill="url(#colorRev)" strokeWidth={3} dot={{ r: 4, fill: '#2563eb' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Projection Table - Requirement 8 */}
      <Card padding={false} className="overflow-hidden border border-slate-300 shadow-sm">
        <div className="p-5 border-b border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="text-slate-900 text-lg">Tabela de Projeções e Margem Operacional por Mês</CardTitle>
            <p className="text-xs text-slate-700 font-medium mt-0.5">
              Demonstração pormenorizada de receitas, OPEX e margem acumulada recalculada com o ajuste do piloto INAPEM no Mês 1
            </p>
          </div>
          <Badge variant="blue" className="w-fit font-semibold px-3 py-1">12 Meses de Operação</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse min-w-[950px]">
            <thead className="bg-slate-100 text-slate-900 font-extrabold uppercase tracking-wider border-b-2 border-slate-300">
              <tr>
                <th className="px-5 py-4 min-w-[150px]">Mês de Operação</th>
                <th className="px-5 py-4 text-right min-w-[150px]">Receita Projetada</th>
                <th className="px-5 py-4 text-right min-w-[140px]">OPEX Mensal</th>
                <th className="px-5 py-4 text-right min-w-[150px]">Margem Líquida</th>
                <th className="px-5 py-4 text-right min-w-[160px]">Caixa Acumulado</th>
                <th className="px-5 py-4 min-w-[280px]">Marco / Atividade Operacional</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-semibold text-slate-900 bg-white">
              {cashFlowData.map((row, idx) => (
                <tr 
                  key={row.month} 
                  className={`hover:bg-blue-50/80 transition-colors ${idx === 0 && adjustedMonth1 ? 'bg-amber-50/90' : idx % 2 === 1 ? 'bg-slate-50/70' : 'bg-white'}`}
                >
                  <td className="px-5 py-4 font-bold text-slate-900 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{row.month}</span>
                      {idx === 0 && adjustedMonth1 && (
                        <span className="text-[10px] bg-amber-100 text-amber-900 border border-amber-400 px-2 py-0.5 rounded-md font-mono font-bold shadow-2xs">Ajustado</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right font-extrabold text-blue-700 whitespace-nowrap text-sm sm:text-base">
                    {formatAOA(row.receita)}
                  </td>
                  <td className="px-5 py-4 text-right text-amber-800 font-extrabold whitespace-nowrap text-sm sm:text-base">
                    {formatAOA(row.opex)}
                  </td>
                  <td className={`px-5 py-4 text-right font-extrabold whitespace-nowrap text-sm sm:text-base ${row.net >= 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                    {row.net >= 0 ? '+' : ''}{formatAOA(row.net)}
                  </td>
                  <td className={`px-5 py-4 text-right font-extrabold whitespace-nowrap text-sm sm:text-base ${row.cumulative >= 0 ? 'text-emerald-700' : 'text-slate-900'}`}>
                    {formatAOA(row.cumulative)}
                  </td>
                  <td className="px-5 py-4 text-slate-900 font-semibold leading-relaxed">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-900 text-xs sm:text-sm">{row.note}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-900 text-white font-bold text-xs border-t-2 border-slate-800">
              <tr>
                <td className="px-5 py-4 font-extrabold text-sm whitespace-nowrap">TOTAL ANO 1</td>
                <td className="px-5 py-4 text-right text-blue-300 font-extrabold text-sm sm:text-base whitespace-nowrap">{formatAOA(totalRevenue)}</td>
                <td className="px-5 py-4 text-right text-amber-300 font-extrabold text-sm sm:text-base whitespace-nowrap">{formatAOA(totalOpex)}</td>
                <td className={`px-5 py-4 text-right font-extrabold text-sm sm:text-base whitespace-nowrap ${totalNetMargin >= 0 ? 'text-emerald-300' : 'text-red-300'}`}>
                  {formatAOA(totalNetMargin)}
                </td>
                <td className="px-5 py-4 text-right text-emerald-300 font-extrabold text-sm sm:text-base whitespace-nowrap">{formatAOA(runningCumulative)}</td>
                <td className="px-5 py-4 text-slate-100 font-bold text-xs sm:text-sm">Projeção Final Recalculada (12 Meses)</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>
    </div>
  );
}
