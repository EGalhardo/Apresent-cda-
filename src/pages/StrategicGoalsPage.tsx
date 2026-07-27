import React from 'react';
import { Flag, CheckCircle2, Clock, AlertCircle, Target } from 'lucide-react';
import Card, { CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Tooltip from '../components/ui/Tooltip';
import PageHeader from '../components/ui/PageHeader';
import ProgressBar from '../components/ui/ProgressBar';
import { useERP } from '../context/ERPContext';

export interface StrategicGoal {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending' | 'planned';
  progress: number; // 0 to 100
  targetValue?: string;
  category: string;
}

export const initialStrategicGoals: StrategicGoal[] = [
  {
    id: 'goal-01',
    title: 'Piloto Operacional INAPEM & Homologação Técnica',
    description: 'Previsão de implementação da infraestrutura de correio digital no INAPEM, integração das caixas postais institucionais e validação do fluxo B2G.',
    status: 'in_progress',
    progress: 85,
    targetValue: 'Fase Piloto',
    category: 'Implantação',
  },
  {
    id: 'goal-02',
    title: 'Auditoria de Cibersegurança & Emissão do Parecer do INAPEM',
    description: 'Previsão de realização de testes de penetração, encriptação AES-256 e emissão do parecer oficial de conformidade pelo INAPEM (Phase Gate 1).',
    status: 'in_progress',
    progress: 70,
    targetValue: 'Gate 1 Signoff',
    category: 'Segurança',
  },
  {
    id: 'goal-03',
    title: 'Adesão de 8 Instituições Públicas Âncora (Ano 1)',
    description: 'Previsão de adesão formal de Ministérios, AGT, INSS e grandes entidades públicas ao protocolo unificado de correio digital.',
    status: 'in_progress',
    progress: 25,
    targetValue: '8 Instituições',
    category: 'Expansão B2G',
  },
  {
    id: 'goal-04',
    title: 'Atingimento da Meta de Gatilho Salarial (MRR ≥ 12M AOA no Mês 6)',
    description: 'Objectivo de alcançar 12.000.000 AOA de receita recorrente mensal até ao Mês 6 de operação para activar a revisão salarial da equipa executiva.',
    status: 'pending',
    progress: 18,
    targetValue: '12M AOA / Mês',
    category: 'Financeiro',
  },
  {
    id: 'goal-05',
    title: 'Atingimento do Ponto de Equilíbrio (Receita ≥ Custos Mensais)',
    description: 'Previsão para cobrir a totalidade dos custos operacionais recorrentes (3.850.000 AOA/mês) exclusivamente com receitas de subscrição e serviços.',
    status: 'in_progress',
    progress: 52,
    targetValue: 'Ponto de Equilíbrio',
    category: 'Financeiro',
  },
  {
    id: 'goal-06',
    title: 'Processamento de 50.000 Notificações Oficiais no Ano 1',
    description: 'Previsão de volume acumulado de avisos, notificações fiscais, ofícios e comunicações judiciais/administrativas entregues com comprovativo legal.',
    status: 'in_progress',
    progress: 15,
    targetValue: '50k Transacções',
    category: 'Operacional',
  },
  {
    id: 'goal-07',
    title: 'Ligação e Integração com Outros Sistemas do Estado',
    description: 'Previsão para criar conectores digitais seguros para ligação fácil com o Portal do Cidadão, Ministérios e entidades públicas.',
    status: 'planned',
    progress: 40,
    targetValue: 'Ligação Ativa',
    category: 'Tecnologia',
  },
  {
    id: 'goal-08',
    title: 'Início da Expansão Provincial & Protocolos Municipais',
    description: 'Plano de extensão dos serviços de correio digital aos Governos Provinciais e Administrações Municipais nas 21 Províncias de Angola.',
    status: 'planned',
    progress: 5,
    targetValue: '21 Províncias',
    category: 'Escala Territorial',
  },
];

export default function StrategicGoalsPage() {
  const { settings } = useERP();

  const getStatusBadge = (status: StrategicGoal['status']) => {
    switch (status) {
      case 'completed':
        return <Badge variant="emerald" icon={CheckCircle2}>Concluído</Badge>;
      case 'in_progress':
        return <Badge variant="blue" icon={Clock}>Em Progresso</Badge>;
      case 'pending':
        return <Badge variant="amber" icon={AlertCircle}>Pendente</Badge>;
      case 'planned':
        return <Badge variant="purple" icon={Flag}>Planeado</Badge>;
    }
  };

  const getProgressColor = (status: StrategicGoal['status']): 'emerald' | 'blue' | 'amber' | 'purple' => {
    switch (status) {
      case 'completed': return 'emerald';
      case 'in_progress': return 'blue';
      case 'pending': return 'amber';
      case 'planned': return 'purple';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <PageHeader
        badge="Planeamento Executivo"
        secondaryBadge={`${initialStrategicGoals.length} Metas Registadas`}
        title="Metas Estratégicas"
        description="As metas estratégicas representam os principais objetivos de crescimento do Correio Digital Angola ao longo da implementação. Incluem indicadores quantitativos de adoção institucional, número de utilizadores, geração de receitas, expansão territorial e consolidação do modelo de negócio, permitindo acompanhar a evolução do projeto através de métricas claras e mensuráveis."
        icon={Target}
      />

      {/* Vertical List */}
      <Card padding={false} className="overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider grid grid-cols-12 gap-4 items-center">
          <div className="col-span-12 md:col-span-6">Título & Descrição da Meta</div>
          <div className="col-span-6 md:col-span-2 text-left md:text-center">Estado</div>
          <div className="col-span-6 md:col-span-4">Progresso & Alvo</div>
        </div>

        <div className="divide-y divide-slate-100">
          {initialStrategicGoals.map((goal, index) => (
            <Tooltip
              key={goal.id}
              title={`Meta ${index + 1}: ${goal.title}`}
              purpose={`Métrica de acompanhamento: ${goal.category}`}
              meaning={`Progresso previsto de ${goal.progress}% com meta quantitativa de ${goal.targetValue}`}
              className="w-full"
            >
              <div className="p-5 sm:p-6 hover:bg-slate-50/80 transition-colors grid grid-cols-12 gap-4 items-center">
                {/* Title & Description with Sequential Number */}
                <div className="col-span-12 md:col-span-6 space-y-1.5">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center font-mono flex-shrink-0 shadow-2xs">
                      {index + 1}
                    </span>
                    <Badge variant="blue" size="sm">{goal.category}</Badge>
                    <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                      {goal.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-9 md:pl-0 font-medium text-justify">
                    {goal.description}
                  </p>
                </div>

                {/* Status Badge */}
                <div className="col-span-6 md:col-span-2 flex items-center md:justify-center">
                  {getStatusBadge(goal.status)}
                </div>

                {/* Progress Indicator */}
                <div className="col-span-6 md:col-span-4 space-y-1">
                  <div className="flex justify-between items-center text-xs mb-1">
                    {goal.targetValue && (
                      <span className="text-[11px] text-slate-500 font-semibold">Alvo: {goal.targetValue}</span>
                    )}
                  </div>
                  <ProgressBar
                    value={goal.progress}
                    color={getProgressColor(goal.status)}
                    showPercent={true}
                  />
                </div>
              </div>
            </Tooltip>
          ))}
        </div>
      </Card>
    </div>
  );
}
