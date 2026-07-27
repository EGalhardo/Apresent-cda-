import React from 'react';
import {
  Target, Briefcase, Coins, Building2, ArrowUpRight, DollarSign,
  Activity, Layers, Sparkles, CheckCircle2, ShieldCheck, TrendingUp,
  Landmark, FileText, ArrowRight, Award, Lock, Zap, PieChart as PieIcon,
  BarChart3, Clock, CheckSquare, Shield, HelpCircle, AlertTriangle
} from 'lucide-react';
import {
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend
} from 'recharts';
import Card, { CardTitle, CardHeader, CardDescription, CardFooter } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Tooltip from '../components/ui/Tooltip';
import PageHeader from '../components/ui/PageHeader';
import SectionHeader from '../components/ui/SectionHeader';
import StatCard from '../components/ui/StatCard';
import Timeline from '../components/ui/Timeline';
import { formatAOA } from '../utils/format';

interface FinancialPlanPageProps {
  topic:
    | 'objectives'
    | 'business_model'
    | 'monetization'
    | 'commercial_strategy'
    | 'growth_hypotheses'
    | 'initial_investment'
    | 'commercial_kpis'
    | 'growth_strategy'
    | 'final_considerations';
  onNavigate?: (page: any) => void;
}

export default function FinancialPlanPage({ topic, onNavigate }: FinancialPlanPageProps) {
  switch (topic) {
    /* ---------------------------------------------------------------------- */
    /* 1. OBJETIVOS                                                           */
    /* ---------------------------------------------------------------------- */
    case 'objectives': {
      const breakEvenChartData = [
        { month: 'Mês 1', receita: 500000, opex: 3850000, label: 'Piloto INAPEM' },
        { month: 'Mês 2', receita: 3000000, opex: 3850000, label: 'Fase Gate 1' },
        { month: 'Mês 3', receita: 5000000, opex: 3850000, label: 'Break-Even' },
        { month: 'Mês 4', receita: 7000000, opex: 3850000, label: 'Lucro Positivo' },
        { month: 'Mês 5', receita: 9000000, opex: 3850000, label: 'Adesão AGT' },
        { month: 'Mês 6', receita: 12000000, opex: 3850000, label: 'Gatilho Salarial' },
      ];

      return (
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Executive Header Banner */}
          <PageHeader
            badge="Visão & Objectivos Estratégicos"
            secondaryBadge="Apresentação Executiva"
            title="Objectivos do Plano Financeiro"
            description="O Plano Financeiro do Correio Digital Angola (CDA) estabelece a estratégia económica necessária para garantir a sustentabilidade do projeto, assegurando o equilíbrio entre investimento, crescimento e rentabilidade. Define as metas financeiras, o ponto de equilíbrio operacional, a estrutura de custos, as projeções de receita e o modelo de financiamento, alinhando todos os incentivos com uma implementação faseada, segura e sustentável."
            icon={Target}
          />

          {/* Key Objective Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Tooltip title="Sustentabilidade Rápida" purpose="Atingir a autonomia financeira no Mês 3 de operação" meaning="Receita mensal supera os custos operacionais de 3.850.000 AOA">
              <Card className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-extrabold text-lg border border-blue-100">01</div>
                <CardTitle>Ponto de Equilíbrio no Mês 3</CardTitle>
                <p className="text-xs text-slate-600 leading-relaxed font-medium text-justify">
                  Atingimento da autonomia financeira (Receita Mensal ≥ 3.850.000 AOA) no 3.º mês através da adesão dos primeiros clientes institucionais.
                </p>
                <CardFooter>
                  <span className="font-bold text-blue-700">Meta: Mês 3</span>
                  <Badge variant="blue">Prioridade 1</Badge>
                </CardFooter>
              </Card>
            </Tooltip>

            <Tooltip title="Rentabilidade Elevada" purpose="Garantir margem operacional sólida para cobrir o capital inicial" meaning="Margem operacional acumulada projectada de 131.800.000 AOA no Ano 1">
              <Card className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-extrabold text-lg border border-emerald-100">02</div>
                <CardTitle>Margem Operacional Elevada</CardTitle>
                <p className="text-xs text-slate-600 leading-relaxed font-medium text-justify">
                  Geração de caixa líquida de 131,8M AOA no Ano 1 para reinvestimento em cibersegurança, expansão provincial e internacionalização.
                </p>
                <CardFooter>
                  <span className="font-bold text-emerald-700">Ano 1: 131.8M AOA</span>
                  <Badge variant="emerald">Estratégico</Badge>
                </CardFooter>
              </Card>
            </Tooltip>

            <Tooltip title="Incentivo Executivo" purpose="Vincular a remuneração dos directores ao desempenho financeiro" meaning="Exige Receita Mensal ≥ 12M AOA no Mês 6 para activação da grelha salarial plena">
              <Card className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-extrabold text-lg border border-purple-100">03</div>
                <CardTitle>Gatilho Salarial de 12M AOA</CardTitle>
                <p className="text-xs text-slate-600 leading-relaxed font-medium text-justify">
                  Compromisso da equipa de gestão com a meta de 12.000.000 AOA de Receita Mensal no Mês 6 como condição obrigatória para revisão dos vencimentos.
                </p>
                <CardFooter>
                  <span className="font-bold text-purple-700">Condição: Mês 6</span>
                  <Badge variant="purple">Alinhamento</Badge>
                </CardFooter>
              </Card>
            </Tooltip>
          </div>

          {/* Visual Presentation Chart */}
          <Card className="space-y-4">
            <SectionHeader
              title="Trajectória até ao Ponto de Equilíbrio & Gatilho Salarial (Mês 1 ao Mês 6)"
              subtitle="Visualização gráfica do crescimento das receitas em comparação com os custos de funcionamento mensais."
              badge="Gráfico de Apresentação"
              badgeVariant="blue"
            />

            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={breakEvenChartData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#475569', fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={v => formatAOA(v as number, true)} tick={{ fontSize: 11, fill: '#475569' }} axisLine={false} tickLine={false} width={80} />
                  <RechartsTooltip formatter={(v: unknown) => formatAOA(v as number)} contentStyle={{ borderRadius: 16, border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 12, fontWeight: 600 }} />
                  <Bar dataKey="receita" name="Receita Mensal Projectada" fill="#2563eb" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="opex" name="Custos de Funcionamento Mensais (3.85M AOA)" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Presentation Talking Points */}
            <div className="bg-white border border-slate-200/90 p-5 rounded-2xl space-y-3">
              <p className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Sparkles size={16} className="text-blue-600" />
                <span>Pontos Chave para a Apresentação</span>
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-700 font-medium">
                <li className="flex items-start gap-2 bg-white border border-slate-200 p-3.5 rounded-xl shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                  <span className="text-justify"><strong>Mês 1-2:</strong> Entrada do Piloto INAPEM e validação da segurança (Etapa 1).</span>
                </li>
                <li className="flex items-start gap-2 bg-white border border-slate-200 p-3.5 rounded-xl shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0" />
                  <span className="text-justify"><strong>Mês 3:</strong> Ponto de equilíbrio atingido com 5M AOA de receita (supera 3.85M de custos).</span>
                </li>
                <li className="flex items-start gap-2 bg-white border border-slate-200 p-3.5 rounded-xl shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-purple-600 mt-1.5 flex-shrink-0" />
                  <span className="text-justify"><strong>Mês 6:</strong> Meta de 12M AOA / mês activa o gatilho salarial da equipa executiva.</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      );
    }

    /* ---------------------------------------------------------------------- */
    /* 2. MODELO DE NEGÓCIO                                                   */
    /* ---------------------------------------------------------------------- */
    case 'business_model': {
      const revenueMixData = [
        { name: 'Taxa de Implementação (10M/inst)', value: 45, color: '#2563eb' },
        { name: 'Subscrições SaaS (750k - 2M/mês)', value: 40, color: '#10b981' },
        { name: 'Serviços de API & Notificações', value: 15, color: '#8b5cf6' },
      ];

      return (
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header */}
          <PageHeader
            badge="Modelo B2G & B2B SaaS"
            secondaryBadge="Apresentação Executiva"
            title="Modelo de Negócio e Fontes de Receita"
            description="O Correio Digital Angola adopta um modelo Software as a Service (SaaS) orientado aos mercados Business-to-Government (B2G) e Business-to-Business (B2B). As principais fontes de receita incluem taxas de implementação institucional, subscrições mensais por utilizador ou entidade, serviços de integração tecnológica, notificações oficiais, comunicações certificadas e funcionalidades premium destinadas aos sectores público e privado."
            icon={Briefcase}
          />

          {/* Revenue Stream Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="space-y-3">
              <Badge variant="blue">Pilar 1: Setup Único</Badge>
              <CardTitle>Taxa de Implementação</CardTitle>
              <p className="text-2xl sm:text-3xl font-extrabold text-blue-700 tracking-tight">10.000.000 AOA</p>
              <p className="text-xs text-slate-600 leading-relaxed font-medium text-justify">
                Cobrada por organismo governamental para integração de sistemas, auditoria técnica, formação de equipas e homologação.
              </p>
            </Card>

            <Card className="space-y-3">
              <Badge variant="emerald">Pilar 2: Recorrente (MRR)</Badge>
              <CardTitle>Subscrição SaaS Mensal</CardTitle>
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700 tracking-tight">750k – 2.000.000 AOA</p>
              <p className="text-xs text-slate-600 leading-relaxed font-medium text-justify">
                Licenciamento mensal recorrente com base na dimensão institucional (Institutos, Ministérios, AGT, Bancos).
              </p>
            </Card>

            <Card className="space-y-3">
              <Badge variant="purple">Pilar 3: Variável</Badge>
              <CardTitle>APIs & Notificações</CardTitle>
              <p className="text-2xl sm:text-3xl font-extrabold text-purple-700 tracking-tight">Tarifa por Transacção</p>
              <p className="text-xs text-slate-600 leading-relaxed font-medium text-justify">
                Tarifação por volume para envio massivo de SMS, notificações WhatsApp e validação documental por API.
              </p>
            </Card>
          </div>

          {/* Visual Revenue Mix Chart & Process Flow */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <Card className="space-y-4">
              <SectionHeader
                title="Composição Estimada da Receita (Ano 1)"
                subtitle="Distribuição percentual entre taxas de adesão, subscrições e serviços variáveis."
              />
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={revenueMixData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={85} innerRadius={45} paddingAngle={4}>
                      {revenueMixData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={(v: unknown) => `${v}% da Receita`} contentStyle={{ borderRadius: 16, border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontSize: 12 }} />
                    <Legend wrapperStyle={{ fontSize: 11, fontWeight: 600 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Process Flow Diagram */}
            <Card className="space-y-4">
              <SectionHeader
                title="Fluxo de Valor do Cliente Institucional"
                subtitle="Ciclo de vida comercial e transição para receita recorrente."
              />

              <Timeline
                steps={[
                  {
                    step: '1',
                    title: 'Onboarding & Setup Técnico',
                    description: 'Entrada com pagamento da taxa de 10M AOA para integração de sistemas e homologação oficial.',
                    badge: 'Taxa de Setup',
                    badgeVariant: 'blue',
                  },
                  {
                    step: '2',
                    title: 'Activacao da Subscrição Mensal',
                    description: 'Facturação recorrente mensal (750k a 2M AOA/mês) garantindo sustentabilidade e suporte contínuo.',
                    badge: 'MRR Recorrente',
                    badgeVariant: 'emerald',
                  },
                  {
                    step: '3',
                    title: 'Expansão por Notificações & APIs',
                    description: 'Crescimento do ticket médio com base no volume de comunicações, alertas SMS e consultas API enviadas.',
                    badge: 'Serviços Variáveis',
                    badgeVariant: 'purple',
                  },
                ]}
              />
            </Card>
          </div>
        </div>
      );
    }

    /* ---------------------------------------------------------------------- */
    /* 3. ESTRATÉGIA DE MONETIZAÇÃO                                          */
    /* ---------------------------------------------------------------------- */
    case 'monetization': {
      const pricingComparisonData = [
        { name: 'Inst. Públicos', mrr: 750000, setup: 10000000 },
        { name: 'Ministérios', mrr: 1200000, setup: 10000000 },
        { name: 'AGT / Finanças', mrr: 1500000, setup: 10000000 },
        { name: 'Bancos / Seguros', mrr: 2000000, setup: 10000000 },
      ];

      return (
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header */}
          <PageHeader
            badge="Matriz de Tarifas"
            secondaryBadge="Apresentação Executiva"
            title="Estratégia de Monetização & Tabela de Preços"
            description="A estratégia de monetização foi concebida para garantir acessibilidade às instituições públicas e escalabilidade comercial no sector privado. Os tarifários encontram-se segmentados por tipo de cliente, dimensão institucional e volume de utilização, contemplando licenças mensais, taxas de implementação, integrações com sistemas existentes e serviços adicionais de elevado valor acrescentado."
            icon={Coins}
          />

          {/* Recharts Bar Chart comparing MRR by Segment */}
          <Card className="space-y-4">
            <SectionHeader
              title="Comparativo da Subscrição Mensal por Segmento"
              subtitle="Valores de subscrição mensal recorrente (AOA / mês) para cada tipo de cliente."
            />
            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pricingComparisonData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#475569', fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={v => formatAOA(v as number, true)} tick={{ fontSize: 11, fill: '#475569' }} axisLine={false} tickLine={false} width={80} />
                  <RechartsTooltip formatter={(v: unknown) => formatAOA(v as number)} contentStyle={{ borderRadius: 16, border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontSize: 12 }} />
                  <Bar dataKey="mrr" name="Licença Mensal Recorrente" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Clean High-Contrast Table */}
          <Card padding={false} className="overflow-hidden">
            <div className="p-6 bg-white border-b border-slate-200">
              <SectionHeader title="Tabela Discriminada de Tarifários" subtitle="Resumo das taxas de adesão e licenças recorrentes por segmento institucional" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-white text-slate-800 font-extrabold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-4">Segmento de Cliente</th>
                    <th className="px-5 py-4">Taxa de Adesão / Setup</th>
                    <th className="px-5 py-4">Licença Mensal</th>
                    <th className="px-5 py-4">Capacidade & Incluídos</th>
                  </tr>
                </thead>
                <tbody className="font-medium text-slate-800 divide-y divide-slate-100">
                  <tr className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-5 py-4 font-bold text-slate-900">Institutos Públicos (ex: INAPEM)</td>
                    <td className="px-5 py-4 font-bold text-blue-700">10.000.000 AOA</td>
                    <td className="px-5 py-4 font-bold text-emerald-700">750.000 AOA / mês</td>
                    <td className="px-5 py-4 text-slate-600 text-justify">Caixas digitais ilimitadas, 5.000 notificações/mês</td>
                  </tr>
                  <tr className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-5 py-4 font-bold text-slate-900">Ministérios & Adm. Central</td>
                    <td className="px-5 py-4 font-bold text-blue-700">10.000.000 AOA</td>
                    <td className="px-5 py-4 font-bold text-emerald-700">1.200.000 AOA / mês</td>
                    <td className="px-5 py-4 text-slate-600 text-justify">Acesso via API, suporte prioritário 24/7</td>
                  </tr>
                  <tr className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-5 py-4 font-bold text-slate-900">Organismos Fiscais (AGT)</td>
                    <td className="px-5 py-4 font-bold text-blue-700">10.000.000 AOA</td>
                    <td className="px-5 py-4 font-bold text-emerald-700">1.500.000 AOA / mês</td>
                    <td className="px-5 py-4 text-slate-600 text-justify">Notificações fiscais massivas e arquivo seguro</td>
                  </tr>
                  <tr className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-5 py-4 font-bold text-slate-900">Bancos e Inst. Financeiras</td>
                    <td className="px-5 py-4 font-bold text-blue-700">10.000.000 AOA</td>
                    <td className="px-5 py-4 font-bold text-emerald-700">2.000.000 AOA / mês</td>
                    <td className="px-5 py-4 text-slate-600 text-justify">Assinatura qualificada e módulo IA anticorrupção</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      );
    }

    /* ---------------------------------------------------------------------- */
    /* 4. ESTRATÉGIA COMERCIAL                                                */
    /* ---------------------------------------------------------------------- */
    case 'commercial_strategy': {
      return (
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header */}
          <PageHeader
            badge="Go-To-Market B2G"
            secondaryBadge="Apresentação Executiva"
            title="Estratégia Comercial & Pipeline de Vendas"
            description="A estratégia comercial baseia-se numa expansão progressiva, iniciando-se com projetos-piloto em instituições estratégicas e evoluindo para uma adoção nacional. O pipeline de vendas prevê a validação inicial no INAPEM, seguida da expansão para Ministérios, Governos Provinciais, Institutos Públicos, Empresas Públicas, Bancos, Seguradoras e restantes organizações privadas, criando um efeito de credibilidade e aceleração da adoção."
            icon={TrendingUp}
          />

          {/* Visual Step Progress Flow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="emerald">Fase 1: Âncora</Badge>
                <span className="text-xs font-mono font-bold text-emerald-700">Meses 1 - 3</span>
              </div>
              <CardTitle>Piloto INAPEM</CardTitle>
              <p className="text-xs text-slate-600 leading-relaxed font-medium text-justify">
                Caso de sucesso e prova de conceito no INAPEM. Validação técnica, cibersegurança e emissão do parecer oficial do Phase Gate 1.
              </p>
              <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 text-xs font-bold text-emerald-800">
                Meta: Validação 100% concluída
              </div>
            </Card>

            <Card className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="blue">Fase 2: Ministérios</Badge>
                <span className="text-xs font-mono font-bold text-blue-700">Meses 4 - 8</span>
              </div>
              <CardTitle>Ministérios Âncora</CardTitle>
              <p className="text-xs text-slate-600 leading-relaxed font-medium text-justify">
                Apresentação executiva ao Ministério da Justiça, das Finanças (AGT) e do Interior para adopção oficial do correio digital.
              </p>
              <div className="bg-blue-50 p-3.5 rounded-xl border border-blue-200 text-xs font-bold text-blue-800">
                Meta: 5 a 8 Ministérios
              </div>
            </Card>

            <Card className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="purple">Fase 3: B2B</Badge>
                <span className="text-xs font-mono font-bold text-purple-700">Meses 9 - 12</span>
              </div>
              <CardTitle>Sector Bancário & Seguros</CardTitle>
              <p className="text-xs text-slate-600 leading-relaxed font-medium text-justify">
                Expansão para bancos comerciais (ex: BFA) para envio de citações bancárias, notificações de crédito e assinatura de contratos.
              </p>
              <div className="bg-purple-50 p-3.5 rounded-xl border border-purple-200 text-xs font-bold text-purple-800">
                Meta: Bancos Comerciais
              </div>
            </Card>
          </div>

          {/* Presentation Funnel Card */}
          <Card className="space-y-4">
            <SectionHeader title="Resumo do Funil de Conversão B2G" subtitle="Tempos de ciclo e taxa de retenção esperada para o sector público." />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <StatCard
                title="Ciclo de Venda"
                value="3 – 6 Meses"
                subtitle="Do contacto inicial ao protocolo"
                color="blue"
              />
              <StatCard
                title="Ticket Médio Anual"
                value="22M – 36M AOA"
                subtitle="Setup + 12 meses subscrição"
                color="emerald"
              />
              <StatCard
                title="Taxa de Cancelamento"
                value="Churn ~0%"
                subtitle="Retenção total no sector público"
                color="purple"
              />
            </div>
          </Card>
        </div>
      );
    }

    /* ---------------------------------------------------------------------- */
    /* 5. HIPÓTESES DE CRESCIMENTO                                            */
    /* ---------------------------------------------------------------------- */
    case 'growth_hypotheses': {
      const adoptionCurveData = [
        { month: 'M1', inst: 1, b2b: 10 },
        { month: 'M3', inst: 2, b2b: 50 },
        { month: 'M6', inst: 4, b2b: 250 },
        { month: 'M9', inst: 6, b2b: 800 },
        { month: 'M12', inst: 8, b2b: 2500 },
      ];

      return (
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header */}
          <PageHeader
            badge="Modelagem de Crescimento"
            secondaryBadge="Apresentação Executiva"
            title="Hipóteses de Crescimento & Efeito de Rede"
            description="O crescimento do Correio Digital Angola assenta num forte efeito de rede institucional. À medida que novas entidades aderem à plataforma, aumenta naturalmente o valor para cidadãos, empresas e restantes organismos públicos, impulsionando novas adesões, reduzindo custos operacionais e fortalecendo a retenção de clientes. Este modelo permite criar um ecossistema digital integrado com elevado potencial de escalabilidade nacional."
            icon={Activity}
          />

          {/* Adoption Chart */}
          <Card className="space-y-4">
            <SectionHeader title="Curva de Adopção Institucional & Expansão B2B" subtitle="Evolução do número de instituições públicas e empresas privadas com caixas activas." />
            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={adoptionCurveData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#475569', fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#475569' }} axisLine={false} tickLine={false} width={50} />
                  <RechartsTooltip contentStyle={{ borderRadius: 16, border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 12, fontWeight: 600 }} />
                  <Area type="monotone" dataKey="inst" name="Instituições Públicas" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.3} strokeWidth={2} />
                  <Area type="monotone" dataKey="b2b" name="Empresas B2B Conectadas" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.15} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Two Core Hypothesis Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="space-y-3">
              <div className="p-3 bg-blue-50 text-blue-700 rounded-2xl w-fit border border-blue-100">
                <ArrowUpRight size={24} />
              </div>
              <CardTitle>Efeito de Rede B2G → B2B</CardTitle>
              <p className="text-xs text-slate-600 leading-relaxed font-medium text-justify">
                Sempre que um Ministério ou organismo fiscal adopta a plataforma, todos os seus fornecedores e empresas subordinadas são impulsionados a criar uma caixa postal digital para receber notificações oficiais e pagamentos.
              </p>
            </Card>

            <Card className="space-y-3">
              <div className="p-3 bg-emerald-50 text-emerald-700 rounded-2xl w-fit border border-emerald-100">
                <ShieldCheck size={24} />
              </div>
              <CardTitle>Retenção de 100% (Churn Nulo)</CardTitle>
              <p className="text-xs text-slate-600 leading-relaxed font-medium text-justify">
                Uma vez integrado no ecossistema estatal, o Correio Digital torna-se a via oficial de comunicação legal e administrativa. A taxa de cancelamento (churn) estimada é próxima de 0%.
              </p>
            </Card>
          </div>
        </div>
      );
    }

    /* ---------------------------------------------------------------------- */
    /* 6. INVESTIMENTO INICIAL                                                */
    /* ---------------------------------------------------------------------- */
    case 'initial_investment': {
      const trancheData = [
        { name: 'Tranche 1 (40%)', amount: 13836000, color: '#2563eb', desc: 'Instalação & Centro Operacional' },
        { name: 'Tranche 2 (35%)', amount: 12106500, color: '#8b5cf6', desc: 'Mês 3 após relatório do Piloto' },
        { name: 'Tranche 3 (25%)', amount: 8647500, color: '#10b981', desc: 'Mês 6 com KPIs do Phase Gate 1' },
      ];

      return (
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header */}
          <PageHeader
            badge="Investimento & Financiamento"
            secondaryBadge="Apresentação Executiva"
            title="Investimento Inicial & Tranches de Financiamento"
            description="O investimento inicial estimado em 34,59 milhões AOA destina-se ao desenvolvimento, implementação e operacionalização do Correio Digital Angola. A libertação dos fundos será efetuada de forma faseada através de tranches associadas ao cumprimento de objetivos técnicos, comerciais e financeiros previamente definidos, garantindo maior controlo sobre a execução do projeto e uma utilização eficiente dos recursos."
            icon={DollarSign}
          />

          {/* Funding Tranches Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="space-y-3">
              <Badge variant="blue">Tranche 1 (40%)</Badge>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">13.836.000 AOA</p>
              <p className="text-xs text-slate-600 font-medium text-justify">
                Disponibilização imediata no arranque do projecto para aquisição de equipamento técnico e instalação do Centro Operacional.
              </p>
            </Card>

            <Card className="space-y-3">
              <Badge variant="purple">Tranche 2 (35%)</Badge>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">12.106.500 AOA</p>
              <p className="text-xs text-slate-600 font-medium text-justify">
                Libertação no Mês 3 após apresentação do relatório de execução do piloto INAPEM.
              </p>
            </Card>

            <Card className="space-y-3">
              <Badge variant="emerald">Tranche 3 (25%)</Badge>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">8.647.500 AOA</p>
              <p className="text-xs text-slate-600 font-medium text-justify">
                Libertação no Mês 6 com atingimento dos KPIs de segurança e aprovação formal do Phase Gate 1.
              </p>
            </Card>
          </div>

          {/* Pie Chart of Tranches */}
          <Card className="space-y-4">
            <SectionHeader title="Distribuição das Tranches de Liberação de Capital" subtitle="Total de 34.590.000 AOA condicionado ao cumprimento dos marcos operacionais." />
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={trancheData} dataKey="amount" nameKey="name" cx="50%" cy="50%" outerRadius={85} innerRadius={45} paddingAngle={4}>
                    {trancheData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip formatter={(v: unknown) => formatAOA(v as number)} contentStyle={{ borderRadius: 16, border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11, fontWeight: 600 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      );
    }

    /* ---------------------------------------------------------------------- */
    /* 7. INDICADORES COMERCIAIS                                              */
    /* ---------------------------------------------------------------------- */
    case 'commercial_kpis': {
      return (
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header */}
          <PageHeader
            badge="Desempenho Comercial"
            secondaryBadge="Apresentação Executiva"
            title="Indicadores Comerciais & Métricas de Venda"
            description="Esta secção apresenta os principais indicadores de desempenho comercial, incluindo o valor médio por contrato (ARPA), tempo médio do ciclo de vendas B2G, taxa de conversão do pipeline comercial, número de clientes âncora, receitas recorrentes mensais (MRR), custo de aquisição de clientes (CAC), valor do ciclo de vida do cliente (LTV) e restantes métricas essenciais para avaliar a eficiência da estratégia comercial."
            icon={BarChart3}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Receita Média por Cliente (ARPA)"
              value="22M – 36M AOA"
              subtitle="Valor médio anual por contrato institucional B2G"
              color="blue"
            />
            <StatCard
              title="Ciclo Médio de Venda"
              value="3 – 6 Meses"
              subtitle="Do contacto inicial até à assinatura do protocolo oficial"
              color="amber"
            />
            <StatCard
              title="Margem Cambial Prudencial"
              value="+17.5%"
              subtitle="Proteção sobre custos de servidores e licenças internacionais"
              color="emerald"
            />
          </div>
        </div>
      );
    }

    /* ---------------------------------------------------------------------- */
    /* 8. ESTRATÉGIA DE CRESCIMENTO                                           */
    /* ---------------------------------------------------------------------- */
    case 'growth_strategy': {
      return (
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header */}
          <PageHeader
            badge="Roteiro de Expansão"
            secondaryBadge="Apresentação Executiva"
            title="Estratégia de Crescimento & Expansão Territorial"
            description="O plano de crescimento prevê uma implementação faseada, iniciando-se na Província de Luanda e expandindo-se progressivamente para todas as províncias de Angola, acompanhando a adesão institucional e a maturidade operacional da plataforma. Após a consolidação do mercado nacional, o projeto contempla a integração com serviços digitais internacionais e a possibilidade de expansão para outros mercados africanos de língua portuguesa, reforçando a posição do Correio Digital Angola como referência regional em transformação digital da correspondência oficial."
            icon={Layers}
          />

          <Timeline
            orientation="horizontal"
            steps={[
              {
                step: '1',
                title: 'Etapa 1: Luanda (Sede & Ministérios)',
                description: 'Consolidação na capital junto dos órgãos centrais da Administração Pública.',
                badge: 'Arranque',
                badgeVariant: 'blue',
              },
              {
                step: '2',
                title: 'Etapa 2: Províncias (21 Províncias)',
                description: 'Alargamento aos Governos Provinciais e Administrações Municipais.',
                badge: 'Expansão',
                badgeVariant: 'purple',
              },
              {
                step: '3',
                title: 'Etapa 3: Integração B2B (Sector Privado)',
                description: 'Integração obrigatória para fornecedores do Estado e instituições bancárias.',
                badge: 'Escala B2B',
                badgeVariant: 'emerald',
              },
              {
                step: '4',
                title: 'Etapa 4: CPLP / SADC (Internacional)',
                description: 'Corredor postal digital entre Angola, Moçambique, Portugal e África Austral.',
                badge: 'Regional',
                badgeVariant: 'amber',
              },
            ]}
          />
        </div>
      );
    }

    /* ---------------------------------------------------------------------- */
    /* 9. CONSIDERAÇÕES FINAIS                                                */
    /* ---------------------------------------------------------------------- */
    case 'final_considerations': {
      return (
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Executive Summary Pitch Card */}
          <Card className="p-8 sm:p-10 text-slate-900 space-y-6 text-center">
            <div className="flex justify-center">
              <Badge variant="blue" size="lg">Síntese de Viabilidade & Valor</Badge>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Considerações Finais — Correio Digital Angola
            </h1>

            <p className="text-slate-700 text-sm sm:text-base max-w-4xl mx-auto leading-relaxed font-medium text-justify">
              O Correio Digital Angola apresenta um modelo de negócio financeiramente sustentável, tecnologicamente escalável e alinhado com a estratégia nacional de transformação digital da Administração Pública. A combinação entre receitas recorrentes, crescimento institucional e elevada capacidade de expansão permite projetar um retorno progressivo do investimento, com previsão de atingir o ponto de equilíbrio operacional nos primeiros meses de exploração e consolidar uma plataforma capaz de modernizar, simplificar e tornar mais segura a comunicação oficial entre o Estado, os cidadãos e as organizações. O projeto representa uma oportunidade estratégica para acelerar a digitalização dos serviços públicos em Angola, reduzir custos operacionais, aumentar a eficiência administrativa e criar uma infraestrutura digital de elevado impacto económico e social.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto pt-4 text-left">
              <StatCard
                title="Retorno Rápido"
                value="Break-Even Mês 3"
                subtitle="Autonomia financeira no 1º trimestre de operação"
                color="blue"
              />
              <StatCard
                title="Margem Elevada"
                value="131.8M AOA"
                subtitle="Geração de caixa líquida acumulada no Ano 1"
                color="emerald"
              />
              <StatCard
                title="Soberania Estatal"
                value="GovTech Angola"
                subtitle="Infraestrutura digital soberana de longo prazo"
                color="purple"
              />
            </div>

            {onNavigate && (
              <div className="pt-6 flex justify-center">
                <button
                  onClick={() => onNavigate('revenue_projections')}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold px-7 py-3.5 rounded-2xl text-xs sm:text-sm transition-all flex items-center gap-2.5 shadow-md hover:shadow-lg active:scale-95"
                >
                  <span>Ver Projeções de Receita Completa</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </Card>
        </div>
      );
    }

    default:
      return null;
  }
}
