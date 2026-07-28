import React from 'react';
import {
  ShieldCheck, FileText, ArrowRight, Building2, TrendingUp,
  AlertTriangle, Lock, Cpu, DollarSign, Users, RefreshCw,
  Zap, FileCheck, Layers, Landmark, Sparkles, CheckCircle2,
  Compass, HelpCircle
} from 'lucide-react';
import Card, { CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Tooltip from '../components/ui/Tooltip';
import PageHeader from '../components/ui/PageHeader';
import SectionHeader from '../components/ui/SectionHeader';
import StatCard from '../components/ui/StatCard';
import Timeline from '../components/ui/Timeline';
import { useERP } from '../context/ERPContext';

interface PresentationPageProps {
  topic: 'intro' | 'problem' | 'solution' | 'benefits' | 'conclusion';
  onNavigate?: (page: any) => void;
}

export default function PresentationPage({ topic, onNavigate }: PresentationPageProps) {
  const { settings } = useERP();

  switch (topic) {
    case 'intro':
      return (
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header Banner */}
          <PageHeader
            badge="Visão Estratégica de Estado"
            secondaryBadge="GovTech Angola"
            title="Introdução — Correio Digital Angola (CDA)"
            description={`O Correio Digital Angola é uma plataforma GovTech desenvolvida para modernizar a comunicação oficial entre o Estado, os cidadãos, as empresas e as demais instituições públicas e privadas. A solução transforma o Bilhete de Identidade numa morada digital oficial, permitindo que qualquer comunicação institucional seja enviada e recebida de forma rápida, segura, certificada e acessível.\n\nMais do que substituir o papel pela tecnologia, o projecto cria uma infraestrutura digital nacional preparada para apoiar a transformação digital da Administração Pública, promovendo maior eficiência, transparência e proximidade entre as instituições e os cidadãos. A plataforma foi concebida para integrar-se com os sistemas existentes, assegurando uma comunicação mais inteligente, fiável e preparada para responder aos desafios do futuro.`}
            icon={Compass}
          />

          {/* Key Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Tooltip
              title="Morada Digital no BI"
              purpose="Transformar o Bilhete de Identidade num endereço oficial de recepção de documentos"
              meaning="Conformidade integral com os padrões nacionais de identificação civil e certidão digital"
              className="w-full"
            >
              <Card className="h-full space-y-3">
                <div className="p-3 w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100">
                  <ShieldCheck size={24} />
                </div>
                <CardTitle>Morada Digital Oficial</CardTitle>
                <p className="text-xs text-slate-600 leading-relaxed font-medium text-justify">
                  Transforma o Bilhete de Identidade num identificador único para recepção instantânea e segura de notificações oficiais com validade jurídica.
                </p>
              </Card>
            </Tooltip>

            <Tooltip
              title="Transformação Digital"
              purpose="Apoiar a modernização da Administração Pública angolana"
              meaning="Eficiência, transparência e proximidade real entre instituições e cidadãos"
              className="w-full"
            >
              <Card className="h-full space-y-3">
                <div className="p-3 w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center border border-purple-100">
                  <Layers size={24} />
                </div>
                <CardTitle>Modernização Administrativa</CardTitle>
                <p className="text-xs text-slate-600 leading-relaxed font-medium text-justify">
                  Cria uma infraestrutura digital de Estado pronta para responder aos desafios do futuro e acelerar a transição sem papel.
                </p>
              </Card>
            </Tooltip>

            <Tooltip
              title="Integração de Sistemas"
              purpose="Interconectividade directa com plataformas ministeriais e bancárias existentes"
              meaning="Adoção gradual sem necessidade de reconstruir sistemas legados"
              className="w-full"
            >
              <Card className="h-full space-y-3">
                <div className="p-3 w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-100">
                  <Lock size={24} />
                </div>
                <CardTitle>Integração Inteligente & Fiável</CardTitle>
                <p className="text-xs text-slate-600 leading-relaxed font-medium text-justify">
                  Conexão simplificada via APIs seguras com sistemas no INAPEM, Ministérios, AGT e sector bancário.
                </p>
              </Card>
            </Tooltip>
          </div>

          {/* Pilot Banner */}
          <Card className="space-y-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Projecto em Desenvolvimento</span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">Piloto INAPEM Previsto</h3>
                <p className="text-slate-700 font-medium text-xs sm:text-sm max-w-2xl leading-relaxed text-justify">
                  O Instituto Nacional de Apoio às Pequenas e Médias Empresas (INAPEM) é a instituição âncora prevista para o projecto piloto, que permitirá validar a plataforma antes da expansão para os restantes Ministérios.
                </p>
              </div>

              {onNavigate && (
                <button
                  onClick={() => onNavigate('strategic_goals')}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-6 py-3.5 rounded-2xl transition-all flex-shrink-0 shadow-md active:scale-95"
                >
                  <span>Ver Metas Estratégicas</span>
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </Card>
        </div>
      );

    case 'problem':
      return (
        <div className="space-y-6 max-w-7xl mx-auto">
          <PageHeader
            badge="Diagnóstico Estrutural"
            secondaryBadge="Análise do Contexto"
            title="O Problema: Os Desafios do Correio Físico na Comunicação Oficial"
            description={`Grande parte da comunicação oficial em Angola continua dependente de documentos em papel, deslocações presenciais e moradas físicas, tornando muitos processos administrativos lentos, dispendiosos e sujeitos a atrasos, extravios e dificuldades na localização dos destinatários. Esta realidade reduz a eficiência dos serviços públicos, aumenta os custos operacionais das instituições e dificulta o acesso dos cidadãos às informações que lhes são dirigidas.\n\nAo mesmo tempo, muitas organizações utilizam sistemas isolados, sem integração e comunicação entre si, o que dificulta a troca de informações e limita a evolução da transformação digital do país. Torna-se, por isso, necessária uma solução nacional que centralize, simplifique e torne mais segura toda a comunicação oficial entre o Estado e os seus diferentes intervenientes.`}
            icon={AlertTriangle}
          />

          {/* Problem Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Tooltip
              title="Dependência do Papel"
              purpose="Evidenciar o impacto da utilização de suporte físico e deslocações presenciais"
              meaning="Aumento de custos com consumíveis, transporte e atrasos na entrega"
              className="w-full"
            >
              <Card className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-red-50 text-red-600 rounded-2xl border border-red-100">
                    <DollarSign size={20} />
                  </div>
                  <CardTitle>Custos e Morosidade Operacional</CardTitle>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium text-justify">
                  Processos administrativos dependentes de moradas físicas e suporte papel geram elevados custos com impressões e deslocações, atrasando a resposta ao cidadão.
                </p>
              </Card>
            </Tooltip>

            <Tooltip
              title="Sistemas Isolados"
              purpose="Identificar a falta de comunicação e ligação entre órgãos do Estado"
              meaning="Dificuldade na circulação de dados e bloqueios na transformação digital"
              className="w-full"
            >
              <Card className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-amber-50 text-amber-600 rounded-2xl border border-amber-100">
                    <AlertTriangle size={20} />
                  </div>
                  <CardTitle>Sistemas Desconectados (Falta de Comunicação entre Órgãos)</CardTitle>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium text-justify">
                  Muitas organizações funcionam com sistemas isolados que não comunicam entre si, gerando retrabalho e dispersão de dados institucionais.
                </p>
              </Card>
            </Tooltip>

            <Tooltip
              title="Dificuldade na Localização"
              purpose="Mostrar o risco permanente de perda de documentos e notificação infrutífera"
              meaning="Incerteza no recebimento de avisos críticos de órgãos públicos"
              className="w-full"
            >
              <Card className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-purple-50 text-purple-600 rounded-2xl border border-purple-100">
                    <HelpCircle size={20} />
                  </div>
                  <CardTitle>Extravios e Dificuldade na Localização</CardTitle>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium text-justify">
                  Dificuldades no envio de cartas registadas e localização de cidadãos resultam em notificações não entregues e prazos legais ultrapassados.
                </p>
              </Card>
            </Tooltip>

            <Tooltip
              title="Acesso Dificultado"
              purpose="Perda de transparência no acesso a notificações do Governo"
              meaning="Redução da eficiência e da relação de confiança com as instituições"
              className="w-full"
            >
              <Card className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100">
                    <RefreshCw size={20} />
                  </div>
                  <CardTitle>Necessidade de Solução Unificada</CardTitle>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium text-justify">
                  Urgência de implementar uma plataforma soberana e centralizada que una o Estado, os cidadãos e o tecido empresarial.
                </p>
              </Card>
            </Tooltip>
          </div>
        </div>
      );

    case 'solution':
      return (
        <div className="space-y-6 max-w-7xl mx-auto">
          <PageHeader
            badge="Arquitectura Tecnológica"
            secondaryBadge="Plataforma Soberana"
            title="A Solução: Plataforma de Correspondência Digital"
            description={`O Correio Digital Angola disponibiliza uma plataforma de correspondência digital que permite às instituições enviar notificações, documentos, avisos e comunicações oficiais diretamente para a morada digital dos cidadãos, utilizando o Bilhete de Identidade como identificador único.\n\nA plataforma integra funcionalidades como autenticação segura, assinatura electrónica, notificações inteligentes, inteligência artificial, gestão documental e ligação simples com os sistemas já existentes nas instituições. Esta abordagem permite reduzir significativamente o tempo de processamento, aumentar a segurança da informação e oferecer uma experiência digital moderna, tanto para os organismos públicos como para os seus utilizadores.`}
            icon={Zap}
          />

          {/* Workflow Diagram Card */}
          <Card className="space-y-4">
            <SectionHeader title="Pilares Funcionais da Plataforma" subtitle="Arquitectura do fluxo transacional de correspondência oficial." />
            <Timeline
              orientation="horizontal"
              steps={[
                {
                  step: '1',
                  title: 'Identificador Único (BI)',
                  description: 'Endereço digital associado ao Bilhete de Identidade de cada cidadão para recepção garantida.',
                  badge: 'Cidadão',
                  badgeVariant: 'blue',
                },
                {
                  step: '2',
                  title: 'Autenticação & Assinatura',
                  description: 'Validade jurídica, encriptação AES-256 e carimbo do tempo qualificado.',
                  badge: 'Segurança',
                  badgeVariant: 'purple',
                },
                {
                  step: '3',
                  title: 'Notificações & IA',
                  description: 'Avisos inteligentes por SMS/WhatsApp e categorização automatizada de mensagens.',
                  badge: 'Comunicação',
                  badgeVariant: 'amber',
                },
                {
                  step: '4',
                  title: 'Conexão entre Sistemas',
                  description: 'Ligação fluida com bases de dados e aplicações ministeriais existentes.',
                  badge: 'Integração',
                  badgeVariant: 'emerald',
                },
              ]}
            />
          </Card>
        </div>
      );

    case 'benefits':
      return (
        <div className="space-y-6 max-w-7xl mx-auto">
          <PageHeader
            badge="Retorno e Impacto"
            secondaryBadge="Valor para a Sociedade"
            title="Benefícios para o Estado, Instituições e Cidadãos"
            description={`A implementação do Correio Digital Angola proporciona benefícios concretos para o Estado, para as instituições e para os cidadãos. A plataforma reduz custos com impressão, transporte, armazenamento e distribuição de documentos, ao mesmo tempo que acelera os processos administrativos e melhora a qualidade dos serviços prestados.\n\nAlém disso, garante maior segurança, rastreabilidade e autenticidade das comunicações oficiais, reduzindo riscos de perda de documentos e aumentando a confiança dos utilizadores. A integração entre diferentes organismos públicos favorece a partilha de informação, melhora a coordenação institucional e contribui para uma Administração Pública mais moderna, eficiente e orientada para o cidadão. Para a sociedade, representa um passo importante rumo à inclusão digital e à consolidação do governo electrónico em Angola.`}
            icon={CheckCircle2}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="REDUÇÃO DE CUSTOS"
              value="Economia em Papel"
              subtitle="Eliminação substancial de despesas com logística de distribuição e conservação de arquivo físico"
              color="blue"
            />
            <StatCard
              title="SEGURANÇA & RASTREIO"
              value="Validade Jurídica"
              subtitle="Garantia de integridade com prova de recepção auditável e carimbo do tempo"
              color="emerald"
            />
            <StatCard
              title="GOVERNO ELETRÓNICO"
              value="Cidadania Digital"
              subtitle="Maior coordenação entre Ministérios e consolidação dos serviços públicos digitais"
              color="purple"
            />
          </div>
        </div>
      );

    case 'conclusion':
      return (
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header Banner */}
          <PageHeader
            badge="Conclusão & Visão de Futuro"
            secondaryBadge="GovTech Angola"
            title="Conclusão — Correio Digital Angola"
            description={`O Correio Digital Angola representa uma nova forma de comunicar entre o Estado e os cidadãos, substituindo processos tradicionais por uma infraestrutura digital segura, eficiente e preparada para crescer à medida que o país evolui tecnologicamente. O projecto combina inovação, sustentabilidade e impacto social, criando condições para uma Administração Pública mais ágil, transparente e conectada.\n\nCom potencial para servir milhões de cidadãos e milhares de instituições, o Correio Digital Angola posiciona-se como uma solução estratégica para apoiar a transformação digital de Angola, fortalecer a governação electrónica e aproximar cada vez mais o Estado dos cidadãos através da tecnologia.`}
            icon={Sparkles}
          />

          {/* Action / Next Steps Banner */}
          <Card className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-xl font-extrabold text-slate-900">Consulte o Plano Financeiro Completo</h3>
                <p className="text-sm text-slate-600 font-medium">Explore os objetivos, hipóteses de crescimento, projeções e ROI do projeto.</p>
              </div>
              {onNavigate && (
                <button
                  onClick={() => onNavigate('objectives')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-6 py-3.5 rounded-2xl text-xs sm:text-sm transition-all flex items-center gap-2.5 shadow-md active:scale-95 whitespace-nowrap"
                >
                  <span>Explorar Plano Financeiro</span>
                  <ArrowRight size={18} />
                </button>
              )}
            </div>
          </Card>
        </div>
      );

    default:
      return null;
  }
}
