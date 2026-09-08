'use client';

import React, { useState } from 'react';
import { Account, StoreSettings } from '../../types/account';
import { formatRupiah, formatLocks, generateDiscordProfileUrl, generateDiscordOrderMessage, openDiscord } from '../../utils/formatters';
import { sounds } from '../../utils/soundEffects';
import { useLanguage } from '../../context/LanguageContext';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ShieldCheck, 
  Share2, 
  Copy, 
  Check, 
  ExternalLink,
  Award,
  Layers,
  Sparkles,
} from 'lucide-react';
import { getAccountCategories } from './CatalogSection';

interface AccountModalProps {
  account: Account | null;
  settings: StoreSettings;
  onClose: () => void;
  onOpenPostGenerator: (account: Account) => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  account,
  settings,
  onClose,
  onOpenPostGenerator,
}) => {
  const { language, t } = useLanguage();
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [copiedDiscord, setCopiedDiscord] = useState(false);
  const [orderCopied, setOrderCopied] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('QRIS / Direct Bank');

  if (!account) return null;

  const lockInfo = formatLocks(account.priceIdr, settings.dlRateIdr);

  const handleCopyDiscord = () => {
    sounds.playSuccessSound();
    navigator.clipboard.writeText(settings.discordId);
    setCopiedDiscord(true);
    setTimeout(() => setCopiedDiscord(false), 2500);
  };

  const handleDiscordOrder = () => {
    sounds.playCoinSound();
    // Copy pre-formatted order message to clipboard for easy pasting in Discord DM
    const orderMsg = generateDiscordOrderMessage(account, settings, selectedPayment, language);
    navigator.clipboard.writeText(orderMsg);
    setOrderCopied(true);
    setTimeout(() => setOrderCopied(false), 4000);

    // Open Discord directly (Server invite / app)
    openDiscord(settings);
  };

  const paymentOptions = language === 'id' 
    ? ['QRIS (Semua E-Wallet)', 'Transfer Bank BCA', 'Transfer Mandiri/BRI', 'Rekber MM GTID Discord', 'Rekber MM GTMART Discord']
    : ['QRIS (All E-Wallet)', 'Bank Transfer (BCA)', 'Bank Transfer (Mandiri/BRI)', 'MM GTID Discord Official', 'MM GTMART Discord Official'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      
      {/* Lightbox Fullscreen Zoom */}
      {isZoomed && account.images.length > 0 && (
        <div 
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 z-60 bg-black/95 flex flex-col items-center justify-center p-4 cursor-zoom-out"
        >
          <img
            src={account.images[activeImageIdx]}
            alt="Zoomed Screenshot"
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
          />
          <div className="mt-4 text-xs text-gray-400">{t.modal.zoomCloseHint}</div>
        </div>
      )}

      {/* Main Modal Container */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-white dark:bg-gt-card border border-slate-200 dark:border-slate-700 rounded-3xl overflow-hidden shadow-pixel-lg my-6 flex flex-col max-h-[90vh]"
      >
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-lg">
              {t.modal.codePrefix}: #{account.id}
            </span>
            <span className="text-xs font-pixel font-bold px-2 py-1 rounded bg-amber-500 text-black shadow-pixel-amber">
              👑 {t.card.badgeLegacy}
            </span>
          </div>

          <button
            onClick={() => {
              sounds.playClickSound();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:text-gray-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-6">
          
          {/* Header & Title */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${account.isAvailable ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/40' : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400 border border-rose-300 dark:border-rose-600'}`}>
                {account.isAvailable ? t.modal.statusAvailable : t.modal.statusSoldOut}
              </span>
              <span className="text-xs text-slate-500 dark:text-gray-400">
                {t.modal.ageLabel} <strong className="text-amber-600 dark:text-amber-400">{account.accountDays || (account.accountYear ? `${account.accountYear}` : '3k Days')}</strong>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              {account.title}
            </h2>
          </div>

          {/* Screenshot Carousel Gallery */}
          <div className="relative bg-slate-950 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
            
            <div className="relative w-full h-64 sm:h-96 flex items-center justify-center bg-black">
              {account.images.length > 0 ? (
                <img
                  src={account.images[activeImageIdx]}
                  alt={`Screenshot ${activeImageIdx + 1}`}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-gray-500 font-pixel text-xs">NO SCREENSHOT</div>
              )}

              {/* Lightbox Zoom Button */}
              {account.images.length > 0 && (
                <button
                  onClick={() => setIsZoomed(true)}
                  className="absolute top-3 right-3 p-2 rounded-xl bg-black/70 hover:bg-black text-white border border-white/20 transition-all flex items-center gap-1.5 text-xs shadow-lg backdrop-blur-sm"
                >
                  <ZoomIn className="w-4 h-4" />
                  <span>{t.modal.zoomPhoto}</span>
                </button>
              )}

              {/* Prev / Next Arrows */}
              {account.images.length > 1 && (
                <>
                  <button
                    onClick={() => {
                      sounds.playClickSound();
                      setActiveImageIdx((prev) => (prev > 0 ? prev - 1 : account.images.length - 1));
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => {
                      sounds.playClickSound();
                      setActiveImageIdx((prev) => (prev < account.images.length - 1 ? prev + 1 : 0));
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails Row */}
            {account.images.length > 1 && (
              <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2 overflow-x-auto">
                {account.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      sounds.playClickSound();
                      setActiveImageIdx(idx);
                    }}
                    className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                      idx === activeImageIdx ? 'border-amber-400 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

          </div>

          {/* Pricing Banner Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 dark:bg-gradient-to-r dark:from-amber-950/40 dark:via-slate-900 dark:to-slate-950 border border-amber-300 dark:border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-pixel">
            <div>
              <span className="text-xs text-amber-700 dark:text-amber-300 font-semibold tracking-wide uppercase">
                {t.modal.priceLabel}
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
                {formatRupiah(account.priceIdr)}
              </div>
            </div>

            <div className="sm:text-right bg-white dark:bg-slate-900/80 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-gray-400">{t.modal.inGameLocksLabel}</span>
              <div className="text-base sm:text-lg font-bold text-amber-600 dark:text-amber-400 font-pixel">
                {lockInfo.text}
              </div>
            </div>
          </div>

          {/* Full Specifications Table */}
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>{t.modal.tableTitle}</span>
            </h3>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50/60 dark:bg-slate-950/60 divide-y divide-slate-200 dark:divide-slate-800">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 p-3 text-sm">
                <span className="text-slate-500 dark:text-gray-400">{t.modal.tableLogin}</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {t.modal.tableLoginVal}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 p-3 text-sm">
                <span className="text-slate-500 dark:text-gray-400">{t.modal.tableEmail}</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {account.emailStatus}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 p-3 text-sm">
                <span className="text-slate-500 dark:text-gray-400">{t.modal.tableLevelExp}</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400 font-pixel text-xs">
                  Level {account.level} ({account.expPercent ?? 0}%)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 p-3 text-sm">
                <span className="text-slate-500 dark:text-gray-400">{t.modal.tableGrowId}</span>
                <span className="font-semibold text-slate-800 dark:text-gray-200 font-mono">
                  {account.growIdFormat}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 p-3 text-sm">
                <span className="text-slate-500 dark:text-gray-400">{t.modal.tableCategory}</span>
                <span className="font-semibold text-cyan-700 dark:text-cyan-300">
                  {getAccountCategories(account).join(' • ')}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 p-3 text-sm">
                <span className="text-slate-500 dark:text-gray-400">{t.modal.tableAge}</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400 font-mono">
                  {account.accountDays || (account.accountYear ? `${account.accountYear}` : '3k Days')}
                </span>
              </div>

            </div>
          </div>

          {/* Quest & Untradeable Items Box (Only if at least one section has items) */}
          {((account.questItems && account.questItems.length > 0) || (account.untradeableHighlights && account.untradeableHighlights.length > 0)) && (
            <div className={`grid gap-4 ${
              account.questItems && account.questItems.length > 0 && account.untradeableHighlights && account.untradeableHighlights.length > 0
                ? 'grid-cols-1 sm:grid-cols-2'
                : 'grid-cols-1'
            }`}>
              
              {account.questItems && account.questItems.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                  <h4 className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                    <span>{t.modal.questItemsTitle}</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-gray-200">
                    {account.questItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-500 dark:text-amber-400 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {account.untradeableHighlights && account.untradeableHighlights.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                  <h4 className="text-xs font-bold text-cyan-700 dark:text-cyan-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                    <span>{t.modal.untradeableTitle}</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-gray-200">
                    {account.untradeableHighlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-500 dark:text-cyan-400 font-bold">★</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          )}

          {/* Description & Seller Notes */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm">
            <h4 className="font-semibold text-slate-700 dark:text-gray-300 mb-1">{t.modal.descTitle}</h4>
            <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-xs sm:text-sm">
              {account.description}
            </p>
            {account.notes && (
              <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs text-amber-700 dark:text-amber-300/90 flex items-center gap-2">
                <span>{t.modal.sellerNotesTitle}</span>
                <span>{account.notes}</span>
              </div>
            )}
          </div>

          {/* Payment & Middleman (Rekber) Info Box */}
          <div className="p-5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>{t.modal.termsTitle}</span>
              </h4>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 font-mono">
                {t.modal.termsBadge}
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed">
              {t.modal.termsDesc}
            </p>

            {/* Payment Method Selector */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-2">
                {t.modal.paymentMethodPrompt}
              </label>
              <div className="flex flex-wrap gap-2">
                {paymentOptions.map((method) => (
                  <button
                    key={method}
                    onClick={() => {
                      sounds.playClickSound();
                      setSelectedPayment(method);
                    }}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                      selectedPayment === method
                        ? 'bg-blue-600 text-white border-blue-400 font-semibold shadow-pixel-blue'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-gray-300 border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Sticky Footer Order Actions: Discord Focus */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Copy Postingan Format */}
            <button
              onClick={() => {
                sounds.playClickSound();
                onOpenPostGenerator(account);
              }}
              className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-gray-200 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-300 dark:border-slate-700 transition-colors w-1/2 sm:w-auto"
            >
              <Share2 className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              <span>{t.modal.btnCopyPost}</span>
            </button>

            {/* Copy Discord Username / ID */}
            <button
              onClick={handleCopyDiscord}
              title={`Discord ID: ${settings.discordId} (@${settings.discordUsername || 'Admin'})`}
              className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-gray-300 text-xs border border-slate-300 dark:border-slate-800 flex items-center justify-center gap-1.5 transition-colors w-1/2 sm:w-auto cursor-pointer"
            >
              {copiedDiscord ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{copiedDiscord ? t.modal.btnCopied : (settings.discordUsername ? `@${settings.discordUsername}` : `ID: ${settings.discordId}`)}</span>
            </button>
          </div>

          {/* Primary Order Discord Button (Replaces WhatsApp) */}
          <div className="w-full sm:w-auto flex flex-col items-center sm:items-end gap-1.5">
            {account.isAvailable ? (
              <button
                onClick={handleDiscordOrder}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-pixel-blue transition-all active:translate-y-0.5 cursor-pointer"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 127.14 96.36">
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,45.91,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,45.91,96.12,53,91.08,65.69,84.69,65.69Z" />
                </svg>
                <span>{orderCopied ? (language === 'id' ? 'DETAIL DISALIN & BUKA DISCORD!' : 'DETAILS COPIED & OPENING DISCORD!') : t.modal.btnOrderDiscord}</span>
              </button>
            ) : (
              <div className="w-full sm:w-auto px-6 py-3 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800/60 font-bold text-sm text-center">
                {t.modal.btnSoldOut}
              </div>
            )}
            {orderCopied && (
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 animate-fadeIn font-medium text-center sm:text-right">
                {language === 'id' 
                  ? '✓ Format order otomatis disalin! Tinggal paste (Ctrl+V) di DM / ticket.' 
                  : '✓ Order details copied! Simply paste in DM / ticket.'}
              </p>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
