import React, { useEffect, useRef } from 'react';
import { ShieldAlert, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RestrictionModal: React.FC = () => {
  const { restrictionModalOpen, closeRestrictionNotice } = useApp();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (restrictionModalOpen) {
      closeBtnRef.current?.focus();
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closeRestrictionNotice();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [restrictionModalOpen, closeRestrictionNotice]);

  if (!restrictionModalOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-[2px] animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="restriction-dialog-title"
    >
      <div 
        ref={dialogRef}
        className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-[#D6DEE7] p-6 overflow-hidden"
      >
        <div className="flex items-start justify-between pb-4 border-b border-[#D6DEE7]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#F4F7FA] text-[#14263A] border border-[#D6DEE7]">
              <ShieldAlert className="w-5 h-5 text-[#087F79]" />
            </div>
            <div>
              <h3 id="restriction-dialog-title" className="text-base font-semibold text-[#172638]">
                System Policy Notice
              </h3>
              <p className="text-xs text-[#526174]">Administrative Security Protocol</p>
            </div>
          </div>
          <button
            ref={closeBtnRef}
            onClick={closeRestrictionNotice}
            className="p-1 rounded-md text-[#526174] hover:text-[#172638] hover:bg-[#F4F7FA] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-6">
          <p className="text-sm font-medium text-[#172638] leading-relaxed bg-[#F4F7FA] p-4 rounded-lg border border-[#D6DEE7]">
            This function is under restriction. Maybe you can use it later.
          </p>
          <p className="mt-3 text-xs text-[#526174] leading-normal">
            In accordance with digital land records compliance standards, credential alterations and self-service recoveries are restricted on this terminal.
          </p>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={closeRestrictionNotice}
            className="px-4 py-2 text-sm font-medium text-white bg-[#14263A] hover:bg-[#1E3752] rounded-lg transition-colors focus:ring-2 focus:ring-[#087F79] focus:outline-none"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};
