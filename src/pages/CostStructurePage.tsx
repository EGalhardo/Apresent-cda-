import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { DollarSign, Users, Cpu, Wallet, Plus, Trash2, Edit2, Download, Printer } from 'lucide-react';
import Card, { CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Tooltip from '../components/ui/Tooltip';
import { useERP } from '../context/ERPContext';
import { formatAOA } from '../utils/format';

export default function CostStructurePage() {
  const { expenses, employees, addExpense, deleteExpense, addEmployee, deleteEmployee, settings, addToast } = useERP();
  const [activeTab, setActiveTab] = useState<'opex' | 'expenses' | 'employees'>('opex');

  const opexData = [
    { name: 'Recursos Humanos (RH)', value: 400000, color: '#3b82f6', desc: '4 direções operacionais executivas' },
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-300 print:hidden">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="blue">Demonstrativo de Custos</Badge>
            <span className="text-xs text-slate-700 font-semibold">Custos de Funcionamento & Pessoal</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Estrutura de Custos</h1>
          <p className="text-xs sm:text-sm text-slate-700 font-medium max-w-4xl leading-relaxed text-justify">
            A estrutura de custos contempla todas as despesas necessárias ao funcionamento da plataforma, incluindo remuneração da equipa técnica e administrativa, infraestrutura tecnológica, alojamento em cloud, serviços de segurança informática, licenciamento de software, suporte técnico, marketing, despesas administrativas e custos operacionais associados ao crescimento da operação.
          </p>
        </div>

        <Tooltip title="Imprimir Relatório de Custos" purpose="Gerar ficheiro PDF da estrutura de custos" meaning="Abre o assistente de impressão">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-xl text-xs transition-colors"
          >
            <Printer size={15} />
            Imprimir Custos
          </button>
        </Tooltip>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-white border border-slate-300 p-1.5 rounded-2xl w-fit shadow-xs">
        <button
          onClick={() => setActiveTab('opex')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
            activeTab === 'opex' ? 'bg-blue-50 text-blue-700 border-blue-400 shadow-2xs' : 'border-transparent text-slate-700 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Custos Mensais
        </button>
        <button
          onClick={() => setActiveTab('expenses')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
            activeTab === 'expenses' ? 'bg-blue-50 text-blue-700 border-blue-400 shadow-2xs' : 'border-transparent text-slate-700 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Registo de Despesas ({expenses.length})
        </button>
        <button
          onClick={() => setActiveTab('employees')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
            activeTab === 'employees' ? 'bg-blue-50 text-blue-700 border-blue-400 shadow-2xs' : 'border-transparent text-slate-700 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Recursos Humanos ({employees.length})
        </button>
      </div>

      {activeTab === 'opex' && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Tooltip title="Custos de Funcionamento Mensais" purpose="Total de despesas operacionais mensais necessárias para manter a plataforma activa" meaning="Consolidação dos custos recorrentes do Centro Operacional">
              <Card className="p-5">
                <p className="text-xs text-slate-700 font-semibold mb-1">Custos Mensais Projetados</p>
                <p className="text-2xl font-extrabold text-blue-600">{formatAOA(totalMonthlyOpex, true)}</p>
                <p className="text-[11px] text-slate-600 font-medium mt-1">46.200.000 AOA acumulados / ano</p>
              </Card>
            </Tooltip>

            <Tooltip title="Gatilho Salarial (Gatilho 12M)" purpose="Condição prévia de receita recorrente para revisão dos salários" meaning="Exige Receita Mensal ≥ 12M AOA no Mês 6 para reajuste executivo">
              <Card className="p-5">
                <p className="text-xs text-slate-700 font-semibold mb-1">Gatilho Salarial (Mês 6)</p>
                <p className="text-2xl font-extrabold text-purple-600">12.000.000 AOA</p>
                <p className="text-[11px] text-purple-700 font-bold mt-1">Revisão salarial vinculada às receitas</p>
              </Card>
            </Tooltip>

            <Tooltip title="Remuneração Actual Equipa Fundadora" purpose="Massa salarial actual da equipa de 4 direções operacionais" meaning="100.000 AOA/mês por colaborador na fase inicial">
              <Card className="p-5">
                <p className="text-xs text-slate-700 font-semibold mb-1">Folha Salarial Inicial (4 Colaboradores)</p>
                <p className="text-2xl font-extrabold text-emerald-600">{formatAOA(400000, true)}</p>
                <p className="text-[11px] text-slate-600 font-medium mt-1">100.000 AOA / colaborador</p>
              </Card>
            </Tooltip>
          </div>

          {/* Chart & List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <CardTitle className="mb-2">Distribuição Percentual do OPEX</CardTitle>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={opexData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={4}>
                      {opexData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={(v: unknown) => formatAOA(v as number)} contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontSize: 12 }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-6">
              <CardTitle className="mb-4">Detalhamento das Rubricas do OPEX</CardTitle>
              <div className="space-y-3">
                {opexData.map(item => (
                  <Tooltip key={item.name} title={item.name} purpose={item.desc} meaning={`Valor mensal: ${formatAOA(item.value)}`} className="w-full">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                        <div>
                          <p className="text-xs font-bold text-gray-900">{item.name}</p>
                          <p className="text-[11px] text-gray-400">{item.desc}</p>
                        </div>
                      </div>
                      <span className="text-xs font-extrabold text-gray-900">{formatAOA(item.value, true)}</span>
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
          <div className="p-5 border-b border-gray-200 flex items-center justify-between">
            <div>
              <CardTitle>Histórico de Despesas Operacionais</CardTitle>
              <p className="text-xs text-slate-700 font-medium">Registo completo de pagamentos e fornecedores</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-800 font-bold uppercase tracking-wider border-b border-slate-300">
                <tr>
                  <th className="px-4 py-3">Descrição</th>
                  <th className="px-4 py-3">Categoria</th>
                  <th className="px-4 py-3">Data</th>
                  <th className="px-4 py-3">Fornecedor</th>
                  <th className="px-4 py-3 text-right">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 font-medium text-gray-800">
                {expenses.slice(0, 15).map(exp => (
                  <tr key={exp.id} className="hover:bg-slate-100/80">
                    <td className="px-4 py-3 font-bold text-gray-900">{exp.description}</td>
                    <td className="px-4 py-3 uppercase text-[10px] font-bold text-blue-700">{exp.category}</td>
                    <td className="px-4 py-3 text-slate-700 font-medium">{exp.date}</td>
                    <td className="px-4 py-3 text-slate-700 font-medium">{exp.supplier || 'N/D'}</td>
                    <td className="px-4 py-3 text-right font-extrabold text-amber-700">{formatAOA(exp.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'employees' && (
        <Card padding={false} className="overflow-hidden">
          <div className="p-5 border-b border-gray-200 flex items-center justify-between">
            <div>
              <CardTitle>Quadro de Colaboradores & Direcção</CardTitle>
              <p className="text-xs text-slate-700 font-medium">Equipa fundadora do Correio Digital Angola</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-800 font-bold uppercase tracking-wider border-b border-slate-300">
                <tr>
                  <th className="px-4 py-3">Nome</th>
                  <th className="px-4 py-3">Cargo</th>
                  <th className="px-4 py-3">Departamento</th>
                  <th className="px-4 py-3 text-right">Salário AOA</th>
                  <th className="px-4 py-3">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 font-medium text-gray-800">
                {employees.map(emp => (
                  <tr key={emp.id} className="hover:bg-slate-100/80">
                    <td className="px-4 py-3 font-bold text-gray-900">{emp.name}</td>
                    <td className="px-4 py-3 text-slate-800 font-medium">{emp.role}</td>
                    <td className="px-4 py-3 text-slate-700 font-medium">{emp.department}</td>
                    <td className="px-4 py-3 text-right font-extrabold text-emerald-700">{formatAOA(emp.salary)}</td>
                    <td className="px-4 py-3">
                      <Badge variant="green">Activo</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
