'use client';

import React from 'react';
import Link from 'next/link';
import { StoreSettings } from '../../types/account';
import { ShieldCheck, ExternalLink, Lock } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';
import { useLanguage } from '../../context/LanguageContext';
import { openDiscord, generateDiscordProfileUrl } from '../../utils/formatters';

interface FooterProps {
  settings: StoreSettings;
  onOpenRekberGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onOpenRekberGuide }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-100 dark:bg-gt-darker border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-gray-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-bold text-sm shadow-pixel-amber">
                💎
              </div>
              <span className="font-pixelHeading text-slate-900 dark:text-white font-bold tracking-wider text-base">
                WICSTORE
              </span>
              <span className="text-[10px] font-pixel text-amber-600 dark:text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30">
                LEGACY
              </span>
            </div>
            <p className="text-slate-600 dark:text-gray-400 text-xs leading-relaxed max-w-md">
              {t.footer.bio}
            </p>
            <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-gray-400">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400"></span>
                {t.footer.adminStatusPrefix} {settings.adminStatus}
              </span>
              <span>•</span>
              <span>{t.footer.discordIdPrefix} <strong className="text-slate-800 dark:text-gray-200">{settings.discordId}</strong></span>
            </div>
          </div>

          {/* Col 2: Navigation & Safety */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs mb-3 font-pixel">
              {t.footer.secTitle}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    sounds.playClickSound();
                    onOpenRekberGuide();
                  }}
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center gap-1.5 text-left"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>{t.footer.secRekberGuide}</span>
                </button>
              </li>
              <li>
                <span className="text-slate-600 dark:text-gray-400 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{t.footer.secCleanGuarantee}</span>
                </span>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center gap-1.5 text-slate-500 dark:text-gray-400"
                >
                  <span>{t.footer.secAdminPortal}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Discord Contacts */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs mb-3 font-pixel">
              {t.footer.contactTitle}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={generateDiscordProfileUrl(settings)}
                  onClick={(e) => {
                    e.preventDefault();
                    sounds.playCoinSound();
                    openDiscord(settings);
                  }}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline transition-colors flex items-center gap-1.5 font-medium cursor-pointer"
                  title={`Server Discord: ${settings.storeName}`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{t.footer.contactDiscordProfile} (@{settings.discordUsername})</span>
                </a>
              </li>
              <li>
                <a
                  href={settings.gtidDiscordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-gray-200 transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{t.footer.contactGtid}</span>
                </a>
              </li>
              <li>
                <a
                  href={settings.gtmartDiscordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-gray-200 transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>GTMART Discord</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 dark:text-gray-400">
          <p>
            {t.footer.disclaimer}
          </p>
          <div className="flex items-center gap-1 shrink-0 font-medium">
            <span>{t.footer.builtWith}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
