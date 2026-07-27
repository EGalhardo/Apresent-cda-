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
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 p-8 rounded-3xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-3">
              <div className="flex items-center gap-3">
                <Badge variant="blue">Visão Estratégica de Estado</Badge>
                <span className="text-xs text-blue-300 font-mono uppercase tracking-widest">GovTech Angola</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Introdução — Correio Digital Angola (CDA)
              </h1>
              <p className="text-slate-300 max-w-3xl text-sm sm:text-base leading-relaxed">
                O Correio Digital Angola é uma plataforma GovTech desenvolvida para modernizar a comunicação oficial entre o Estado, os cidadãos, as empresas e as demais instituições públicas e privadas.
              </p>
            </div>
          </div>

          {/* Detailed Narrative Section */}
          <Card className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="text-blue-600" size={20} />
              <CardTitle>A Infraestrutura Digital Nacional</CardTitle>
            </div>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-justify">
              O Correio Digital Angola é uma plataforma GovTech desenvolvida para modernizar a comunicação oficial entre o Estado, os cidadãos, as empresas e as demais instituições públicas e privadas. A solução transforma o Bilhete de Identidade numa morada digital oficial, permitindo que qualquer comunicação institucional seja enviada e recebida de forma rápida, segura, certificada e acessível.
            </p>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-justify">
              Mais do que substituir o papel pela tecnologia, o projecto cria uma infraestrutura digital nacional preparada para apoiar a transformação digital da Administração Pública, promovendo maior eficiência, transparência e proximidade entre as instituições e os cidadãos. A plataforma foi concebida para integrar-se com os sistemas existentes, assegurando uma comunicação mais inteligente, fiável e preparada para responder aos desafios do futuro.
            </p>
          </Card>

          {/* Key Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Tooltip
              title="Morada Digital no BI"
              purpose="Transformar o Bilhete de Identidade num endereço oficial de recepção de documentos"
              meaning="Conformidade integral com os padrões nacionais de identificação civil e certidão digital"
              className="w-full"
            >
              <Card className="h-full transition-all">
                <div className="p-3 w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                  <ShieldCheck size={24} />
                </div>
                <CardTitle>Morada Digital Oficial</CardTitle>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
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
              <Card className="h-full transition-all">
                <div className="p-3 w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-4">
                  <Layers size={24} />
                </div>
                <CardTitle>Modernização Administrativa</CardTitle>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
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
              <Card className="h-full transition-all">
                <div className="p-3 w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                  <Lock size={24} />
                </div>
                <CardTitle>Integração Inteligente & Fiável</CardTitle>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  Conexão simplificada via APIs seguras com sistemas no INAPEM, Ministérios, AGT e sector bancário.
                </p>
              </Card>
            </Tooltip>
          </div>

          {/* Pilot Banner */}
          <Card className="p-6 bg-white border border-slate-300 text-slate-900 rounded-3xl shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Projecto em Desenvolvimento</span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">Piloto INAPEM Previsto</h3>
                <p className="text-black font-semibold text-xs sm:text-sm max-w-2xl leading-relaxed">
                  O Instituto Nacional de Apoio às Pequenas e Médias Empresas (INAPEM) é a instituição âncora prevista para o projecto piloto, que permitirá validar a plataforma antes do rollout para os restantes Ministérios.
                </p>
              </div>

              {onNavigate && (
                <button
                  onClick={() => onNavigate('strategic_goals')}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-3 rounded-2xl transition-all flex-shrink-0 shadow-sm"
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
          <div className="bg-white p-6 sm:p-8 rounded-3xl space-y-3">
            <Badge variant="amber">Diagnóstico Estrutural</Badge>
            <h1 className="text-2xl font-bold text-gray-900">
              O Problema: Os Desafios do Correio Físico na Comunicação Oficial
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed max-w-3xl">
              Grande parte da comunicação oficial em Angola continua dependente de documentos em papel, deslocações presenciais e moradas físicas, tornando muitos processos administrativos lentos, dispendiosos e sujeitos a atrasos e extravios.
            </p>
          </div>

          {/* Narrative Card */}
          <Card className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-amber-600">
              <AlertTriangle size={20} />
              <CardTitle>Ineficiências e Fragmentação Sistémica</CardTitle>
            </div>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-justify">
              Grande parte da comunicação oficial em Angola continua dependente de documentos em papel, deslocações presenciais e moradas físicas, tornando muitos processos administrativos lentos, dispendiosos e sujeitos a atrasos, extravios e dificuldades na localização dos destinatários. Esta realidade reduz a eficiência dos serviços públicos, aumenta os custos operacionais das instituições e dificulta o acesso dos cidadãos às informações que lhes são dirigidas.
            </p>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-justify">
              Ao mesmo tempo, muitas organizações utilizam sistemas isolados, sem integração e comunicação entre si, o que dificulta a troca de informações e limita a evolução da transformação digital do país. Torna-se, por isso, necessária uma solução nacional que centralize, simplifique e torne mais segura toda a comunicação oficial entre o Estado e os seus diferentes intervenientes.
            </p>
          </Card>

          {/* Problem Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Tooltip
              title="Dependência do Papel"
              purpose="Evidenciar o impacto da utilização de suporte físico e deslocações presenciais"
              meaning="Aumento de custos com consumíveis, transporte e atrasos na entrega"
              className="w-full"
            >
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 bg-red-50 text-red-600 rounded-xl">
                    <DollarSign size={20} />
                  </div>
                  <CardTitle>Custos e Morosidade Operacional</CardTitle>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
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
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                    <AlertTriangle size={20} />
                  </div>
                  <CardTitle>Sistemas Desconectados (Falta de Comunicação entre Órgãos)</CardTitle>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
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
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                    <HelpCircle size={20} />
                  </div>
                  <CardTitle>Extravios e Dificuldade na Localização</CardTitle>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
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
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                    <RefreshCw size={20} />
                  </div>
                  <CardTitle>Necessidade de Solução Unificada</CardTitle>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
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
          <div className="bg-white p-6 sm:p-8 rounded-3xl space-y-3">
            <Badge variant="blue">Arquitectura Tecnológica</Badge>
            <h1 className="text-2xl font-bold text-gray-900">
              A Solução: Plataforma Única de Correspondência Digital
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed max-w-3xl">
              O Correio Digital Angola disponibiliza uma plataforma única que permite às instituições enviar notificações, documentos, avisos e comunicações oficiais diretamente para a morada digital dos cidadãos.
            </p>
          </div>

          {/* Narrative Card */}
          <Card className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-blue-600">
              <Zap size={20} />
              <CardTitle>Funcionalidades e Abordagem Integrada</CardTitle>
            </div>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-justify">
              O Correio Digital Angola disponibiliza uma plataforma única de correspondência digital que permite às instituições enviar notificações, documentos, avisos e comunicações oficiais diretamente para a morada digital dos cidadãos, utilizando o Bilhete de Identidade como identificador único.
            </p>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-justify">
              A plataforma integra funcionalidades como autenticação segura, assinatura electrónica, notificações inteligentes, inteligência artificial, gestão documental e ligação simples com os sistemas já existentes nas instituições. Esta abordagem permite reduzir significativamente o tempo de processamento, aumentar a segurança da informação e oferecer uma experiência digital moderna, tanto para os organismos públicos como para os seus utilizadores.
            </p>
          </Card>

          {/* Workflow Diagram Card */}
          <Card className="p-6">
            <CardTitle className="mb-4">Pilares Funcionais da Plataforma</CardTitle>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              <div className="p-4 bg-white border border-slate-300 rounded-2xl text-center space-y-2 shadow-xs">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mx-auto text-xs">1</div>
                <p className="text-xs font-bold text-slate-800">Identificador Único (BI)</p>
                <p className="text-[11px] text-slate-600 font-medium">Endereço digital associado ao Bilhete de Identidade de cada cidadão</p>
              </div>

              <div className="p-4 bg-white border border-slate-300 rounded-2xl text-center space-y-2 shadow-xs">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mx-auto text-xs">2</div>
                <p className="text-xs font-bold text-slate-800">Autenticação & Assinatura</p>
                <p className="text-[11px] text-slate-600 font-medium">Validade jurídica, encriptação e carimbo do tempo qualificado</p>
              </div>

              <div className="p-4 bg-white border border-slate-300 rounded-2xl text-center space-y-2 shadow-xs">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mx-auto text-xs">3</div>
                <p className="text-xs font-bold text-slate-800">Notificações & IA</p>
                <p className="text-[11px] text-slate-600 font-medium">Avisos inteligentes por SMS/WhatsApp e categorização automatizada</p>
              </div>

              <div className="p-4 bg-white border border-slate-300 rounded-2xl text-center space-y-2 shadow-xs">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto text-xs">4</div>
                <p className="text-xs font-bold text-slate-800">Conexão entre Sistemas</p>
                <p className="text-[11px] text-slate-600 font-medium">Ligação fluida com bases de dados e aplicações ministeriais</p>
              </div>
            </div>
          </Card>
        </div>
      );

    case 'benefits':
      return (
        <div className="space-y-6 max-w-7xl mx-auto">
          <div className="bg-white p-6 sm:p-8 rounded-3xl space-y-3">
            <Badge variant="emerald">Retorno e Impacto</Badge>
            <h1 className="text-2xl font-bold text-gray-900">
              Benefícios para o Estado, Instituições e Cidadãos
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed max-w-3xl">
              A implementação do Correio Digital Angola proporciona benefícios concretos para o Estado, para as instituições e para os cidadãos, reduzindo custos e acelerando a modernização pública.
            </p>
          </div>

          {/* Narrative Card */}
          <Card className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-emerald-600">
              <CheckCircle2 size={20} />
              <CardTitle>Impacto Transversal e Inclusão Digital</CardTitle>
            </div>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-justify">
              A implementação do Correio Digital Angola proporciona benefícios concretos para o Estado, para as instituições e para os cidadãos. A plataforma reduz custos com impressão, transporte, armazenamento e distribuição de documentos, ao mesmo tempo que acelera os processos administrativos e melhora a qualidade dos serviços prestados.
            </p>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-justify">
              Além disso, garante maior segurança, rastreabilidade e autenticidade das comunicações oficiais, reduzindo riscos de perda de documentos e aumentando a confiança dos utilizadores. A integração entre diferentes organismos públicos favorece a partilha de informação, melhora a coordenação institucional e contribui para uma Administração Pública mais moderna, eficiente e orientada para o cidadão. Para a sociedade, representa um passo importante rumo à inclusão digital e à consolidação do governo electrónico em Angola.
            </p>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-white">
              <div className="text-blue-600 font-extrabold text-2xl mb-2">Redução de Custos</div>
              <p className="text-sm font-bold text-slate-900 mb-1">Economia em Impressão & Transporte</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Eliminação substancial de despesas com logística de distribuição, papel e conservação de arquivo físico.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-emerald-50 to-white">
              <div className="text-emerald-600 font-extrabold text-2xl mb-2">Segurança & Rastreio</div>
              <p className="text-sm font-bold text-slate-900 mb-1">Rastreabilidade & Autenticidade</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Garantia de integridade com prova de recepção auditável, reduzindo o risco de perda ou adulteração de cartas.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-50 to-white">
              <div className="text-purple-600 font-extrabold text-2xl mb-2">Governo Eletrónico</div>
              <p className="text-sm font-bold text-slate-900 mb-1">Inclusão Digital & Eficiência</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Maior coordenação entre Ministérios e consolidação da cidadania digital para todos os cidadãos angolanos.
              </p>
            </Card>
          </div>
        </div>
      );

    case 'conclusion':
      return (
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header Card with high contrast */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="blue" className="px-3 py-1 text-xs font-bold bg-blue-700 text-white">
                Conclusão & Visão de Futuro
              </Badge>
              <span className="text-xs text-blue-800 font-bold uppercase tracking-wider">GovTech Angola</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Conclusão — Correio Digital Angola
            </h1>
            <p className="text-slate-800 text-sm sm:text-base leading-relaxed max-w-3xl font-semibold">
              Uma nova infraestrutura para a governação electrónica e a modernização do Estado angolano.
            </p>
          </div>

          {/* Detailed High-Contrast Narrative Card */}
          <Card className="p-6 sm:p-8 space-y-6 bg-white">
            <div className="flex items-center gap-3 pb-4">
              <div className="p-2.5 bg-blue-100 text-blue-700 rounded-2xl">
                <Sparkles size={24} />
              </div>
              <CardTitle className="text-xl sm:text-2xl font-extrabold text-slate-900">
                A Infraestrutura Estratégica da Comunicação Oficial
              </CardTitle>
            </div>
            
            <p className="text-slate-900 text-base sm:text-lg leading-relaxed font-normal text-justify">
              O Correio Digital Angola representa uma nova forma de comunicar entre o Estado e os cidadãos, substituindo processos tradicionais por uma infraestrutura digital segura, eficiente e preparada para crescer à medida que o país evolui tecnologicamente. O projecto combina inovação, sustentabilidade e impacto social, criando condições para uma Administração Pública mais ágil, transparente e conectada.
            </p>
            
            <p className="text-slate-900 text-base sm:text-lg leading-relaxed font-normal text-justify">
              Com potencial para servir milhões de cidadãos e milhares de instituições, o Correio Digital Angola posiciona-se como uma solução estratégica para apoiar a transformação digital de Angola, fortalecer a governação electrónica e aproximar cada vez mais o Estado dos cidadãos através da tecnologia.
            </p>
          </Card>

          {/* Action / Next Steps Banner with High Contrast */}
          <Card className="p-6 sm:p-8 bg-white border border-slate-300 text-slate-900 rounded-3xl shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-xl font-bold text-slate-900">Consulte o Plano Financeiro Completo</h3>
                <p className="text-sm text-slate-900 font-bold">Explore os objetivos, hipóteses de crescimento, projeções e ROI do projeto.</p>
              </div>
              {onNavigate && (
                <button
                  onClick={() => onNavigate('objectives')}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold px-6 py-3.5 rounded-2xl text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap"
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
