import React from 'react';
import { Target, TrendingUp, Zap, Shield, BarChart3, Clock, Printer, Award, Building2, Wallet, Users, Coins, Calendar, Bell } from 'lucide-react';
import Card, { CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Tooltip from '../components/ui/Tooltip';
import PageHeader from '../components/ui/PageHeader';
import SectionHeader from '../components/ui/SectionHeader';
import StatCard from '../components/ui/StatCard';
import ProgressBar from '../components/ui/ProgressBar';
import AnimatedChartWrapper from '../components/ui/AnimatedChartWrapper';
import { formatAOA } from '../utils/format';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { useERP } from '../context/ERPContext';

const commercialKPIs = [
  { label: 'Receita Média por Cliente (ARPA)', value: '22M – 36M AOA', unit: 'anuais', color: 'blue' as const },
  { label: 'Ciclo de Vendas B2B', value: '3 – 6', unit: 'meses', color: 'amber' as const },
  { label: 'N.º Clientes Âncora — Final Ano 1', value: '5 – 8', unit: 'instituições', color: 'purple' as const },
  { label: 'Transacções Oficialmente Notificadas', value: '> 50.000', unit: 'comunicações', color: 'emerald' as const },
  { label: 'MRR Projectado — Mês 12', value: '32.000.000 AOA', unit: '/mês', color: 'blue' as const },
  { label: 'Margem Cambial Prudencial', value: '+15% – 20%', unit: 'proteção infraestrutura', color: 'slate' as const },
];

export default function KPIsPage() {
  const { invoices, addToast } = useERP();

  // Simulated metrics for KPI calculation
  const activeInstitutionsCount = 2; // INAPEM + MinJustiça pilot

  const mainProgressKpis = [
    {
      id: 'adoption',
      title: 'Adoção Institucional',
      actualText: `Actual: ${activeInstitutionsCount} / Meta: 8`,
      pct: 25.0,
      icon: Building2,
      color: 'blue' as const,
      meaning: 'Progresso em direcção às 8 instituições âncora previstas no Ano 1'
    },
    {
      id: 'arr',
      title: 'Receita Anual Recorrente (ARR)',
      actualText: `Actual: 38.0M AOA / Meta: 178.0M AOA`,
      pct: 20.2,
      icon: Wallet,
      color: 'emerald' as const,
      meaning: 'Métrica de ritmo anualizado com base nas subscrições activas'
    },
    {
      id: 'trigger',
      title: 'Gatilho Salarial (MRR Mês 6)',
      actualText: `Actual: 3.0M AOA / Meta: 12.0M AOA`,
      pct: 25.0,
      icon: Users,
      color: 'purple' as const,
      meaning: 'Meta de 12M AOA no Mês 6 para activação da grelha salarial executiva'
    },
    {
      id: 'revenue',
      title: 'Receita Acumulada Cobrada',
      actualText: `Actual: 14.5M AOA / Meta: 178.0M AOA`,
      pct: 8.1,
      icon: Coins,
      color: 'amber' as const,
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
      {/* Page Header */}
      <PageHeader
        badge="Painel de Métricas"
        secondaryBadge="Indicadores Chave de Sucesso"
        title="Indicadores de Sucesso (KPIs)"
        description="Os Indicadores-Chave de Desempenho (KPIs) permitem acompanhar, em tempo real, a evolução do Correio Digital Angola relativamente às metas estratégicas definidas. Entre os principais indicadores destacam-se a adoção institucional, crescimento das receitas recorrentes, sustentabilidade financeira, número de notificações oficiais processadas, retenção de clientes e evolução da rentabilidade da plataforma."
        icon={BarChart3}
        action={
          <Tooltip title="Imprimir Relatório de KPIs" purpose="Gerar ficheiro em PDF com as métricas do sistema" meaning="Abre o menu de impressão">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-5 py-3 rounded-2xl text-xs transition-all active:scale-95"
            >
              <Printer size={16} />
              <span>Imprimir Relatório KPIs</span>
            </button>
          </Tooltip>
        }
      />

      {/* Top 4 Stat Counter Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="ADOÇÃO INSTITUCIONAL"
          value="2 / 8"
          subtitle="Pilotos activos no Governo"
          color="blue"
          icon={Target}
        />
        <StatCard
          title="RECEITA RECORRENTE (ARR)"
          value="38.0M AOA"
          subtitle="Ritmo anualizado projectado"
          color="emerald"
          icon={Wallet}
        />
        <StatCard
          title="GATILHO SALARIAL (M6)"
          value="3.0M / 12M AOA"
          subtitle="Metas de receita mensal"
          color="purple"
          icon={Users}
        />
        <StatCard
          title="RECEITA COBRADA"
          value="14.5M AOA"
          subtitle="Total acumulado liquidado"
          color="amber"
          icon={Coins}
        />
      </div>
    </div>
  );
}
