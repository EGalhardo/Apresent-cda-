// ─── Types ───────────────────────────────────────────────────────────────────

export type InstitutionStatus = 'prospect' | 'negotiation' | 'active' | 'inactive';
export type InvoiceStatus = 'pending' | 'paid' | 'overdue' | 'cancelled';
export type TransactionType = 'revenue' | 'expense';
export type ExpenseCategory = 'rh' | 'tecnologia' | 'marketing' | 'transporte' | 'servicos' | 'capex' | 'contingencia';

export interface Institution {
  id: string;
  name: string;
  segment: 'Adm. Pública Central' | 'Adm. Local' | 'Empresa Pública' | 'Inst. Financeira' | 'Privada';
  contact: string;
  email: string;
  phone: string;
  status: InstitutionStatus;
  mrr: number;
  implementationFee: number;
  licenseType: 'mensal' | 'trimestral' | 'semestral' | 'anual';
  joinDate: string;
  services: string[];
  notes: string;
}

export interface Invoice {
  id: string;
  institutionId: string;
  institutionName: string;
  amount: number;
  type: 'implementacao' | 'licenca' | 'saas' | 'integracao' | 'ia' | 'assinatura';
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  description: string;
}

export interface Expense {
  id: string;
  category: ExpenseCategory;
  description: string;
  amount: number;
  date: string;
  supplier?: string;
  recurring: boolean;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  salary: number;
  startDate: string;
  status: 'active' | 'inactive';
  email: string;
}

export interface KPI {
  label: string;
  value: number;
  target: number;
  unit: string;
}

// ─── Seed Data ────────────────────────────────────────────────────────────────

export const initialInstitutions: Institution[] = [
  {
    id: 'inst-001',
    name: 'INAPEM',
    segment: 'Adm. Pública Central',
    contact: 'Dr. João Sebastião',
    email: 'info@inapem.gov.ao',
    phone: '+244 222 334 455',
    status: 'active',
    mrr: 750000,
    implementationFee: 10000000,
    licenseType: 'mensal',
    joinDate: '2025-01-01',
    services: ['Correspondência Digital', 'Notificações', 'Arquivo Digital'],
    notes: 'Teste piloto principal. Caso de sucesso para expansão B2G.',
  },
  {
    id: 'inst-002',
    name: 'Ministério da Justiça e dos Direitos Humanos',
    segment: 'Adm. Pública Central',
    contact: 'Dra. Ana Ferreira',
    email: 'geral@minjusdh.gov.ao',
    phone: '+244 222 445 566',
    status: 'negotiation',
    mrr: 1200000,
    implementationFee: 10000000,
    licenseType: 'semestral',
    joinDate: '',
    services: ['Correspondência Digital', 'Assinatura Electrónica', 'Integração API'],
    notes: 'Em processo de negociação. Pipeline confirmado.',
  },
  {
    id: 'inst-003',
    name: 'AGT – Administração Geral Tributária',
    segment: 'Adm. Pública Central',
    contact: 'Eng. Pedro Costa',
    email: 'digital@agt.minfin.gov.ao',
    phone: '+244 222 556 677',
    status: 'prospect',
    mrr: 1500000,
    implementationFee: 10000000,
    licenseType: 'anual',
    joinDate: '',
    services: ['Notificações Fiscais', 'Integração API', 'Dashboard BI'],
    notes: 'Contacto inicial realizado. Reunião técnica agendada.',
  },
  {
    id: 'inst-004',
    name: 'INSS – Instituto Nacional de Segurança Social',
    segment: 'Adm. Pública Central',
    contact: 'Dra. Maria Luísa',
    email: 'ti@inss.gov.ao',
    phone: '+244 222 667 788',
    status: 'prospect',
    mrr: 900000,
    implementationFee: 10000000,
    licenseType: 'mensal',
    joinDate: '',
    services: ['Correspondência Digital', 'Notificações', 'Arquivo Digital'],
    notes: 'Interesse manifestado. Aguarda proposta formal.',
  },
  {
    id: 'inst-005',
    name: 'Banco BFA',
    segment: 'Inst. Financeira',
    contact: 'Eng. Ricardo Santos',
    email: 'digital@bfa.ao',
    phone: '+244 222 778 899',
    status: 'negotiation',
    mrr: 2000000,
    implementationFee: 10000000,
    licenseType: 'anual',
    joinDate: '',
    services: ['Autenticação Documental', 'Assinatura Electrónica', 'Integração API', 'IA'],
    notes: 'Proposta entregue. Revisão jurídica em curso.',
  },
];

export const initialInvoices: Invoice[] = [
  {
    id: 'INV-2025-001',
    institutionId: 'inst-001',
    institutionName: 'INAPEM',
    amount: 10000000,
    type: 'implementacao',
    status: 'paid',
    issueDate: '2025-01-01',
    dueDate: '2025-01-15',
    paidDate: '2025-01-12',
    description: 'Taxa de Implementação Institucional — Fase Piloto',
  },
  {
    id: 'INV-2025-002',
    institutionId: 'inst-001',
    institutionName: 'INAPEM',
    amount: 750000,
    type: 'saas',
    status: 'paid',
    issueDate: '2025-02-01',
    dueDate: '2025-02-15',
    paidDate: '2025-02-10',
    description: 'Subscrição SaaS Mensal — Fev 2025',
  },
  {
    id: 'INV-2025-003',
    institutionId: 'inst-001',
    institutionName: 'INAPEM',
    amount: 750000,
    type: 'saas',
    status: 'paid',
    issueDate: '2025-03-01',
    dueDate: '2025-03-15',
    paidDate: '2025-03-08',
    description: 'Subscrição SaaS Mensal — Mar 2025',
  },
  {
    id: 'INV-2025-004',
    institutionId: 'inst-001',
    institutionName: 'INAPEM',
    amount: 750000,
    type: 'saas',
    status: 'pending',
    issueDate: '2025-04-01',
    dueDate: '2025-04-15',
    description: 'Subscrição SaaS Mensal — Abr 2025',
  },
  {
    id: 'INV-2025-005',
    institutionId: 'inst-002',
    institutionName: 'Min. Justiça e Direitos Humanos',
    amount: 10000000,
    type: 'implementacao',
    status: 'pending',
    issueDate: '2025-04-10',
    dueDate: '2025-05-10',
    description: 'Taxa de Implementação Institucional (Proposta)',
  },
  {
    id: 'INV-2025-006',
    institutionId: 'inst-001',
    institutionName: 'INAPEM',
    amount: 3000000,
    type: 'integracao',
    status: 'paid',
    issueDate: '2025-02-15',
    dueDate: '2025-03-01',
    paidDate: '2025-02-28',
    description: 'Serviço de Integração Tecnológica — API Gov',
  },
];

export const initialExpenses: Expense[] = [
  { id: 'exp-001', category: 'rh', description: 'Salários Equipa (4 colaboradores)', amount: 400000, date: '2025-01-31', recurring: true },
  { id: 'exp-002', category: 'tecnologia', description: 'Vercel Pro', amount: 120000, date: '2025-01-31', supplier: 'Vercel', recurring: true },
  { id: 'exp-003', category: 'tecnologia', description: 'Supabase Pro', amount: 180000, date: '2025-01-31', supplier: 'Supabase', recurring: true },
  { id: 'exp-004', category: 'tecnologia', description: 'APIs Inteligência Artificial', amount: 350000, date: '2025-01-31', supplier: 'OpenAI', recurring: true },
  { id: 'exp-005', category: 'tecnologia', description: 'Outros Serviços Cloud', amount: 250000, date: '2025-01-31', recurring: true },
  { id: 'exp-006', category: 'marketing', description: 'Publicidade Digital', amount: 300000, date: '2025-01-31', recurring: true },
  { id: 'exp-007', category: 'marketing', description: 'Gestão Redes Sociais', amount: 180000, date: '2025-01-31', recurring: true },
  { id: 'exp-008', category: 'marketing', description: 'Eventos Institucionais', amount: 200000, date: '2025-02-15', recurring: false },
  { id: 'exp-009', category: 'transporte', description: 'Combustível e Mobilidade', amount: 400000, date: '2025-01-31', recurring: true },
  { id: 'exp-010', category: 'transporte', description: 'Viagens Institucionais', amount: 250000, date: '2025-02-20', recurring: false },
  { id: 'exp-011', category: 'servicos', description: 'Contabilidade', amount: 200000, date: '2025-01-31', supplier: 'Contabilista', recurring: true },
  { id: 'exp-012', category: 'servicos', description: 'Assessoria Jurídica', amount: 180000, date: '2025-01-31', recurring: true },
  { id: 'exp-013', category: 'servicos', description: 'Centro Operacional (Renda)', amount: 300000, date: '2025-01-31', recurring: true },
  { id: 'exp-014', category: 'capex', description: 'Computadores Portáteis (3x)', amount: 2550000, date: '2025-01-05', recurring: false },
  { id: 'exp-015', category: 'capex', description: 'Monitores, Mobiliário e Equipamentos', amount: 1940000, date: '2025-01-05', recurring: false },
  { id: 'exp-016', category: 'capex', description: 'Equipamentos de Rede e UPS', amount: 490000, date: '2025-01-05', recurring: false },
  { id: 'exp-017', category: 'capex', description: 'TV, Ar Condicionado e Outros', amount: 1510000, date: '2025-01-05', recurring: false },
  { id: 'exp-018', category: 'contingencia', description: 'Fundo de Contingência', amount: 300000, date: '2025-01-31', recurring: true },
  { id: 'exp-019', category: 'rh', description: 'Salários Equipa (4 colaboradores)', amount: 400000, date: '2025-02-28', recurring: true },
  { id: 'exp-020', category: 'tecnologia', description: 'Vercel Pro', amount: 120000, date: '2025-02-28', supplier: 'Vercel', recurring: true },
  { id: 'exp-021', category: 'tecnologia', description: 'Supabase Pro', amount: 180000, date: '2025-02-28', supplier: 'Supabase', recurring: true },
  { id: 'exp-022', category: 'tecnologia', description: 'APIs IA + Cloud', amount: 600000, date: '2025-02-28', recurring: true },
  { id: 'exp-023', category: 'marketing', description: 'Marketing Digital', amount: 480000, date: '2025-02-28', recurring: true },
  { id: 'exp-024', category: 'transporte', description: 'Transporte e Deslocações', amount: 650000, date: '2025-02-28', recurring: true },
  { id: 'exp-025', category: 'servicos', description: 'Serviços Gerais + Centro Operacional', amount: 1080000, date: '2025-02-28', recurring: true },
  { id: 'exp-026', category: 'rh', description: 'Salários Equipa (4 colaboradores)', amount: 400000, date: '2025-03-31', recurring: true },
  { id: 'exp-027', category: 'tecnologia', description: 'Infraestrutura Cloud Completa', amount: 900000, date: '2025-03-31', recurring: true },
  { id: 'exp-028', category: 'marketing', description: 'Marketing e Eventos', amount: 800000, date: '2025-03-31', recurring: true },
  { id: 'exp-029', category: 'transporte', description: 'Transporte', amount: 650000, date: '2025-03-31', recurring: true },
  { id: 'exp-030', category: 'servicos', description: 'Serviços Gerais + Centro Operacional', amount: 1100000, date: '2025-03-31', recurring: true },
];

export const initialEmployees: Employee[] = [
  {
    id: 'emp-001',
    name: 'Adilson Ferreira',
    role: 'CEO / Desenvolvedor Full Stack',
    department: 'Direcção',
    salary: 100000,
    startDate: '2025-01-01',
    status: 'active',
    email: 'ceo@correidigitalangola.ao',
  },
  {
    id: 'emp-002',
    name: 'Sofia Monteiro',
    role: 'Directora Financeira',
    department: 'Financeiro',
    salary: 100000,
    startDate: '2025-01-01',
    status: 'active',
    email: 'financeiro@correidigitalangola.ao',
  },
  {
    id: 'emp-003',
    name: 'Nelson Brito',
    role: 'Director de Segurança da Informação (CISO)',
    department: 'Tecnologia',
    salary: 100000,
    startDate: '2025-01-01',
    status: 'active',
    email: 'ciso@correidigitalangola.ao',
  },
  {
    id: 'emp-004',
    name: 'Catarina Lopes',
    role: 'Directora de Marketing Institucional',
    department: 'Comercial',
    salary: 100000,
    startDate: '2025-01-01',
    status: 'active',
    email: 'marketing@correidigitalangola.ao',
  },
];

// ─── Monthly Revenue Projection ───────────────────────────────────────────────
export const revenueProjection = [
  { month: 'Jan', projected: 2000000, actual: 2000000, opex: 3850000 },
  { month: 'Fev', projected: 3000000, actual: 3000000, opex: 3850000 },
  { month: 'Mar', projected: 5000000, actual: 5000000, opex: 3850000 },
  { month: 'Abr', projected: 7000000, actual: 7000000, opex: 3850000 },
  { month: 'Mai', projected: 9000000, actual: null, opex: 3850000 },
  { month: 'Jun', projected: 12000000, actual: null, opex: 3850000 },
  { month: 'Jul', projected: 15000000, actual: null, opex: 3850000 },
  { month: 'Ago', projected: 18000000, actual: null, opex: 3850000 },
  { month: 'Set', projected: 22000000, actual: null, opex: 3850000 },
  { month: 'Out', projected: 25000000, actual: null, opex: 3850000 },
  { month: 'Nov', projected: 28000000, actual: null, opex: 3850000 },
  { month: 'Dez', projected: 32000000, actual: null, opex: 3850000 },
];

export const opexBreakdown = [
  { name: 'Recursos Humanos', value: 400000, color: '#3b82f6' },
  { name: 'Tecnologia', value: 900000, color: '#8b5cf6' },
  { name: 'Marketing', value: 800000, color: '#f59e0b' },
  { name: 'Transporte', value: 650000, color: '#10b981' },
  { name: 'Centro Operacional', value: 300000, color: '#06b6d4' },
  { name: 'Serviços Gerais', value: 800000, color: '#ef4444' },
];

export const capexData = [
  { name: 'Hardware/Equipamentos', value: 6490000 },
  { name: 'Capital de Giro (6M OPEX)', value: 23100000 },
  { name: 'Reserva Contingência', value: 5000000 },
];

export const scenarioData = [
  { scenario: 'Conservador', capital: 23040000, revenue: 110000000, clients: '2–3' },
  { scenario: 'Moderado (Base)', capital: 34590000, revenue: 178000000, clients: '5–8' },
  { scenario: 'Agressivo', capital: 49590000, revenue: 260000000, clients: '12+' },
];

export const kpiTargets = [
  { label: 'Instituições Activas', current: 1, target: 8, unit: '' },
  { label: 'MRR (AOA)', current: 2000000, target: 32000000, unit: 'AOA' },
  { label: 'Transacções Ano 1', current: 4200, target: 50000, unit: '' },
  { label: 'Receita Acumulada', current: 14750000, target: 178000000, unit: 'AOA' },
];

export const phaseGates = [
  {
    id: 1,
    name: 'Phase Gate 1',
    from: 'Piloto INAPEM',
    to: 'Expansão B2G',
    condition: 'Conclusão dos testes de cibersegurança e emissão do parecer de validação pelo INAPEM',
    status: 'in_progress',
  },
  {
    id: 2,
    name: 'Phase Gate 2',
    from: 'Expansão B2G',
    to: 'Escala Nacional',
    condition: 'Atingimento do Break-Even: MRR ≥ OPEX (3.850.000 AOA/mês)',
    status: 'pending',
  },
  {
    id: 3,
    name: 'Phase Gate 3',
    from: 'Escala Nacional',
    to: 'Expansão Internacional (CPLP/SADC)',
    condition: 'Sustentabilidade financeira plena e cobertura nacional confirmada',
    status: 'pending',
  },
];
