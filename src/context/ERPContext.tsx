import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Institution, Invoice, Expense, Employee,
  initialInstitutions, initialInvoices, initialExpenses, initialEmployees,
} from '../data/store';

export interface ERPSettings {
  companyName: string;
  phase: string;
  currency: string;
  opexMonthly: number;
  mrrTrigger: number;
  fxMargin: number;
  contingencyFund: number;
  notifications: boolean;
  autoBackup: boolean;
  twoFactor: boolean;
}

export interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

const defaultSettings: ERPSettings = {
  companyName: 'Correio Digital Angola',
  phase: 'Fase Piloto — INAPEM',
  currency: 'AOA',
  opexMonthly: 3850000,
  mrrTrigger: 12000000,
  fxMargin: 17.5,
  contingencyFund: 5000000,
  notifications: true,
  autoBackup: true,
  twoFactor: false,
};

interface ERPContextType {
  institutions: Institution[];
  invoices: Invoice[];
  expenses: Expense[];
  employees: Employee[];
  settings: ERPSettings;
  toasts: ToastMessage[];
  addToast: (text: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  updateSettings: (newSettings: Partial<ERPSettings>) => void;
  addInstitution: (inst: Institution) => void;
  updateInstitution: (inst: Institution) => void;
  deleteInstitution: (id: string) => void;
  addInvoice: (inv: Invoice) => void;
  updateInvoice: (inv: Invoice) => void;
  deleteInvoice: (id: string) => void;
  addExpense: (exp: Expense) => void;
  updateExpense: (exp: Expense) => void;
  deleteExpense: (id: string) => void;
  addEmployee: (emp: Employee) => void;
  updateEmployee: (emp: Employee) => void;
  deleteEmployee: (id: string) => void;
  resetToDefaults: () => void;
}

const ERPContext = createContext<ERPContextType | null>(null);

function loadStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

export function ERPProvider({ children }: { children: React.ReactNode }) {
  const [institutions, setInstitutions] = useState<Institution[]>(() => loadStorage('cda_institutions', initialInstitutions));
  const [invoices, setInvoices] = useState<Invoice[]>(() => loadStorage('cda_invoices', initialInvoices));
  const [expenses, setExpenses] = useState<Expense[]>(() => loadStorage('cda_expenses', initialExpenses));
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const loaded = loadStorage('cda_employees', initialEmployees);
    return loaded.map(emp => {
      if (emp.name === 'Adilson Ferreira') return { ...emp, name: 'Edlasio Galhardo', email: 'edlasio.galhardo@correidigitalangola.ao' };
      if (emp.name === 'Sofia Monteiro') return { ...emp, name: 'Erminda Calunga', email: 'erminda.calunga@correidigitalangola.ao' };
      return emp;
    });
  });
  const [settings, setSettings] = useState<ERPSettings>(() => loadStorage('cda_settings', defaultSettings));
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    localStorage.setItem('cda_institutions', JSON.stringify(institutions));
  }, [institutions]);

  useEffect(() => {
    localStorage.setItem('cda_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('cda_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('cda_employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('cda_settings', JSON.stringify(settings));
  }, [settings]);

  const addToast = useCallback((text: string, type: ToastMessage['type'] = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    setToasts(p => [...p, { id, text, type }]);
    setTimeout(() => {
      setToasts(p => p.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(p => p.filter(t => t.id !== id));
  }, []);

  const updateSettings = useCallback((newSettings: Partial<ERPSettings>) => {
    setSettings(p => ({ ...p, ...newSettings }));
    addToast('Configurações actualizadas com sucesso', 'success');
  }, [addToast]);

  const addInstitution = useCallback((inst: Institution) => {
    setInstitutions(p => [inst, ...p]);
    addToast(`Instituição "${inst.name}" adicionada`, 'success');
  }, [addToast]);

  const updateInstitution = useCallback((inst: Institution) => {
    setInstitutions(p => p.map(i => i.id === inst.id ? inst : i));
    addToast(`Instituição "${inst.name}" actualizada`, 'info');
  }, [addToast]);

  const deleteInstitution = useCallback((id: string) => {
    setInstitutions(p => {
      const found = p.find(i => i.id === id);
      if (found) addToast(`Instituição "${found.name}" eliminada`, 'warning');
      return p.filter(i => i.id !== id);
    });
  }, [addToast]);

  const addInvoice = useCallback((inv: Invoice) => {
    setInvoices(p => [inv, ...p]);
    addToast(`Factura ${inv.id} criada`, 'success');
  }, [addToast]);

  const updateInvoice = useCallback((inv: Invoice) => {
    setInvoices(p => p.map(i => i.id === inv.id ? inv : i));
    addToast(`Factura ${inv.id} actualizada`, 'info');
  }, [addToast]);

  const deleteInvoice = useCallback((id: string) => {
    setInvoices(p => {
      addToast(`Factura ${id} eliminada`, 'warning');
      return p.filter(i => i.id !== id);
    });
  }, [addToast]);

  const addExpense = useCallback((exp: Expense) => {
    setExpenses(p => [exp, ...p]);
    addToast('Nova despesa registada', 'success');
  }, [addToast]);

  const updateExpense = useCallback((exp: Expense) => {
    setExpenses(p => p.map(e => e.id === exp.id ? exp : e));
    addToast('Despesa actualizada', 'info');
  }, [addToast]);

  const deleteExpense = useCallback((id: string) => {
    setExpenses(p => {
      addToast('Despesa eliminada', 'warning');
      return p.filter(e => e.id !== id);
    });
  }, [addToast]);

  const addEmployee = useCallback((emp: Employee) => {
    setEmployees(p => [emp, ...p]);
    addToast(`Colaborador ${emp.name} adicionado`, 'success');
  }, [addToast]);

  const updateEmployee = useCallback((emp: Employee) => {
    setEmployees(p => p.map(e => e.id === emp.id ? emp : e));
    addToast(`Dados de ${emp.name} actualizados`, 'info');
  }, [addToast]);

  const deleteEmployee = useCallback((id: string) => {
    setEmployees(p => {
      const found = p.find(e => e.id === id);
      if (found) addToast(`Colaborador ${found.name} removido`, 'warning');
      return p.filter(e => e.id !== id);
    });
  }, [addToast]);

  const resetToDefaults = useCallback(() => {
    setInstitutions(initialInstitutions);
    setInvoices(initialInvoices);
    setExpenses(initialExpenses);
    setEmployees(initialEmployees);
    setSettings(defaultSettings);
    localStorage.removeItem('cda_institutions');
    localStorage.removeItem('cda_invoices');
    localStorage.removeItem('cda_expenses');
    localStorage.removeItem('cda_employees');
    localStorage.removeItem('cda_settings');
    addToast('Dados restaurados para as configurações originais do sistema', 'info');
  }, [addToast]);

  return (
    <ERPContext.Provider value={{
      institutions, invoices, expenses, employees, settings, toasts,
      addToast, removeToast, updateSettings,
      addInstitution, updateInstitution, deleteInstitution,
      addInvoice, updateInvoice, deleteInvoice,
      addExpense, updateExpense, deleteExpense,
      addEmployee, updateEmployee, deleteEmployee,
      resetToDefaults,
    }}>
      {children}
    </ERPContext.Provider>
  );
}

export function useERP() {
  const ctx = useContext(ERPContext);
  if (!ctx) throw new Error('useERP must be used within ERPProvider');
  return ctx;
}

