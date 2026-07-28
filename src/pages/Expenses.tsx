import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Wallet, Search, RefreshCw, Download } from 'lucide-react';
import { useERP } from '../context/ERPContext';
import { Expense, ExpenseCategory } from '../data/store';
import { formatAOA, formatDate } from '../utils/format';
import Card, { CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import AnimatedChartWrapper from '../components/ui/AnimatedChartWrapper';
import CountUp from '../components/ui/CountUp';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const categoryLabel: Record<ExpenseCategory, string> = {
  rh: 'Recursos Humanos',
  tecnologia: 'Tecnologia',
  marketing: 'Marketing',
  transporte: 'Transporte',
  servicos: 'Serviços Gerais',
  capex: 'CAPEX',
  contingencia: 'Contingência',
};

const categoryColors: Record<ExpenseCategory, string> = {
  rh: '#3b82f6',
  tecnologia: '#8b5cf6',
  marketing: '#f59e0b',
  transporte: '#10b981',
  servicos: '#06b6d4',
  capex: '#ef4444',
  contingencia: '#6b7280',
};

const categoryVariant: Record<ExpenseCategory, 'blue' | 'purple' | 'yellow' | 'green' | 'cyan' | 'red' | 'gray'> = {
  rh: 'blue',
  tecnologia: 'purple',
  marketing: 'yellow',
  transporte: 'green',
  servicos: 'cyan',
  capex: 'red',
  contingencia: 'gray',
};

const emptyForm: Omit<Expense, 'id'> = {
  category: 'rh',
  description: '',
  amount: 0,
  date: new Date().toISOString().slice(0, 10),
  supplier: '',
  recurring: false,
};

export default function Expenses() {
  const { expenses, addExpense, updateExpense, deleteExpense, settings, addToast } = useERP();
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Expense | null>(null);
  const [form, setForm] = useState<Omit<Expense, 'id'>>(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = expenses.filter(e => {
    const match = e.description.toLowerCase().includes(search.toLowerCase()) ||
      (e.supplier || '').toLowerCase().includes(search.toLowerCase());
    const cat = filterCat === 'all' || e.category === filterCat;
    return match && cat;
  });

  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);

  // Chart data — group by category
  const byCategory = Object.entries(categoryLabel).map(([cat, label]) => ({
    cat: label.split(' ')[0],
    total: expenses.filter(e => e.category === cat).reduce((s, e) => s + e.amount, 0),
    color: categoryColors[cat as ExpenseCategory],
  })).filter(d => d.total > 0);

  function openCreate() {
    setEditTarget(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(exp: Expense) {
    setEditTarget(exp);
    setForm({ ...exp });
    setModalOpen(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editTarget) {
      updateExpense({ ...editTarget, ...form });
    } else {
      addExpense({ id: `exp-${Date.now()}`, ...form });
    }
    setModalOpen(false);
  }

  function handleExportCSV() {
    const headers = ['ID', 'Descricao', 'Categoria', 'Fornecedor', 'Data', 'Montante_AOA', 'Recorrente'];
    const rows = filtered.map(e => [
      e.id,
      `"${e.description}"`,
      categoryLabel[e.category] || e.category,
      `"${e.supplier || ''}"`,
      e.date,
      e.amount,
      e.recurring ? 'Sim' : 'Nao',
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].map(r => r.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CDA_Despesas_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Lista de despesas exportada em CSV com sucesso!', 'success');
  }

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-gray-200 col-span-1">
          <p className="text-xs text-gray-400 font-medium mb-1">Total Despesas</p>
          <p className="text-xl font-bold text-gray-900"><CountUp value={formatAOA(totalExpenses, true)} /></p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-200">
          <p className="text-xs text-gray-400 font-medium mb-1">OPEX Recorrente/mês</p>
          <p className="text-xl font-bold text-blue-600"><CountUp value={formatAOA(settings.opexMonthly, true)} /></p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-200">
          <p className="text-xs text-gray-400 font-medium mb-1">CAPEX Registado</p>
          <p className="text-xl font-bold text-red-600"><CountUp value={formatAOA(expenses.filter(e => e.category === 'capex').reduce((s, e) => s + e.amount, 0), true)} /></p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-200">
          <p className="text-xs text-gray-400 font-medium mb-1">Nº Registos</p>
          <p className="text-xl font-bold text-gray-900"><CountUp value={expenses.length} /></p>
        </div>
      </div>

      {/* Chart */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <CardTitle>Despesas por Categoria</CardTitle>
        </div>
        <div className="h-48">
          <AnimatedChartWrapper className="w-full h-full">
            {({ isAnimationActive, key }) => (
              <ResponsiveContainer width="100%" height="100%" key={key}>
                <BarChart data={byCategory} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                  <XAxis dataKey="cat" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={v => formatAOA(v as number, true)} tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={75} />
                  <Tooltip formatter={(v: unknown) => formatAOA(v as number)} contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', fontSize: 12 }} />
                  <Bar dataKey="total" radius={[6, 6, 0, 0]} isAnimationActive={isAnimationActive} animationDuration={1500}>
                    {byCategory.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </AnimatedChartWrapper>
        </div>
      </Card>

      {/* Table */}
      <Card padding={false}>
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle>Controlo de Despesas</CardTitle>
            <p className="text-xs text-gray-400 mt-0.5">{expenses.length} despesas registadas</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Pesquisar..." className="pl-9 pr-3 py-2 text-xs sm:text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-36 sm:w-44" />
            </div>
            <select value={filterCat} onChange={e => setFilterCat(e.target.value)}
              className="py-2 px-3 text-xs sm:text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">Todas as Categorias</option>
              {Object.entries(categoryLabel).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <button onClick={handleExportCSV} title="Exportar CSV"
              className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-2 rounded-xl transition-colors">
              <Download size={14} />
              <span className="hidden md:inline">Exportar</span>
            </button>
            <button onClick={openCreate}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
              <Plus size={15} />
              <span>Nova Despesa</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {['Descrição', 'Categoria', 'Fornecedor', 'Data', 'Valor', 'Tipo', ''].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(exp => (
                <tr key={exp.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-4 py-3.5">
                    <p className="text-sm font-medium text-gray-900">{exp.description}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge variant={categoryVariant[exp.category]}>{categoryLabel[exp.category]}</Badge>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-gray-500">{exp.supplier || '—'}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-500">{formatDate(exp.date)}</td>
                  <td className="px-4 py-3.5">
                    <span className="text-sm font-bold text-gray-900">{formatAOA(exp.amount, true)}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    {exp.recurring ? (
                      <div className="flex items-center gap-1 text-xs text-blue-600">
                        <RefreshCw size={12} /> Recorrente
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">Pontual</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1">
                      <button onClick={() => openEdit(exp)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                        <Edit2 size={13} />
                      </button>
                      <button onClick={() => setConfirmDelete(exp.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Wallet size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">Nenhuma despesa encontrada.</p>
            </div>
          )}
        </div>
      </Card>

      {/* Form Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editTarget ? 'Editar Despesa' : 'Nova Despesa'} size="md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição *</label>
            <input required value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value as ExpenseCategory }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                {Object.entries(categoryLabel).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Valor (AOA) *</label>
              <input required type="number" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: +e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
              <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fornecedor</label>
              <input value={form.supplier || ''} onChange={e => setForm(f => ({ ...f, supplier: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="recurring" checked={form.recurring} onChange={e => setForm(f => ({ ...f, recurring: e.target.checked }))}
              className="w-4 h-4 rounded text-blue-600" />
            <label htmlFor="recurring" className="text-sm font-medium text-gray-700">Despesa Recorrente Mensal</label>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">Cancelar</button>
            <button type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors">
              {editTarget ? 'Guardar' : 'Adicionar'}
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Eliminar Despesa" size="sm">
        <p className="text-sm text-gray-600 mb-5">Deseja eliminar esta despesa?</p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setConfirmDelete(null)} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl">Cancelar</button>
          <button onClick={() => { if (confirmDelete) { deleteExpense(confirmDelete); setConfirmDelete(null); } }}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-xl">Eliminar</button>
        </div>
      </Modal>
    </div>
  );
}
