import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Receipt, Search, CheckCircle2, Clock, AlertCircle, XCircle, Download } from 'lucide-react';
import { useERP } from '../context/ERPContext';
import { Invoice, InvoiceStatus } from '../data/store';
import { formatAOA, formatDate } from '../utils/format';
import Card, { CardHeader, CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';

const statusLabel: Record<InvoiceStatus, string> = {
  pending: 'Pendente',
  paid: 'Pago',
  overdue: 'Vencido',
  cancelled: 'Cancelado',
};

const statusVariant: Record<InvoiceStatus, 'yellow' | 'green' | 'red' | 'gray'> = {
  pending: 'yellow',
  paid: 'green',
  overdue: 'red',
  cancelled: 'gray',
};

const statusIcon: Record<InvoiceStatus, React.ElementType> = {
  paid: CheckCircle2,
  pending: Clock,
  overdue: AlertCircle,
  cancelled: XCircle,
};

const typeLabel: Record<string, string> = {
  implementacao: 'Implementação',
  licenca: 'Licença',
  saas: 'SaaS',
  integracao: 'Integração',
  ia: 'Inteligência Artificial',
  assinatura: 'Assinatura Digital',
};

const emptyForm: Omit<Invoice, 'id'> = {
  institutionId: '',
  institutionName: '',
  amount: 0,
  type: 'saas',
  status: 'pending',
  issueDate: new Date().toISOString().slice(0, 10),
  dueDate: '',
  description: '',
};

export default function Invoices() {
  const { invoices, institutions, addInvoice, updateInvoice, deleteInvoice, addToast } = useERP();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Invoice | null>(null);
  const [form, setForm] = useState<Omit<Invoice, 'id'>>(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = invoices.filter(i => {
    const match = i.institutionName.toLowerCase().includes(search.toLowerCase()) || i.id.toLowerCase().includes(search.toLowerCase());
    const status = filterStatus === 'all' || i.status === filterStatus;
    return match && status;
  });

  const paid = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0);
  const pending = invoices.filter(i => i.status === 'pending').reduce((s, i) => s + i.amount, 0);
  const overdue = invoices.filter(i => i.status === 'overdue').reduce((s, i) => s + i.amount, 0);

  function openCreate() {
    setEditTarget(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(inv: Invoice) {
    setEditTarget(inv);
    setForm({ ...inv });
    setModalOpen(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const inst = institutions.find(i => i.id === form.institutionId);
    const data = { ...form, institutionName: inst?.name || form.institutionName };
    if (editTarget) {
      updateInvoice({ ...editTarget, ...data });
    } else {
      const nextId = `INV-${new Date().getFullYear()}-${String(invoices.length + 1).padStart(3, '0')}`;
      addInvoice({ id: nextId, ...data });
    }
    setModalOpen(false);
  }

  function handleExportCSV() {
    const headers = ['ID', 'Instituicao', 'Tipo', 'Montante_AOA', 'Emissao', 'Vencimento', 'Estado', 'Descricao'];
    const rows = filtered.map(i => [
      i.id,
      `"${i.institutionName}"`,
      typeLabel[i.type] || i.type,
      i.amount,
      i.issueDate,
      i.dueDate,
      statusLabel[i.status],
      `"${i.description || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CDA_Facturas_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Lista de facturas exportada em CSV com sucesso!', 'success');
  }

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <CheckCircle2 size={18} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Receitas Pagas</p>
              <p className="text-xl font-bold text-gray-900">{formatAOA(paid, true)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <Clock size={18} className="text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Pendentes</p>
              <p className="text-xl font-bold text-gray-900">{formatAOA(pending, true)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <AlertCircle size={18} className="text-red-600" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Vencidas</p>
              <p className="text-xl font-bold text-gray-900">{formatAOA(overdue, true)}</p>
            </div>
          </div>
        </div>
      </div>

      <Card padding={false}>
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle>Facturação & Contratos</CardTitle>
            <p className="text-xs text-gray-400 mt-0.5">{invoices.length} facturas registadas</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Pesquisar..." className="pl-9 pr-3 py-2 text-xs sm:text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-36 sm:w-44" />
            </div>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
              className="py-2 px-3 text-xs sm:text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">Todos os Estados</option>
              <option value="paid">Pagos</option>
              <option value="pending">Pendentes</option>
              <option value="overdue">Vencidos</option>
              <option value="cancelled">Cancelados</option>
            </select>
            <button onClick={handleExportCSV} title="Exportar CSV"
              className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-2 rounded-xl transition-colors">
              <Download size={14} />
              <span className="hidden md:inline">Exportar</span>
            </button>
            <button onClick={openCreate}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
              <Plus size={15} />
              <span>Nova Factura</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {['Nº Factura', 'Instituição', 'Tipo', 'Montante', 'Emissão', 'Vencimento', 'Estado', ''].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(inv => {
                const Icon = statusIcon[inv.status];
                return (
                  <tr key={inv.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-4 py-3.5">
                      <span className="text-sm font-mono font-semibold text-gray-700">{inv.id}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-sm font-medium text-gray-900">{inv.institutionName}</span>
                      <p className="text-xs text-gray-400 truncate max-w-[160px]">{inv.description}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-lg font-medium">{typeLabel[inv.type]}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-sm font-bold text-gray-900">{formatAOA(inv.amount, true)}</span>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-gray-500">{formatDate(inv.issueDate)}</td>
                    <td className="px-4 py-3.5 text-sm text-gray-500">{formatDate(inv.dueDate)}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <Icon size={13} className={
                          inv.status === 'paid' ? 'text-emerald-500' :
                          inv.status === 'pending' ? 'text-amber-500' :
                          inv.status === 'overdue' ? 'text-red-500' : 'text-gray-400'
                        } />
                        <Badge variant={statusVariant[inv.status]}>{statusLabel[inv.status]}</Badge>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1">
                        <button onClick={() => openEdit(inv)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                          <Edit2 size={13} />
                        </button>
                        <button onClick={() => setConfirmDelete(inv.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Receipt size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">Nenhuma factura encontrada.</p>
            </div>
          )}
        </div>
      </Card>

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editTarget ? 'Editar Factura' : 'Nova Factura'} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instituição *</label>
              <select required value={form.institutionId} onChange={e => setForm(f => ({ ...f, institutionId: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">— Seleccionar —</option>
                {institutions.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
              <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as Invoice['type'] }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="implementacao">Taxa de Implementação</option>
                <option value="licenca">Licença</option>
                <option value="saas">SaaS Mensal</option>
                <option value="integracao">Integração Tecnológica</option>
                <option value="ia">Inteligência Artificial</option>
                <option value="assinatura">Assinatura Digital</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Montante (AOA) *</label>
              <input required type="number" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: +e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as InvoiceStatus }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="pending">Pendente</option>
                <option value="paid">Pago</option>
                <option value="overdue">Vencido</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data de Emissão</label>
              <input type="date" value={form.issueDate} onChange={e => setForm(f => ({ ...f, issueDate: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data de Vencimento</label>
              <input type="date" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            {form.status === 'paid' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data de Pagamento</label>
                <input type="date" value={form.paidDate || ''} onChange={e => setForm(f => ({ ...f, paidDate: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            )}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">Cancelar</button>
            <button type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors">
              {editTarget ? 'Guardar' : 'Criar Factura'}
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Confirmar Eliminação" size="sm">
        <p className="text-sm text-gray-600 mb-5">Deseja eliminar esta factura?</p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setConfirmDelete(null)} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl">Cancelar</button>
          <button onClick={() => { if (confirmDelete) { deleteInvoice(confirmDelete); setConfirmDelete(null); } }}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-xl">Eliminar</button>
        </div>
      </Modal>
    </div>
  );
}
