import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed top-20 right-4 sm:right-8 z-50 animate-fadeIn">
      <div className="glass-panel rounded-xl px-4 py-3 bg-[#0d1527]/95 border border-cyan-400/50 shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center gap-3 text-xs font-mono text-white">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span className="leading-tight">{message}</span>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white ml-2 cursor-pointer p-0.5 rounded"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
