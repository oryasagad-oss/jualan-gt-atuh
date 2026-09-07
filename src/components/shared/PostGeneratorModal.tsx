'use client';

import React, { useState } from 'react';
import { Account, StoreSettings } from '../../types/account';
import { generatePostTemplate } from '../../utils/formatters';
import { sounds } from '../../utils/soundEffects';
import { useLanguage } from '../../context/LanguageContext';
import { Copy, Check, X, FileText, Smartphone, Monitor } from 'lucide-react';

interface PostGeneratorModalProps {
  account: Account | null;
  settings: StoreSettings;
  onClose: () => void;
}

export const PostGeneratorModal: React.FC<PostGeneratorModalProps> = ({
  account,
  settings,
  onClose,
}) => {
  const { t } = useLanguage();
  const [mode, setMode] = useState<'full' | 'short'>('full');
  const [copied, setCopied] = useState(false);

  if (!account) return null;

  const postText = generatePostTemplate(account, settings, mode);

  const handleCopy = () => {
    sounds.playSuccessSound();
    navigator.clipboard.writeText(postText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white dark:bg-gt-card border border-slate-200 dark:border-slate-700 rounded-3xl overflow-hidden shadow-pixel-lg my-6 flex flex-col"
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-500 dark:text-amber-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {t.postGenModal.title}
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

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4">
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-gray-400">{t.postGenModal.selectTemplate}</span>
            
            {/* Mode Switcher */}
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => {
                  sounds.playClickSound();
                  setMode('full');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  mode === 'full' 
                    ? 'bg-amber-500 text-black shadow-pixel-amber' 
                    : 'text-slate-600 hover:text-black dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>{t.postGenModal.templateFull}</span>
              </button>

              <button
                onClick={() => {
                  sounds.playClickSound();
                  setMode('short');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  mode === 'short' 
                    ? 'bg-amber-500 text-black shadow-pixel-amber' 
                    : 'text-slate-600 hover:text-black dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>{t.postGenModal.templateShort}</span>
              </button>
            </div>
          </div>

          {/* Textarea with generated text */}
          <div className="relative">
            <textarea
              readOnly
              value={postText}
              rows={12}
              className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-mono text-slate-900 dark:text-gray-200 leading-relaxed focus:outline-none select-all"
            />
          </div>

          <p className="text-[11px] text-slate-500 dark:text-gray-400">
            💡 {t.postGenModal.hint}
          </p>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              sounds.playClickSound();
              onClose();
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-gray-300 text-xs font-semibold"
          >
            {t.postGenModal.btnClose}
          </button>

          <button
            onClick={handleCopy}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-pixel-amber transition-all active:translate-y-0.5"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-950" />
                <span>{t.postGenModal.btnCopied}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>{t.postGenModal.btnCopy}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
