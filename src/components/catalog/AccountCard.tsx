'use client';

import React, { useState } from 'react';
import { Account, StoreSettings } from '../../types/account';
import { formatRupiah, formatLocks, openDiscord, generateDiscordProfileUrl } from '../../utils/formatters';
import { sounds } from '../../utils/soundEffects';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, ChevronLeft, ChevronRight, CheckCircle2, Eye, Star } from 'lucide-react';

import { getAccountCategories } from './CatalogSection';

interface AccountCardProps {
  account: Account;
  settings: StoreSettings;
  onSelectDetail: (account: Account) => void;
  onQuickShare: (account: Account) => void;
}

export const AccountCard: React.FC<AccountCardProps> = ({
  account,
  settings,
  onSelectDetail,
  onQuickShare,
}) => {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const lockInfo = formatLocks(account.priceIdr, settings.dlRateIdr);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playClickSound();
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : account.images.length - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playClickSound();
    setCurrentImageIndex((prev) => (prev < account.images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div 
      className={`group relative rounded-2xl bg-white dark:bg-gt-card border transition-all duration-300 flex flex-col overflow-hidden shadow-pixel hover:-translate-y-1 hover:shadow-pixel-lg ${
        account.isAvailable
          ? 'border-amber-300 dark:border-amber-500/40 hover:border-amber-500 dark:hover:border-amber-400' 
          : 'border-rose-300 dark:border-rose-900/40 opacity-80'
      }`}
    >
      {/* Top Image Preview Container */}
      <div 
        onClick={() => {
          sounds.playPopupSound();
          onSelectDetail(account);
        }}
        className="relative w-full h-48 sm:h-52 bg-slate-950 cursor-pointer overflow-hidden select-none"
      >
        {account.images.length > 0 ? (
          <img
            src={account.images[currentImageIndex] || account.images[0]}
            alt={account.title}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${!account.isAvailable ? 'grayscale contrast-125' : ''}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-900 text-gray-500 font-pixel text-xs">
            NO SCREENSHOT
          </div>
        )}

        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Multi-screenshot navigation dots & arrows */}
        {account.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              title="Previous screenshot"
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              title="Next screenshot"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Thumbnail dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-sm">
              {account.images.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    idx === currentImageIndex ? 'bg-amber-400 w-3' : 'bg-gray-400/70'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Top Badges (Login Type: Pure Legacy & Availability) */}
        <div className="absolute top-3 inset-x-3 flex items-start justify-between gap-2 z-10">
          
          {/* Prominent Log Legacy Badge */}
          <span className="px-2.5 py-1 text-xs font-pixel font-bold bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-black border border-amber-200 rounded shadow-pixel-amber flex items-center gap-1">
            <span>👑</span>
            <span>{t.card.badgeLegacy}</span>
          </span>

          {/* Availability Badge */}
          {account.isAvailable ? (
            <span className="px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase bg-emerald-950/90 text-emerald-300 border border-emerald-500/60 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.35)] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              {t.card.statusAvailable}
            </span>
          ) : (
            <span className="px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase bg-rose-950/95 text-rose-300 border border-rose-600/80 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              {t.card.statusSoldOut}
            </span>
          )}

        </div>

        {/* Account Code & Days Age overlay */}
        <div className="absolute bottom-2 left-3 z-10 flex items-center gap-2">
          <span className="text-[11px] font-mono font-bold bg-slate-900/90 text-amber-300 px-2 py-0.5 rounded border border-slate-700">
            #{account.id}
          </span>
          <span className="text-[11px] bg-slate-900/90 text-amber-200 font-medium px-2 py-0.5 rounded border border-slate-700">
            ⏳ {account.accountDays || (account.accountYear ? `${account.accountYear}` : '3k Days')}
          </span>
        </div>

      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Account Title */}
          <h3 
            onClick={() => {
              sounds.playPopupSound();
              onSelectDetail(account);
            }}
            className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors cursor-pointer line-clamp-2 mb-2.5 leading-snug"
          >
            {account.title}
          </h3>

          {/* Key Specs Pills */}
          <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
            <div className="bg-slate-50 dark:bg-slate-900/90 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-slate-500 dark:text-gray-400">{t.card.levelPrefix}</span>
              <span className="text-amber-600 dark:text-amber-400 font-pixel text-[11px]">Lv. {account.level}</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/90 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-slate-500 dark:text-gray-400">{t.card.categoryPrefix}</span>
              <span className="text-cyan-700 dark:text-cyan-300 font-medium truncate ml-1 text-[11px]" title={getAccountCategories(account).join(', ')}>
                {getAccountCategories(account).join(' • ')}
              </span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/90 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-slate-500 dark:text-gray-400">{t.card.growIdPrefix}</span>
              <span className="text-slate-800 dark:text-gray-200 font-mono text-[11px] truncate ml-1">{account.growIdFormat}</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/90 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-slate-500 dark:text-gray-400">{t.card.emailPrefix}</span>
              <span className="text-emerald-600 dark:text-emerald-400 text-[11px] font-medium truncate ml-1">{account.emailStatus}</span>
            </div>
          </div>

          {/* Quest & Untradeable Item Highlights (Only if items exist) */}
          {account.questItems && account.questItems.length > 0 && (
            <div className="mb-4">
              <div className="text-[11px] text-slate-500 dark:text-gray-400 font-semibold mb-1 flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-500 dark:text-amber-400" />
                <span>{t.card.specialItems}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {account.questItems.slice(0, 3).map((item, idx) => (
                  <span 
                    key={idx}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-gray-300 border border-slate-200 dark:border-slate-800 flex items-center gap-1"
                  >
                    <span className="w-1 h-1 rounded-full bg-amber-500 dark:bg-amber-400"></span>
                    {item}
                  </span>
                ))}
                {account.questItems.length > 3 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-amber-600 dark:text-amber-400 font-mono">
                    +{account.questItems.length - 3} {t.card.moreItems}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Pricing & Footer Actions */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80">
          
          {/* Dual Price: Rupiah & Diamond Locks */}
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <div className="text-xs text-slate-500 dark:text-gray-400">{t.card.priceLabel}</div>
              <div className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white font-mono">
                {formatRupiah(account.priceIdr)}
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 dark:text-gray-400">{t.card.equivalentLabel}</span>
              <div className="text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400 font-pixel tracking-tight">
                {lockInfo.text}
              </div>
            </div>
          </div>

          {/* Mini Trust Footer on Card */}
          <div className="flex items-center justify-between py-2 px-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 mb-3 text-[10px] text-slate-600 dark:text-gray-400">
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
              <CheckCircle2 className="w-3 h-3" /> QRIS / All Bank
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium">
              <ShieldCheck className="w-3 h-3" /> MM GTID / GTMART
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            
            {/* Detail Spek Button */}
            <button
              onClick={() => {
                sounds.playPopupSound();
                onSelectDetail(account);
              }}
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/90 dark:hover:bg-slate-700 text-slate-800 dark:text-gray-200 hover:text-black dark:hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border border-slate-200 dark:border-slate-700"
            >
              <Eye className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>{t.card.btnDetails}</span>
            </button>

            {/* Discord Order Button (Replaces WA button) */}
            {account.isAvailable ? (
              <a
                href={generateDiscordProfileUrl(settings)}
                onClick={(e) => {
                  e.preventDefault();
                  sounds.playCoinSound();
                  openDiscord(settings);
                }}
                className="px-3 py-2 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-pixel-blue transition-all active:scale-95 cursor-pointer"
                title={`Order via Discord: ${settings.storeName}`}
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 127.14 96.36">
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,45.91,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,45.91,96.12,53,91.08,65.69,84.69,65.69Z" />
                </svg>
                <span>{t.card.btnDiscordOrder}</span>
              </a>
            ) : (
              <button
                disabled
                className="px-3 py-2 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-300 dark:border-rose-900/40 text-xs font-medium cursor-not-allowed flex items-center justify-center"
              >
                {t.card.btnSold}
              </button>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
