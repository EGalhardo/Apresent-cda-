import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Users, Mail, Calendar, TrendingUp, Download } from 'lucide-react';
import { useERP } from '../context/ERPContext';
import { Employee } from '../data/store';
import { formatAOA, formatDate } from '../utils/format';
import Card, { CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';

const deptColors: Record<string, string> = {
  'Direcção': 'bg-blue-100 text-blue-700',
  'Financeiro': 'bg-emerald-100 text-emerald-700',
  'Tecnologia': 'bg-purple-100 text-purple-700',
  'Comercial': 'bg-amber-100 text-amber-700',
};

const emptyForm: Omit<Employee, 'id'> = {
  name: '',
  role: '',
  department: 'Direcção',
  salary: 100000,
  startDate: new Date().toISOString().slice(0, 10),
  status: 'active',
  email: '',
};

export default function Employees() {
  const { employees, addEmployee, updateEmployee, deleteEmployee, addToast } = useERP();
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Employee | null>(null);
  const [form, setForm] = useState<Omit<Employee, 'id'>>(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const totalSalary = employees.filter(e => e.status === 'active').reduce((s, e) => s + e.salary, 0);
  const activeCount = employees.filter(e => e.status === 'active').length;

  function openCreate() {
    setEditTarget(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(emp: Employee) {
    setEditTarget(emp);
    setForm({ ...emp });
    setModalOpen(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editTarget) {
      updateEmployee({ ...editTarget, ...form });
    } else {
      addEmployee({ id: `emp-${Date.now()}`, ...form });
    }
    setModalOpen(false);
  }

  function handleExportCSV() {
    const headers = ['ID', 'Nome', 'Cargo', 'Departamento', 'Email', 'Remuneracao_AOA', 'Estado', 'Data_Inicio'];
    const rows = employees.map(e => [
      e.id,
      `"${e.name}"`,
      `"${e.role}"`,
      `"${e.department}"`,
      `"${e.email}"`,
      e.salary,
      e.status === 'active' ? 'Activo' : 'Inactivo',
      e.startDate,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].map(r => r.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CDA_Colaboradores_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Lista de colaboradores exportada em CSV com sucesso!', 'success');
  }

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-gray-200">
          <p className="text-xs text-gray-400 font-medium mb-1">Colaboradores Activos</p>
          <p className="text-2xl font-bold text-gray-900">{activeCount}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-200">
          <p className="text-xs text-gray-400 font-medium mb-1">Massa Salarial / Mês</p>
          <p className="text-2xl font-bold text-blue-600">{formatAOA(totalSalary, true)}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-200">
          <p className="text-xs text-gray-400 font-medium mb-1">Massa Salarial / Ano</p>
          <p className="text-2xl font-bold text-gray-700">{formatAOA(totalSalary * 12, true)}</p>
        </div>
        <div className="bg-blue-600 rounded-2xl p-4 border border-blue-700">
          <p className="text-xs text-blue-200 font-medium mb-1">Gatilho Salarial</p>
          <p className="text-sm font-bold text-white">Mês 6 — MRR ≥ 12M AOA</p>
        </div>
      </div>

      {/* Salary Trigger Info */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <TrendingUp size={18} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-blue-900">Cláusula de Gatilho Salarial B2G</p>
            <p className="text-sm text-blue-700 mt-1">
              A política remuneratória inicial de <strong>100.000 Kz/mês</strong> por colaborador vigora durante a fase de validação piloto.
              Quando a Receita Mensal Recorrente (MRR) ultrapassar <strong>12.000.000 AOA/mês</strong> (projectado para o Mês 6),
              a tabela salarial será reajustada para valores competitivos do mercado B2G/GovTech.
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { phase: 'Fase 1', label: 'Piloto INAPEM', salary: '100.000 Kz', color: 'bg-blue-100 text-blue-700' },
            { phase: 'Fase 2', label: 'Expansão Provincial', salary: 'Actualização', color: 'bg-purple-100 text-purple-700' },
            { phase: 'Fase 3', label: 'Nacional', salary: 'Mercado', color: 'bg-emerald-100 text-emerald-700' },
            { phase: 'Fase 4', label: 'Internacional', salary: 'Internacional', color: 'bg-amber-100 text-amber-700' },
          ].map(p => (
            <div key={p.phase} className="bg-white rounded-xl p-3 border border-blue-100">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${p.color}`}>{p.phase}</span>
              <p className="text-xs text-gray-700 font-medium mt-1.5">{p.label}</p>
              <p className="text-xs text-gray-500">{p.salary}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cards Grid Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-800">Equipa Fundadora e Operacional</h3>
        <div className="flex items-center gap-2">
          <button onClick={handleExportCSV} title="Exportar CSV"
            className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-2 rounded-xl transition-colors">
            <Download size={14} />
            <span className="hidden sm:inline">Exportar CSV</span>
          </button>
          <button onClick={openCreate}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
            <Plus size={15} />
            <span>Adicionar Colaborador</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {employees.map(emp => (
          <Card key={emp.id}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {emp.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{emp.name}</p>
                  <p className="text-sm text-gray-500">{emp.role}</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-lg mt-1 inline-block ${deptColors[emp.department] || 'bg-gray-100 text-gray-600'}`}>
                    {emp.department}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => openEdit(emp)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                  <Edit2 size={14} />
                </button>
                <button onClick={() => setConfirmDelete(emp.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-white border border-gray-100 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-0.5">Remuneração</p>
                <p className="text-sm font-bold text-gray-900">{formatAOA(emp.salary, true)}/mês</p>
              </div>
              <div className="bg-white border border-gray-100 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-0.5">Estado</p>
                <Badge variant={emp.status === 'active' ? 'green' : 'red'}>
                  {emp.status === 'active' ? 'Activo' : 'Inactivo'}
                </Badge>
              </div>
            </div>

            <div className="mt-3 space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Mail size={12} className="text-gray-400" />
                {emp.email}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar size={12} className="text-gray-400" />
                Início: {formatDate(emp.startDate)}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Form Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editTarget ? 'Editar Colaborador' : 'Novo Colaborador'} size="md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo *</label>
              <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cargo / Função</label>
              <input value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
              <select value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Direcção</option>
                <option>Financeiro</option>
                <option>Tecnologia</option>
                <option>Comercial</option>
                <option>Operações</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Remuneração Mensal (AOA)</label>
              <input type="number" value={form.salary} onChange={e => setForm(f => ({ ...f, salary: +e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as Employee['status'] }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data de Início</label>
              <input type="date" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
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

      <Modal isOpen={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Eliminar Colaborador" size="sm">
        <p className="text-sm text-gray-600 mb-5">Deseja remover este colaborador da equipa?</p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setConfirmDelete(null)} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl">Cancelar</button>
          <button onClick={() => { if (confirmDelete) { deleteEmployee(confirmDelete); setConfirmDelete(null); } }}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-xl">Remover</button>
        </div>
      </Modal>
    </div>
  );
}
