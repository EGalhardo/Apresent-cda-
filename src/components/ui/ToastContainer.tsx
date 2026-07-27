import React from 'react';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';
import { useERP } from '../../context/ERPContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useERP();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[99999] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        const Icon =
          toast.type === 'success' ? CheckCircle2 :
          toast.type === 'warning' ? AlertTriangle :
          toast.type === 'error' ? XCircle : Info;

        const bgColor =
          toast.type === 'success' ? 'bg-emerald-900/90 border-emerald-700 text-emerald-100' :
          toast.type === 'warning' ? 'bg-amber-900/90 border-amber-700 text-amber-100' :
          toast.type === 'error' ? 'bg-red-900/90 border-red-700 text-red-100' :
          'bg-slate-900/90 border-slate-700 text-slate-100';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl border backdrop-blur-md text-xs font-medium transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 ${bgColor}`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Icon size={16} className="flex-shrink-0" />
              <span className="truncate">{toast.text}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
            >
              <X size={13} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
