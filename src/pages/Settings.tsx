import React, { useState, useEffect } from 'react';
import { Save, Building2, DollarSign, Shield, Database, RotateCcw } from 'lucide-react';
import Card, { CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { formatAOA } from '../utils/format';
import { useERP } from '../context/ERPContext';

export default function Settings() {
  const { settings: globalSettings, updateSettings, resetToDefaults } = useERP();
  const [saved, setSaved] = useState(false);
  const [formState, setFormState] = useState(globalSettings);

  useEffect(() => {
    setFormState(globalSettings);
  }, [globalSettings]);

  function handleSave() {
    updateSettings(formState);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Company */}
      <Card>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <Building2 size={18} className="text-blue-600" />
          </div>
          <CardTitle>Informações da Empresa</CardTitle>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Empresa</label>
            <input value={formState.companyName} onChange={e => setFormState(s => ({ ...s, companyName: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fase Actual</label>
            <input value={formState.phase} onChange={e => setFormState(s => ({ ...s, phase: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </Card>

      {/* Financial Parameters */}
      <Card>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
            <DollarSign size={18} className="text-emerald-600" />
          </div>
          <CardTitle>Parâmetros Financeiros</CardTitle>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">OPEX Mensal (AOA)</label>
            <input type="number" value={formState.opexMonthly} onChange={e => setFormState(s => ({ ...s, opexMonthly: +e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <p className="text-xs text-gray-400 mt-1">Actual: {formatAOA(formState.opexMonthly, true)}/mês</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gatilho Salarial — MRR (AOA)</label>
            <input type="number" value={formState.mrrTrigger} onChange={e => setFormState(s => ({ ...s, mrrTrigger: +e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <p className="text-xs text-gray-400 mt-1">Actual: {formatAOA(formState.mrrTrigger, true)}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Margem Cambial AOA/USD (%)</label>
            <div className="relative">
              <input type="number" step="0.5" value={formState.fxMargin} onChange={e => setFormState(s => ({ ...s, fxMargin: +e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Protecção contra volatilidade cambial (15%–20%)</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reserva de Contingência (AOA)</label>
            <input type="number" value={formState.contingencyFund} onChange={e => setFormState(s => ({ ...s, contingencyFund: +e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <p className="text-xs text-gray-400 mt-1">Actual: {formatAOA(formState.contingencyFund, true)}</p>
          </div>
        </div>
      </Card>

      {/* Security */}
      <Card>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
            <Shield size={18} className="text-red-600" />
          </div>
          <CardTitle>Segurança e Acesso</CardTitle>
        </div>
        <div className="space-y-4">
          {[
            { key: 'twoFactor', label: 'Autenticação de Dois Factores (2FA)', desc: 'Requer código adicional no login', badge: 'Recomendado' },
            { key: 'notifications', label: 'Notificações de Segurança', desc: 'Alertas em tempo real sobre actividade suspeita', badge: null },
            { key: 'autoBackup', label: 'Backup Automático', desc: 'Cópia de segurança diária dos dados financeiros', badge: 'Activo' },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-white border border-gray-100 hover:bg-blue-50/30 transition-colors">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-800">{item.label}</p>
                  {item.badge && <Badge variant="green" size="sm">{item.badge}</Badge>}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
              </div>
              <button
                type="button"
                onClick={() => setFormState(s => ({ ...s, [item.key]: !s[item.key as keyof typeof s] }))}
                className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${
                  formState[item.key as keyof typeof formState] ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  formState[item.key as keyof typeof formState] ? 'translate-x-7' : 'translate-x-1'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* System Info */}
      <Card>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
            <Database size={18} className="text-purple-600" />
          </div>
          <CardTitle>Informações do Sistema</CardTitle>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          {[
            { label: 'Versão ERP', value: 'v1.0.0 — Fase Piloto' },
            { label: 'Modelo', value: 'GovTech / B2G / B2B' },
            { label: 'Infraestrutura', value: 'Vercel Pro + Supabase Pro' },
            { label: 'Segurança', value: 'SSL + MFA + Encriptação' },
            { label: 'Capital Inicial', value: formatAOA(34590000, true) },
            { label: 'OPEX Anual', value: formatAOA(formState.opexMonthly * 12, true) },
            { label: 'Receita Projectada', value: formatAOA(178000000, true) },
            { label: 'Margem Operacional', value: formatAOA(131800000, true) },
          ].map(item => (
            <div key={item.label} className="bg-white border border-gray-100 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
              <p className="font-semibold text-gray-800 text-xs sm:text-sm">{item.value}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-3">
          <button onClick={handleSave}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-xl transition-colors text-sm">
            <Save size={16} />
            Guardar Configurações
          </button>
          {saved && (
            <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium bg-emerald-50 px-3 py-2 rounded-xl">
              <span>✓</span> Configurações guardadas!
            </div>
          )}
        </div>

        <button
          onClick={() => {
            if (confirm('Tem a certeza de que deseja restaurar os dados para as definições de fábrica?')) {
              resetToDefaults();
            }
          }}
          className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-red-600 hover:bg-red-50 px-4 py-2.5 rounded-xl transition-colors border border-gray-200"
        >
          <RotateCcw size={14} />
          Restaurar Dados Originais
        </button>
      </div>
    </div>
  );
}

