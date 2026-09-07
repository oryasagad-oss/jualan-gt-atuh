'use client';

import React from 'react';
import { StoreSettings } from '../../types/account';
import { sounds } from '../../utils/soundEffects';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, X, ExternalLink, CheckCircle2, Lock } from 'lucide-react';

interface RekberGuideModalProps {
  settings: StoreSettings;
  isOpen: boolean;
  onClose: () => void;
}

export const RekberGuideModal: React.FC<RekberGuideModalProps> = ({ settings, isOpen, onClose }) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white dark:bg-gt-card border border-slate-200 dark:border-slate-700 rounded-3xl overflow-hidden shadow-pixel-lg my-6 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {t.rekberModal.title}
            </h3>
          </div>
          <button
            onClick={() => {
              sounds.playClickSound();
              onClose();
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:text-gray-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6 text-sm text-slate-700 dark:text-gray-300">
          
          {/* Middleman Discord Info */}
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-500/30">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <span>{t.rekberModal.boxMmTitle}</span>
            </h4>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-gray-300 mb-3">
              {t.rekberModal.boxMmDesc}
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href={settings.gtidDiscordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{t.rekberModal.btnGtid}</span>
              </a>
              <a
                href={settings.gtmartDiscordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5 shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{t.rekberModal.btnGtmart}</span>
              </a>
            </div>
          </div>

          {/* Flow of Transaction */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{t.rekberModal.flowTitle}</span>
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-blue-600 dark:text-blue-400">{t.rekberModal.flowMmTitle}</span>
                <p className="mt-1 text-slate-600 dark:text-gray-400 leading-relaxed">
                  {t.rekberModal.flowMmDesc}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{t.rekberModal.flowDirectTitle}</span>
                <p className="mt-1 text-slate-600 dark:text-gray-400 leading-relaxed">
                  {t.rekberModal.flowDirectDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Guarantees */}
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/30 text-xs space-y-2">
            <h4 className="font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5 text-sm">
              <Lock className="w-4 h-4" />
              <span>{t.rekberModal.guaranteeTitle}</span>
            </h4>
            <ul className="space-y-1.5 text-slate-700 dark:text-gray-300">
              <li>• {t.rekberModal.g1}</li>
              <li>• {t.rekberModal.g2}</li>
              <li>• {t.rekberModal.g3}</li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex justify-end">
          <button
            onClick={() => {
              sounds.playClickSound();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs font-semibold"
          >
            {t.rekberModal.btnClose}
          </button>
        </div>
      </div>
    </div>
  );
};
