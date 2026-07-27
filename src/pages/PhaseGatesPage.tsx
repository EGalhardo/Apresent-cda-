import React from 'react';
import { ShieldCheck, CheckCircle2, Clock, AlertCircle, ArrowRight, Target, Award, CheckSquare, FileText, Lock } from 'lucide-react';
import Card, { CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Tooltip from '../components/ui/Tooltip';
import PageHeader from '../components/ui/PageHeader';
import SectionHeader from '../components/ui/SectionHeader';
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
        return <Badge variant="emerald" icon={CheckCircle2}>Aprovado</Badge>;
      case 'in_progress':
        return <Badge variant="blue" icon={Clock}>Em Execução</Badge>;
      case 'pending':
        return <Badge variant="amber" icon={AlertCircle}>Pendente</Badge>;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <PageHeader
        badge="Governança do Projecto"
        secondaryBadge="Gates de Controlo Rígido"
        title="Etapas de Transição (Phase Gates)"
        description="O plano de execução encontra-se dividido em fases de validação técnica, operacional e comercial. Cada etapa possui critérios objetivos de desempenho que condicionam a passagem para a fase seguinte e a respetiva libertação das tranches de financiamento, assegurando uma implementação controlada, transparente e orientada para resultados."
        icon={ShieldCheck}
      />

      {/* Phase Gates Cards */}
      <div className="space-y-6">
        {phaseGatesDetailed.map((gate) => (
          <Tooltip
            key={gate.id}
            title={gate.name}
            purpose={`Mecanismo de validação: Passagem de ${gate.phaseFrom} para ${gate.phaseTo}`}
            meaning="A transição de fase requer o cumprimento a 100% dos critérios rígidos listados"
            className="w-full"
          >
            <Card className="space-y-6">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 font-extrabold flex items-center justify-center text-xs border border-blue-100">
                      0{gate.id}
                    </span>
                    <h2 className="text-lg font-extrabold text-slate-900">{gate.name}</h2>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    Transição: <span className="font-bold text-slate-700">{gate.phaseFrom}</span> → <span className="font-bold text-blue-700">{gate.phaseTo}</span>
                  </p>
                </div>
                {getStatusBadge(gate.status)}
              </div>

              {/* Grid Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700 font-medium">
                {/* Criteria */}
                <div className="space-y-2 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80">
                  <p className="font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <CheckSquare size={16} className="text-blue-600" />
                    <span>Critérios de Aprovação Rígidos</span>
                  </p>
                  <ul className="space-y-2 pt-1">
                    {gate.criteria.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-justify">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Milestones */}
                <div className="space-y-2 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80">
                  <p className="font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Target size={16} className="text-emerald-600" />
                    <span>Marcos Principais (Milestones)</span>
                  </p>
                  <ul className="space-y-2 pt-1">
                    {gate.milestones.map((m, i) => (
                      <li key={i} className="flex items-start gap-2 text-justify">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Objectives */}
                <div className="space-y-2 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80">
                  <p className="font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Award size={16} className="text-purple-600" />
                    <span>Objectivos da Etapa</span>
                  </p>
                  <ul className="space-y-2 pt-1">
                    {gate.objectives.map((o, i) => (
                      <li key={i} className="flex items-start gap-2 text-justify">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-1.5 flex-shrink-0" />
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables */}
                <div className="space-y-2 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80">
                  <p className="font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <FileText size={16} className="text-amber-600" />
                    <span>Entregáveis Documentais</span>
                  </p>
                  <ul className="space-y-2 pt-1">
                    {gate.deliverables.map((d, i) => (
                      <li key={i} className="flex items-start gap-2 text-justify">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 flex-shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Execution Details Note */}
              <div className="p-4 bg-blue-50/80 border border-blue-200/80 rounded-2xl text-xs font-semibold text-blue-900 text-justify">
                <strong>Estado de Execução Atual:</strong> {gate.executionDetails}
              </div>
            </Card>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
