import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { DollarSign, Users, Cpu, Wallet, Plus, Trash2, Edit2, Download, Printer } from 'lucide-react';
import Card, { CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Tooltip from '../components/ui/Tooltip';
import PageHeader from '../components/ui/PageHeader';
import SectionHeader from '../components/ui/SectionHeader';
import StatCard from '../components/ui/StatCard';
import AnimatedChartWrapper from '../components/ui/AnimatedChartWrapper';
import CountUp from '../components/ui/CountUp';
import { useERP } from '../context/ERPContext';
import { formatAOA } from '../utils/format';

export default function CostStructurePage() {
  const { expenses, employees, addExpense, deleteExpense, addEmployee, deleteEmployee, settings, addToast } = useERP();
  const [activeTab, setActiveTab] = useState<'opex' | 'expenses' | 'employees'>('opex');

  const opexData = [
    { name: 'Recursos Humanos (RH)', value: 400000, color: '#2563eb', desc: '4 direções operacionais executivas' },
    { name: 'Infraestrutura Tecnológica', value: 900000, color: '#8b5cf6', desc: 'Servidores Vercel Pro, Supabase, APIs AI, cibersegurança' },
    { name: 'Marketing & Institucional', value: 800000, color: '#f59e0b', desc: 'Comunicação B2G, eventos governamentais, redes' },
    { name: 'Transporte & Deslocações', value: 650000, color: '#10b981', desc: 'Mobilidade institucional e reuniões provinciais' },
    { name: 'Centro Operacional (Renda)', value: 300000, color: '#06b6d4', desc: 'Instalações físicas da sede em Luanda' },
    { name: 'Serviços Gerais & Contingência', value: 800000, color: '#ef4444', desc: 'Contabilidade, assessoria jurídica, seguros' },
  ];

  const totalMonthlyOpex = opexData.reduce((sum, item) => sum + item.value, 0);

  function handlePrint() {
    addToast('A preparar Estrutura de Custos para impressão PDF...', 'info');
    setTimeout(() => window.print(), 300);
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <PageHeader
        badge="Demonstrativo de Custos"
        secondaryBadge="Custos de Funcionamento & Pessoal"
        title="Estrutura de Custos"
        description="A estrutura de custos contempla todas as despesas necessárias ao funcionamento da plataforma, incluindo remuneração da equipa técnica e administrativa, infraestrutura tecnológica, alojamento em cloud, serviços de segurança informática, licenciamento de software, suporte técnico, marketing, despesas administrativas e custos operacionais associados ao crescimento da operação."
        icon={Wallet}
        action={
          <Tooltip title="Imprimir Relatório de Custos" purpose="Gerar ficheiro PDF da estrutura de custos" meaning="Abre o assistente de impressão">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-5 py-3 rounded-2xl text-xs transition-all active:scale-95"
            >
              <Printer size={16} />
              <span>Imprimir Custos</span>
            </button>
          </Tooltip>
        }
      />

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-white border border-slate-200/90 p-1.5 rounded-2xl w-fit print:hidden">
        <button
          onClick={() => setActiveTab('opex')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all border ${
            activeTab === 'opex' ? 'bg-blue-50 text-blue-800 border-blue-200' : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          Custos Mensais
        </button>
        <button
          onClick={() => setActiveTab('expenses')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all border ${
            activeTab === 'expenses' ? 'bg-blue-50 text-blue-800 border-blue-200' : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          Registo de Despesas ({expenses.length})
        </button>
        <button
          onClick={() => setActiveTab('employees')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all border ${
            activeTab === 'employees' ? 'bg-blue-50 text-blue-800 border-blue-200' : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          Recursos Humanos ({employees.length})
        </button>
      </div>

      {activeTab === 'opex' && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Custos Mensais Projetados"
              value={formatAOA(totalMonthlyOpex, true)}
              subtitle="46.200.000 AOA acumulados / ano"
              color="blue"
              icon={Wallet}
            />

            <StatCard
              title="Gatilho Salarial (Mês 6)"
              value="12.000.000 AOA"
              subtitle="Revisão salarial vinculada às receitas"
              color="purple"
              icon={Users}
            />

            <StatCard
              title="Folha Salarial Inicial (4 Colaboradores)"
              value={formatAOA(400000, true)}
              subtitle="100.000 AOA / colaborador"
              color="emerald"
              icon={Cpu}
            />
          </div>

          {/* Chart & List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="space-y-4">
              <SectionHeader title="Distribuição Percentual do OPEX" subtitle="Proporções das principais rubricas de custo operacional." />
              <div className="h-72 w-full pt-2">
                <AnimatedChartWrapper className="w-full h-full">
                  {({ isAnimationActive, key }) => (
                    <ResponsiveContainer width="100%" height="100%" key={key}>
                      <PieChart>
                        <Pie data={opexData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={4} isAnimationActive={isAnimationActive} animationDuration={1500}>
                          {opexData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip formatter={(v: unknown) => formatAOA(v as number)} contentStyle={{ borderRadius: 16, border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontSize: 12 }} />
                        <Legend wrapperStyle={{ fontSize: 11, fontWeight: 600 }} />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </AnimatedChartWrapper>
              </div>
            </Card>

            <Card className="space-y-4">
              <SectionHeader title="Detalhamento das Rubricas do OPEX" subtitle="Valores discriminados por área de suporte." />
              <div className="space-y-3 pt-1">
                {opexData.map(item => (
                  <Tooltip key={item.name} title={item.name} purpose={item.desc} meaning={`Valor mensal: ${formatAOA(item.value)}`} className="w-full">
                    <div className="flex items-center justify-between p-3.5 bg-white rounded-2xl border border-slate-200/80 transition-all">
                      <div className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                        <div>
                          <p className="text-xs font-extrabold text-slate-900">{item.name}</p>
                          <p className="text-[11px] text-slate-500 font-medium">{item.desc}</p>
                        </div>
                      </div>
                      <span className="text-xs font-extrabold text-slate-900 font-mono"><CountUp value={formatAOA(item.value, true)} /></span>
                    </div>
                  </Tooltip>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'expenses' && (
        <Card padding={false} className="overflow-hidden">
          <div className="p-6 bg-white border-b border-slate-200 flex items-center justify-between">
            <SectionHeader title="Registo de Despesas Efectivas" subtitle="Registo de custos incorridos no sistema" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-white text-slate-800 font-extrabold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-5 py-4">Descrição</th>
                  <th className="px-5 py-4">Categoria</th>
                  <th className="px-5 py-4">Valor</th>
                  <th className="px-5 py-4">Data</th>
                  <th className="px-5 py-4">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {expenses.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-8 text-center text-slate-500 font-medium">
                      Nenhuma despesa registada até ao momento.
                    </td>
                  </tr>
                ) : (
                  expenses.map(exp => (
                    <tr key={exp.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-5 py-4 font-bold text-slate-900">{exp.description}</td>
                      <td className="px-5 py-4"><Badge variant="blue">{exp.category}</Badge></td>
                      <td className="px-5 py-4 font-bold text-slate-900 font-mono">{formatAOA(exp.amount)}</td>
                      <td className="px-5 py-4 text-slate-600">{exp.date}</td>
                      <td className="px-5 py-4"><Badge variant={exp.status === 'paid' ? 'emerald' : 'amber'}>{exp.status === 'paid' ? 'Pago' : 'Pendente'}</Badge></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'employees' && (
        <Card padding={false} className="overflow-hidden">
          <div className="p-6 bg-white border-b border-slate-200">
            <SectionHeader title="Recursos Humanos & Colaboradores" subtitle="Equipa técnica e operacional registada" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-white text-slate-800 font-extrabold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-5 py-4">Nome</th>
                  <th className="px-5 py-4">Cargo / Função</th>
                  <th className="px-5 py-4">Salário Mensal</th>
                  <th className="px-5 py-4">Data de Início</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {employees.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-8 text-center text-slate-500 font-medium">
                      Nenhum colaborador registado até ao momento.
                    </td>
                  </tr>
                ) : (
                  employees.map(emp => (
                    <tr key={emp.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-5 py-4 font-bold text-slate-900">{emp.name}</td>
                      <td className="px-5 py-4"><Badge variant="purple">{emp.role}</Badge></td>
                      <td className="px-5 py-4 font-bold text-emerald-700 font-mono">{formatAOA(emp.salary)}</td>
                      <td className="px-5 py-4 text-slate-600">{emp.hireDate}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
