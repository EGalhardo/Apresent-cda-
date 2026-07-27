import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Building2, Phone, Mail, Search, Filter, Download } from 'lucide-react';
import { useERP } from '../context/ERPContext';
import { Institution, InstitutionStatus } from '../data/store';
import { formatAOA, formatDate } from '../utils/format';
import Card, { CardHeader, CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';

const statusLabel: Record<InstitutionStatus, string> = {
  prospect: 'Prospecto',
  negotiation: 'Negociação',
  active: 'Activo',
  inactive: 'Inactivo',
};

const statusVariant: Record<InstitutionStatus, 'gray' | 'yellow' | 'green' | 'red'> = {
  prospect: 'gray',
  negotiation: 'yellow',
  active: 'green',
  inactive: 'red',
};

const emptyForm: Omit<Institution, 'id'> = {
  name: '',
  segment: 'Adm. Pública Central',
  contact: '',
  email: '',
  phone: '',
  status: 'prospect',
  mrr: 750000,
  implementationFee: 10000000,
  licenseType: 'mensal',
  joinDate: '',
  services: [],
  notes: '',
};

export default function Institutions() {
  const { institutions, addInstitution, updateInstitution, deleteInstitution, addToast } = useERP();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Institution | null>(null);
  const [form, setForm] = useState<Omit<Institution, 'id'>>(emptyForm);
  const [servicesInput, setServicesInput] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = institutions.filter(i => {
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.contact.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || i.status === filterStatus;
    return matchSearch && matchStatus;
  });

  function openCreate() {
    setEditTarget(null);
    setForm(emptyForm);
    setServicesInput('');
    setModalOpen(true);
  }

  function openEdit(inst: Institution) {
    setEditTarget(inst);
    setForm({ ...inst });
    setServicesInput(inst.services.join(', '));
    setModalOpen(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const services = servicesInput.split(',').map(s => s.trim()).filter(Boolean);
    if (editTarget) {
      updateInstitution({ ...editTarget, ...form, services });
    } else {
      addInstitution({ id: `inst-${Date.now()}`, ...form, services });
    }
    setModalOpen(false);
  }

  function handleDelete(id: string) {
    deleteInstitution(id);
    setConfirmDelete(null);
  }

  function handleExportCSV() {
    const headers = ['ID', 'Nome', 'Segmento', 'Contacto', 'Email', 'Telefone', 'Estado', 'MRR_AOA', 'Taxa_Impl_AOA', 'Adesao'];
    const rows = filtered.map(i => [
      i.id,
      `"${i.name}"`,
      `"${i.segment}"`,
      `"${i.contact}"`,
      `"${i.email}"`,
      `"${i.phone}"`,
      statusLabel[i.status],
      i.mrr,
      i.implementationFee,
      i.joinDate,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].map(r => r.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CDA_Instituicoes_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Lista de instituições exportada em CSV com sucesso!', 'success');
  }

  const totalMRR = institutions.filter(i => i.status === 'active').reduce((s, i) => s + i.mrr, 0);

  return (
    <div className="space-y-5">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(['prospect', 'negotiation', 'active', 'inactive'] as InstitutionStatus[]).map(s => (
          <div key={s} className="bg-white rounded-2xl p-4 border border-gray-200">
            <p className="text-xs text-gray-500 font-medium mb-1">{statusLabel[s]}</p>
            <p className="text-2xl font-bold text-gray-900">{institutions.filter(i => i.status === s).length}</p>
            <Badge variant={statusVariant[s]} size="sm">{statusLabel[s]}</Badge>
          </div>
        ))}
      </div>

      {/* Table */}
      <Card padding={false}>
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle>Pipeline Institucional</CardTitle>
              <p className="text-xs text-gray-400 mt-0.5">MRR Total Activo: {formatAOA(totalMRR, true)}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Pesquisar..."
                  className="pl-9 pr-3 py-2 text-xs sm:text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-36 sm:w-44"
                />
              </div>
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="py-2 px-3 text-xs sm:text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todos os Estados</option>
                <option value="prospect">Prospecto</option>
                <option value="negotiation">Negociação</option>
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </select>
              <button
                onClick={handleExportCSV}
                title="Exportar CSV"
                className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
              >
                <Download size={14} />
                <span className="hidden md:inline">Exportar</span>
              </button>
              <button
                onClick={openCreate}
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
              >
                <Plus size={15} />
                <span>Nova Instituição</span>
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">Instituição</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3">Segmento</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3">Estado</th>
                <th className="text-right text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3">MRR</th>
                <th className="text-right text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3">Taxa Impl.</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3">Adesão</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(inst => (
                <tr key={inst.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Building2 size={16} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{inst.name}</p>
                        <p className="text-xs text-gray-400">{inst.contact}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-lg">{inst.segment}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge variant={statusVariant[inst.status]}>{statusLabel[inst.status]}</Badge>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <span className="text-sm font-semibold text-gray-900">{formatAOA(inst.mrr, true)}</span>
                    <span className="text-xs text-gray-400 block">{inst.licenseType}</span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <span className="text-sm font-medium text-gray-700">{formatAOA(inst.implementationFee, true)}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-sm text-gray-500">{formatDate(inst.joinDate)}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5 justify-end">
                      <button onClick={() => openEdit(inst)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => setConfirmDelete(inst.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Building2 size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">Nenhuma instituição encontrada.</p>
            </div>
          )}
        </div>
      </Card>

      {/* Form Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editTarget ? 'Editar Instituição' : 'Nova Instituição'} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Instituição *</label>
              <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Segmento</label>
              <select value={form.segment} onChange={e => setForm(f => ({ ...f, segment: e.target.value as Institution['segment'] }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Adm. Pública Central</option>
                <option>Adm. Local</option>
                <option>Empresa Pública</option>
                <option>Inst. Financeira</option>
                <option>Privada</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as InstitutionStatus }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="prospect">Prospecto</option>
                <option value="negotiation">Em Negociação</option>
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contacto</label>
              <input value={form.contact} onChange={e => setForm(f => ({ ...f, contact: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
              <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">MRR (AOA)</label>
              <input type="number" value={form.mrr} onChange={e => setForm(f => ({ ...f, mrr: +e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Taxa de Implementação (AOA)</label>
              <input type="number" value={form.implementationFee} onChange={e => setForm(f => ({ ...f, implementationFee: +e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Licença</label>
              <select value={form.licenseType} onChange={e => setForm(f => ({ ...f, licenseType: e.target.value as Institution['licenseType'] }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="mensal">Mensal</option>
                <option value="trimestral">Trimestral</option>
                <option value="semestral">Semestral</option>
                <option value="anual">Anual</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data de Adesão</label>
              <input type="date" value={form.joinDate} onChange={e => setForm(f => ({ ...f, joinDate: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Serviços Contratados (separados por vírgula)</label>
              <input value={servicesInput} onChange={e => setServicesInput(e.target.value)}
                placeholder="Correspondência Digital, Notificações, Assinatura Electrónica"
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
              <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={3}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
              Cancelar
            </button>
            <button type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors">
              {editTarget ? 'Guardar Alterações' : 'Criar Instituição'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Confirm Delete */}
      <Modal isOpen={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Confirmar Eliminação" size="sm">
        <p className="text-sm text-gray-600 mb-5">Tem a certeza que deseja eliminar esta instituição? Esta acção não pode ser revertida.</p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setConfirmDelete(null)}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
            Cancelar
          </button>
          <button onClick={() => confirmDelete && handleDelete(confirmDelete)}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors">
            Eliminar
          </button>
        </div>
      </Modal>
    </div>
  );
}
