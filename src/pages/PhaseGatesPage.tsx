import React from 'react';
import { ShieldCheck, CheckCircle2, Clock, AlertCircle, ArrowRight, Target, Award, CheckSquare, FileText, Lock } from 'lucide-react';
import Card, { CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Tooltip from '../components/ui/Tooltip';
import { useERP } from '../context/ERPContext';

export interface PhaseGateDetails {
  id: number;
  name: string;
  phaseFrom: string;
  phaseTo: string;
  status: 'completed' | 'in_progress' | 'pending';
  criteria: string[];
  milestones: string[];
  objectives: string[];
  deliverables: string[];
  executionDetails: string;
}

export const phaseGatesDetailed: PhaseGateDetails[] = [
  {
    id: 1,
    name: 'Etapa 1: Validação do Piloto INAPEM & Aprovação Técnica',
    phaseFrom: 'Desenvolvimento e Piloto INAPEM',
    phaseTo: 'Expansão em Ministérios e Governo',
    status: 'in_progress',
    criteria: [
      'Realização completa de testes de segurança e proteção de dados',
      'Emissão do parecer de aprovação técnica oficial pelo INAPEM',
      'Processamento bem-sucedido de pelo menos 1.000 mensagens piloto sem falhas',
      'Integração funcional das caixas postais digitais institucionais',
    ],
    milestones: [
      'M1: Instalação do Centro Operacional',
      'M2: Aprovação Técnica do INAPEM e Emissão do Parecer',
      'M3: Assinatura do Primeiro Contrato Monetizado com o Estado',
    ],
    objectives: [
      'Demonstrar a viabilidade técnica e legal do correio digital no sector público',
      'Garantir conformidade total com os padrões de segurança da informação',
      'Atingir a validação institucional antes de iniciar a expansão para outros Ministérios',
    ],
    deliverables: [
      'Relatório Final do Teste Piloto INAPEM',
      'Certificado de Auditoria de Cibersegurança',
      'Manual de Integração de Conectores Governamentais',
      'Plataforma Operacional com Suporte 24/7',
    ],
    executionDetails: 'Projecto em desenvolvimento. Validação técnica e testes de segurança em fase de preparação para o piloto INAPEM. Progresso estimado: 85%.',
  },
  {
    id: 2,
    name: 'Etapa 2: Ponto de Equilíbrio Financeiro & Expansão Governamental',
    phaseFrom: 'Expansão em Ministérios',
    phaseTo: 'Consolidação e Cobertura Nacional',
    status: 'pending',
    criteria: [
      'Atingimento do Ponto de Equilíbrio: Receita Mensal ≥ Custos de Funcionamento (3.850.000 AOA)',
      'Adesão formal de pelo menos 5 órgãos do Estado (ex: Min. Justiça, AGT, INSS)',
      'Atingimento da meta de gatilho salarial (Receita Mensal ≥ 12.000.000 AOA)',
      'Conclusão da ligação com outros sistemas do Estado',
    ],
    milestones: [
      'M4: Adoção do Ministério da Justiça e AGT',
      'M5: Atingimento do Ponto de Equilíbrio (Mês 3)',
      'M6: Ativação do Gatilho Salarial Executivo (Mês 6)',
    ],
    objectives: [
      'Garantir a auto-sustentabilidade financeira da infraestrutura digital',
      'Consolidar a posição do CDA como padrão de correio eletrónico oficial',
      'Expandir o volume transacional para mais de 20.000 notificações mensais',
    ],
    deliverables: [
      'Contratos de Subscrição com Ministérios Âncora',
      'Relatórios Trimestrais de Execução Financeira e Auditoria',
      'Painel de Controlo para Acompanhamento em Tempo Real',
    ],
    executionDetails: 'Pendente de validação da Etapa 1. Contactos institucionais e propostas comerciais previstas para Min. Justiça e AGT.',
  },
  {
    id: 3,
    name: 'Etapa 3: Cobertura Nacional & Ligação Internacional',
    phaseFrom: 'Escala Nacional',
    phaseTo: 'Expansão Internacional e Países Parceiros',
    status: 'pending',
    criteria: [
      'Cobertura do serviço em todas as 21 Províncias de Angola',
      'Receita Anual Recorrente (ARR) superior a 178.000.000 AOA',
      'Interligação de redes postais digitais com países parceiros',
      'Certificação ISO/IEC 27001 para gestão da segurança da informação',
    ],
    milestones: [
      'M7: Expansão aos Governos Provinciais e Municípios',
      'M8: Integração de Bancos e Sector Privado',
      'M9: Primeiro Corredor Postal Digital Internacional',
    ],
    objectives: [
      'Tornar o Correio Digital Angola a referência regional em Tecnologia Governamental',
      'Exportar a tecnologia para outros países parceiros',
      'Atingir um volume superior a 500.000 mensagens anuais',
    ],
    deliverables: [
      'Plataforma Internacional Multi-moeda',
      'Certificado ISO 27001 de Segurança',
      'Acordos de Ligação Postal Internacional',
    ],
    executionDetails: 'Planeado para a Fase 3 do projecto após consolidação nacional.',
  },
];

export default function PhaseGatesPage() {
  const { settings } = useERP();

  const getStatusBadge = (status: PhaseGateDetails['status']) => {
    switch (status) {
      case 'completed':
        return <Badge variant="green"><CheckCircle2 size={12} className="mr-1" /> Aprovado</Badge>;
      case 'in_progress':
        return <Badge variant="blue"><Clock size={12} className="mr-1" /> Em Execução</Badge>;
      case 'pending':
        return <Badge variant="amber"><AlertCircle size={12} className="mr-1" /> Pendente</Badge>;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-300 space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="blue">Governança do Projecto</Badge>
          <span className="text-xs text-slate-600 font-mono font-semibold">Gates de Controlo Rígido</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Etapas de Transição (Phase Gates)</h1>
        <p className="text-xs sm:text-sm text-slate-700 max-w-4xl font-medium leading-relaxed text-justify">
          O plano de execução encontra-se dividido em fases de validação técnica, operacional e comercial. Cada etapa possui critérios objetivos de desempenho que condicionam a passagem para a fase seguinte e a respetiva libertação das tranches de financiamento, assegurando uma implementação controlada, transparente e orientada para resultados.
        </p>
      </div>

      {/* Phase Gates Exclusive Content - Requirement 9 */}
      <div className="space-y-6">
        {phaseGatesDetailed.map((gate) => (
          <Tooltip
            key={gate.id}
            title={gate.name}
            purpose={`Mecanismo de validação: Passagem de ${gate.phaseFrom} para ${gate.phaseTo}`}
            meaning={`A transição de fase requer o cumprimento a 100% dos critérios rígidos listados`}
            className="w-full"
          >
            <Card className="p-6 bg-white border border-slate-300 border-l-4 border-l-blue-600 space-y-6 shadow-sm">
              {/* Header */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center font-mono">
                      G{gate.id}
                    </span>
                    <h2 className="text-lg font-bold text-slate-900">{gate.name}</h2>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    Transição: <strong className="text-slate-800">{gate.phaseFrom}</strong> → <strong className="text-blue-600 font-bold">{gate.phaseTo}</strong>
                  </p>
                </div>
                <div>{getStatusBadge(gate.status)}</div>
              </div>

              {/* 4 Quadrants: Criteria, Milestones, Objectives, Deliverables */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Critérios de Passagem */}
                <div className="bg-white p-4 rounded-2xl border border-slate-300 space-y-2 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    <ShieldCheck size={16} className="text-blue-600" />
                    <span>Critérios de Passagem (Rígidos)</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                    {gate.criteria.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. Marcos (Milestones) */}
                <div className="bg-white p-4 rounded-2xl border border-slate-300 space-y-2 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    <Target size={16} className="text-purple-600" />
                    <span>Marcos Estratégicos (Milestones)</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                    {gate.milestones.map((m, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckSquare size={14} className="text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="font-semibold text-slate-900">{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Objectivos */}
                <div className="bg-white p-4 rounded-2xl border border-slate-300 space-y-2 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    <Award size={16} className="text-emerald-600" />
                    <span>Objectivos Específicos</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                    {gate.objectives.map((o, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0" />
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 4. Entregáveis */}
                <div className="bg-white p-4 rounded-2xl border border-slate-300 space-y-2 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    <FileText size={16} className="text-amber-600" />
                    <span>Entregáveis Mandatórios</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                    {gate.deliverables.map((d, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 flex-shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Estado de Execução */}
              <div className="p-3.5 bg-white rounded-xl border border-slate-300 text-xs text-slate-900 flex items-center gap-3 shadow-2xs">
                <Clock size={16} className="text-blue-600 flex-shrink-0" />
                <div>
                  <strong className="font-extrabold text-slate-900">Estado de Execução: </strong>
                  <span className="font-medium text-slate-800">{gate.executionDetails}</span>
                </div>
              </div>
            </Card>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
