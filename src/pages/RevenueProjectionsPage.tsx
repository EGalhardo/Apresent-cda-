import React, { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, ResponsiveContainer, Legend, ReferenceLine
} from 'recharts';
import { TrendingUp, AlertTriangle, CheckCircle2, Printer, Info, Calculator, DollarSign, Layers } from 'lucide-react';
import Card, { CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Tooltip from '../components/ui/Tooltip';
import PageHeader from '../components/ui/PageHeader';
import SectionHeader from '../components/ui/SectionHeader';
import StatCard from '../components/ui/StatCard';
import { useERP } from '../context/ERPContext';
import { formatAOA } from '../utils/format';

export default function RevenueProjectionsPage() {
  const { settings, addToast } = useERP();
  const opexMonthly = settings.opexMonthly || 3850000;

  // State to toggle Mês 1 Adjustment (Análise Crítica Mês 1)
  const [adjustedMonth1, setAdjustedMonth1] = useState(true);

  // Original projection vs Adjusted Projection
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

  const projectionsData = rawProjections.map((p) => {
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

  function handlePrint() {
    addToast('A preparar Projeção Financeira para impressão PDF...', 'info');
    setTimeout(() => window.print(), 300);
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <PageHeader
        badge="Demonstrativo Financeiro"
        secondaryBadge="Ano 1 (12 Meses)"
        title="Projeções de Receita"
        description="As projeções financeiras apresentam a evolução prevista das receitas, custos operacionais, margem bruta, EBITDA e rentabilidade durante o primeiro ano de atividade. As estimativas baseiam-se na adoção progressiva da plataforma por instituições públicas e privadas, permitindo demonstrar a sustentabilidade económica do modelo de negócio e o potencial de crescimento do projeto."
        icon={TrendingUp}
        action={
          <Tooltip title="Imprimir / Exportar PDF" purpose="Gerar relatório impresso da demonstração financeira" meaning="Abre o assistente de impressão do navegador">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-5 py-3 rounded-2xl text-xs transition-all shadow-md active:scale-95"
            >
              <Printer size={16} />
              <span>Exportar PDF</span>
            </button>
          </Tooltip>
        }
      />

      {/* Critical Analysis Box */}
      <Card className="border border-amber-300 space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-50 text-amber-800 rounded-xl border border-amber-200">
              <AlertTriangle size={22} />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Análise Crítica: Ajuste de Receita do Mês 1 (Piloto INAPEM)</h2>
              <p className="text-xs text-slate-700 font-semibold">Reavaliação de coerência entre o plano operacional, fase de teste e modelo financeiro</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-2xs">
            <button
              onClick={() => {
                setAdjustedMonth1(true);
                addToast('Projeção actualizada: Valor corrigido Mês 1 (500.000 AOA)', 'success');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                adjustedMonth1 ? 'bg-blue-600 text-white border-blue-700 shadow-2xs' : 'border-transparent text-slate-700 hover:bg-slate-100'
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
                !adjustedMonth1 ? 'bg-amber-600 text-white border-amber-700 shadow-2xs' : 'border-transparent text-slate-700 hover:bg-slate-100'
              }`}
            >
              Sem Ajuste (2M)
            </button>
          </div>
        </div>

        <div className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed space-y-2 text-justify">
          <p>
            <strong className="text-slate-900 font-bold">Justificação Técnica e Comercial:</strong> No Mês 1 de operação, o Correio Digital Angola executa a instalação do Centro Operacional, testes de penetração e a homologação do piloto no INAPEM. Cobrar a totalidade da mensalidade de 2.000.000 AOA antes do fecho do Marco de Controlo 1 criava uma inconsistência comercial.
          </p>
          <p>
            A receita do Mês 1 foi assim ajustada para <strong className="text-blue-700 font-extrabold">500.000 AOA</strong> (correspondente à taxa de preparação inicial e testes do protocolo), permitindo que a cobrança integral SaaS arranque com o parecer favorável no Mês 2.
          </p>
        </div>
      </Card>

      {/* Key Financial KPIs Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Receita Total Ano 1"
          value={formatAOA(totalRevenue, true)}
          subtitle="Somatório acumulado nos 12 meses"
          color="blue"
        />
        <StatCard
          title="Custos Operacionais Ano 1"
          value={formatAOA(totalOpex, true)}
          subtitle="3.850.000 AOA / mês fixos"
          color="amber"
        />
        <StatCard
          title="Margem Líquida Acumulada"
          value={formatAOA(totalNetMargin, true)}
          subtitle="Resultado operacional antes de impostos"
          color="emerald"
        />
        <StatCard
          title="Ponto de Equilíbrio (Break-Even)"
          value="Mês 3"
          subtitle="Receita supera custos recorrentes"
          color="purple"
        />
      </div>

      {/* Main Chart */}
      <Card className="space-y-4">
        <SectionHeader
          title="Trajectória da Receita vs Custos de Funcionamento (Ano 1)"
          subtitle="Crescimento mensal das receitas e margem acumulada."
        />
        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={projectionsData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={v => formatAOA(v as number, true)} tick={{ fontSize: 11, fill: '#475569' }} axisLine={false} tickLine={false} width={80} />
              <RechartsTooltip formatter={(v: unknown) => formatAOA(v as number)} contentStyle={{ borderRadius: 16, border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12, fontWeight: 600 }} />
              <ReferenceLine y={opexMonthly} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'OPEX (3.85M)', fill: '#f59e0b', fontSize: 11, fontWeight: 700 }} />
              <Area type="monotone" dataKey="receita" name="Receita Mensal Projectada" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.25} strokeWidth={2.5} />
              <Area type="monotone" dataKey="net" name="Margem Operacional Líquida" stroke="#10b981" fill="#10b981" fillOpacity={0.15} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Table */}
      <Card padding={false} className="overflow-hidden">
        <div className="p-6 bg-white border-b border-slate-200">
          <SectionHeader title="Demonstrativo Mensal Discriminado (Mês 1 ao Mês 12)" subtitle="Valores de receita, OPEX e margem líquida por mês de atividade" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-white text-slate-800 font-extrabold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-5 py-4">Período</th>
                <th className="px-5 py-4">Receita Mensal</th>
                <th className="px-5 py-4">OPEX Mensal</th>
                <th className="px-5 py-4">Margem Líquida</th>
                <th className="px-5 py-4">Nota de Execução</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {projectionsData.map((item, idx) => (
                <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-5 py-4 font-bold text-slate-900">{item.month}</td>
                  <td className="px-5 py-4 font-bold text-blue-700 font-mono">{formatAOA(item.receita)}</td>
                  <td className="px-5 py-4 font-bold text-amber-700 font-mono">{formatAOA(item.opex)}</td>
                  <td className={`px-5 py-4 font-bold font-mono ${item.net >= 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                    {formatAOA(item.net)}
                  </td>
                  <td className="px-5 py-4 text-slate-600 text-justify">{item.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
