'use client';

import React from 'react';
import { StoreSettings } from '../../types/account';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, CreditCard, Award } from 'lucide-react';

interface TrustBadgesProps {
  settings: StoreSettings;
  onOpenRekberModal?: () => void;
}

export const TrustBadges: React.FC<TrustBadgesProps> = ({ settings, onOpenRekberModal }) => {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        
        {/* Card 1: Rekber / Middleman GTID & GTMART */}
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gradient-to-br dark:from-[#131b2e] dark:to-[#0d1322] border border-blue-200 dark:border-blue-500/30 p-5 shadow-pixel group hover:border-blue-400/60 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl -z-0"></div>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/80 border border-blue-300 dark:border-blue-500/40 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)] shrink-0 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-pixel text-blue-600 dark:text-blue-400">{t.trustBadges.card1Badge}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-500/30">
                  {t.trustBadges.card1Status}
                </span>
              </div>
              
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5 flex items-center gap-1.5">
                {t.trustBadges.card1Title}
              </h3>
              
              <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed mb-3">
                {t.trustBadges.card1Desc}
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-gray-200 border border-slate-200 dark:border-slate-700 flex items-center gap-1">
                  {t.trustBadges.card1Tag1}
                </span>
                <span className="text-[11px] px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-gray-200 border border-slate-200 dark:border-slate-700 flex items-center gap-1">
                  {t.trustBadges.card1Tag2}
                </span>
                <span className="text-[11px] px-2 py-1 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30 flex items-center gap-1">
                  {t.trustBadges.card1Tag3}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Payment Gateway */}
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gradient-to-br dark:from-[#131b2e] dark:to-[#0d1322] border border-amber-200 dark:border-amber-500/30 p-5 shadow-pixel group hover:border-amber-400/60 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl -z-0"></div>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-500/40 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)] shrink-0 group-hover:scale-110 transition-transform">
              <CreditCard className="w-6 h-6" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-pixel text-amber-600 dark:text-amber-400">{t.trustBadges.card2Badge}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 font-semibold border border-amber-200 dark:border-amber-500/30">
                  {t.trustBadges.card2Status}
                </span>
              </div>
              
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5 flex items-center gap-1.5">
                {t.trustBadges.card2Title}
              </h3>
              
              <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed mb-3">
                {t.trustBadges.card2Desc}
              </p>

              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-50 dark:bg-slate-800/90 text-amber-700 dark:text-amber-300 font-mono font-bold border border-amber-200 dark:border-slate-700">QRIS</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800/90 text-cyan-700 dark:text-cyan-300 font-medium border border-slate-200 dark:border-slate-700">GoPay</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800/90 text-blue-700 dark:text-blue-300 font-medium border border-slate-200 dark:border-slate-700">Dana</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800/90 text-purple-700 dark:text-purple-300 font-medium border border-slate-200 dark:border-slate-700">OVO</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800/90 text-blue-700 dark:text-blue-400 font-medium border border-slate-200 dark:border-slate-700">BCA/Mandiri/BRI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Keamanan & Garansi Akun */}
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gradient-to-br dark:from-[#131b2e] dark:to-[#0d1322] border border-emerald-200 dark:border-emerald-500/30 p-5 shadow-pixel group hover:border-emerald-400/60 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl -z-0"></div>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)] shrink-0 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-pixel text-emerald-600 dark:text-emerald-400">{t.trustBadges.card3Badge}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-500/30">
                  {t.trustBadges.card3Status}
                </span>
              </div>
              
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5 flex items-center gap-1.5">
                {t.trustBadges.card3Title}
              </h3>
              
              <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed mb-3">
                {t.trustBadges.card3Desc}
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-gray-200 border border-slate-200 dark:border-slate-700 flex items-center gap-1">
                  {t.trustBadges.card3Tag1}
                </span>
                <span className="text-[11px] px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-gray-200 border border-slate-200 dark:border-slate-700 flex items-center gap-1">
                  {t.trustBadges.card3Tag2}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
