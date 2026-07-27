import React from 'react';
import { Flag, CheckCircle2, Clock, AlertCircle, TrendingUp, ShieldCheck, Target } from 'lucide-react';
import Card, { CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Tooltip from '../components/ui/Tooltip';
import { useERP } from '../context/ERPContext';
import { formatAOA } from '../utils/format';

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
        return <Badge variant="green"><CheckCircle2 size={12} className="mr-1" /> Concluído</Badge>;
      case 'in_progress':
        return <Badge variant="blue"><Clock size={12} className="mr-1" /> Em Progresso</Badge>;
      case 'pending':
        return <Badge variant="amber"><AlertCircle size={12} className="mr-1" /> Pendente</Badge>;
      case 'planned':
        return <Badge variant="purple"><Flag size={12} className="mr-1" /> Planeado</Badge>;
    }
  };

  const getStatusColor = (status: StrategicGoal['status']) => {
    switch (status) {
      case 'completed': return 'bg-emerald-500';
      case 'in_progress': return 'bg-blue-600';
      case 'pending': return 'bg-amber-500';
      case 'planned': return 'bg-purple-500';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-3xl space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="blue">Planeamento Executivo</Badge>
            <span className="text-xs text-gray-400 font-mono">Plano Financeiro & Operacional</span>
          </div>
          <span className="text-xs text-gray-500 font-semibold">{initialStrategicGoals.length} Metas Registadas</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Metas Estratégicas</h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-4xl font-medium leading-relaxed text-justify">
          As metas estratégicas representam os principais objetivos de crescimento do Correio Digital Angola ao longo da implementação. Incluem indicadores quantitativos de adoção institucional, número de utilizadores, geração de receitas, expansão territorial e consolidação do modelo de negócio, permitindo acompanhar a evolução do projeto através de métricas claras e mensuráveis.
        </p>
      </div>

      {/* Vertical List - Requirement 7 */}
      <Card padding={false} className="overflow-hidden">
        <div className="p-4 bg-slate-50 text-xs font-bold text-gray-500 uppercase tracking-wider grid grid-cols-12 gap-4 items-center">
          <div className="col-span-12 md:col-span-6">Título & Descrição da Meta</div>
          <div className="col-span-6 md:col-span-2 text-left md:text-center">Estado</div>
          <div className="col-span-6 md:col-span-4">Progresso & Alvo</div>
        </div>

        {initialStrategicGoals.map((goal, index) => (
          <Tooltip
            key={goal.id}
            title={`Meta ${index + 1}: ${goal.title}`}
            purpose={`Métrica de acompanhamento: ${goal.category}`}
            meaning={`Progresso previsto de ${goal.progress}% com meta quantitativa de ${goal.targetValue}`}
            className="w-full"
          >
            <div className="p-5 hover:bg-slate-50/80 transition-colors grid grid-cols-12 gap-4 items-center border-b border-slate-100 last:border-b-0">
              {/* Title & Description with Sequential Number */}
              <div className="col-span-12 md:col-span-6 space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="w-6 h-6 rounded-lg bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center font-mono flex-shrink-0 shadow-2xs">
                    {index + 1}
                  </span>
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md font-mono">{goal.category}</span>
                  <h3 className="text-sm font-bold text-gray-900 leading-snug">
                    <span className="text-blue-800 font-extrabold mr-1">{index + 1}.</span> {goal.title}
                  </h3>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed pl-8 md:pl-0.5 font-medium">{goal.description}</p>
              </div>

              {/* Status Badge */}
              <div className="col-span-6 md:col-span-2 flex items-center md:justify-center">
                {getStatusBadge(goal.status)}
              </div>

              {/* Progress Indicator */}
              <div className="col-span-6 md:col-span-4 space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-700">{goal.progress}%</span>
                  {goal.targetValue && (
                    <span className="text-[11px] text-gray-400 font-medium">Meta: {goal.targetValue}</span>
                  )}
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${getStatusColor(goal.status)}`}
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </Tooltip>
        ))}
      </Card>
    </div>
  );
}
