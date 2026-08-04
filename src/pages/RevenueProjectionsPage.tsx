import React from 'react';
import { TrendingUp, Printer } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';
import PageHeader from '../components/ui/PageHeader';
import StatCard from '../components/ui/StatCard';
import { useERP } from '../context/ERPContext';
import { formatAOA } from '../utils/format';

export default function RevenueProjectionsPage() {
  const { settings, addToast } = useERP();
  const opexMonthly = settings.opexMonthly || 3850000;

  const rawProjections = [
    { month: 'Mês 1 (Jan)', projected: 500000, note: 'Piloto INAPEM (Taxa de Ajuste Piloto)' },
    { month: 'Mês 2 (Fev)', projected: 3000000, note: 'Conclusão Gate 1 & Assinatura SaaS' },
    { month: 'Mês 3 (Mar)', projected: 5000000, note: 'Break-even Operacional (MRR > OPEX)' },
    { month: 'Mês 4 (Abr)', projected: 7000000, note: 'Expansão Min. Justiça' },
    { month: 'Mês 5 (Mai)', projected: 9000000, note: 'Adesão AGT / Finanças' },
    { month: 'Mês 6 (Jun)', projected: 12000000, note: 'Meta Gatilho Salarial (12M AOA)' },
    { month: 'Mês 7 (Jul)', projected: 15000000, note: 'Entrada Banco BFA' },
    { month: 'Mês 8 (Ago)', projected: 18000000, note: 'Adesão INSS' },
    { month: 'Mês 9 (Set)', projected: 22000000, note: 'Escala B2G Provincial' },
    { month: 'Mês 10 (Out)', projected: 25000000, note: 'Empresas Públicas Âncora' },
    { month: 'Mês 11 (Nov)', projected: 28000000, note: 'Consolidação de Licenças' },
    { month: 'Mês 12 (Dez)', projected: 32000000, note: 'Encerramento Ano 1' },
  ];

  const projectionsData = rawProjections.map((p) => {
    const net = p.projected - opexMonthly;
    return {
      month: p.month,
      receita: p.projected,
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
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-5 py-3 rounded-2xl text-xs transition-all active:scale-95"
            >
              <Printer size={16} />
              <span>Exportar PDF</span>
            </button>
          </Tooltip>
        }
      />

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
    </div>
  );
}
