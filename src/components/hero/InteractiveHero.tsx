'use client';

import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/soundEffects';
import { StoreSettings } from '../../types/account';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { Sparkles, ArrowDown, ShieldCheck } from 'lucide-react';

interface InteractiveHeroProps {
  settings: StoreSettings;
  onExploreCatalog: () => void;
  onOpenRekberGuide: () => void;
}

export const InteractiveHero: React.FC<InteractiveHeroProps> = ({
  settings,
  onExploreCatalog,
  onOpenRekberGuide
}) => {
  const { language, t } = useLanguage();
  const { isDark } = useTheme();
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [isPunching, setIsPunching] = useState(false);
  const [punchCount, setPunchCount] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax mouse follow
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / 25;
    const y = (e.clientY - (rect.top + rect.height / 2)) / 25;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  // Character Click / Punch Handler
  const handleCharacterClick = (e: React.MouseEvent) => {
    sounds.playPunchSound();
    setIsPunching(true);
    setPunchCount(prev => prev + 1);
    const totalDialogues = t.hero.dialogues.length;
    setDialogueIndex(prev => (prev + 1) % totalDialogues);

    // Particle Burst
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 15,
      spread: 60,
      origin: { x, y },
      colors: ['#f59e0b', '#06b6d4', '#10b981', '#ffffff', '#e11d48'],
      ticks: 120,
      gravity: 1.2,
      scalar: 0.9,
    });

    setTimeout(() => {
      setIsPunching(false);
    }, 200);
  };

  return (
    <div 
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-6 pb-16 sm:pt-12 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        
        {/* Left: Text & CTA */}
        <div className="lg:col-span-7 text-center lg:text-left z-10">
          
          {/* Top Pill / Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 dark:bg-gradient-to-r dark:from-amber-500/15 dark:via-yellow-500/10 dark:to-transparent border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-semibold mb-6 shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="font-pixel text-[10px] tracking-wide">{t.hero.badgeCatalog}</span>
            <span className="text-gray-400">•</span>
            <span>{t.hero.badgeMm}</span>
          </div>

          {/* Main Title: WICSTORE GROWTOPIA */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-4">
            {t.hero.mainTitleLine1} <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 dark:from-amber-400 dark:via-yellow-300 dark:to-amber-500 bg-clip-text text-transparent drop-shadow-[0_4px_15px_rgba(245,158,11,0.25)]">
              {t.hero.mainTitleHighlight}
            </span>
            <br />
            <span className="text-xl sm:text-3xl font-pixelHeading text-blue-600 dark:text-blue-400">
              {t.hero.mainTitleLine2}
            </span>
          </h1>

          {/* Subtitle - Exact user requirement 6 text */}
          <p className="text-sm sm:text-base text-slate-700 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
            {language === 'id' ? (
              <>
                Menyediakan akun <strong className="text-amber-600 dark:text-amber-300 font-bold">Log Legacy terbaik</strong>. Transaksi aman via <strong className="text-slate-900 dark:text-white font-semibold">QRIS, Semua Bank, &amp; Rekber Resmi (GTMART &amp; GTID)</strong>.
              </>
            ) : (
              <>
                Providing the best <strong className="text-amber-600 dark:text-amber-300 font-bold">Log Legacy accounts</strong>. Safe transactions via <strong className="text-slate-900 dark:text-white font-semibold">QRIS, All Banks, &amp; Official Middleman (GTMART &amp; GTID)</strong>.
              </>
            )}
          </p>

          {/* CTA Buttons - WhatsApp replaced by Discord CTA */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-8">
            
            <button
              onClick={() => {
                sounds.playCoinSound();
                onExploreCatalog();
              }}
              className="group relative px-6 py-3.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold rounded-xl shadow-pixel-amber transition-all active:translate-y-1 flex items-center gap-2 text-sm sm:text-base font-pixelHeading"
            >
              <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
              <span>{t.hero.btnExplore}</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>

            {/* Discord CTA */}
            <a
              href={`https://discord.com/users/${settings.discordId}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.playCoinSound()}
              className="px-5 py-3.5 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-xl shadow-pixel-blue transition-all active:translate-y-1 flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 127.14 96.36">
                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,45.91,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,45.91,96.12,53,91.08,65.69,84.69,65.69Z" />
              </svg>
              <span>{t.hero.btnDiscord}</span>
            </a>

            {/* Middleman Guide Button */}
            <button
              onClick={() => {
                sounds.playClickSound();
                onOpenRekberGuide();
              }}
              className="px-4 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/80 dark:hover:bg-slate-800 text-slate-800 dark:text-gray-200 hover:text-black dark:hover:text-white font-semibold rounded-xl border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 shadow-pixel transition-all active:translate-y-1 flex items-center gap-2 text-sm"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{t.hero.btnRekber}</span>
            </button>

          </div>

          {/* Mini Highlights */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto lg:mx-0 pt-4 border-t border-slate-200 dark:border-slate-800/80 text-center lg:text-left">
            <div>
              <div className="font-pixelHeading text-lg sm:text-xl font-bold text-amber-500 dark:text-amber-400">{t.hero.stat1Value}</div>
              <div className="text-[11px] sm:text-xs text-slate-500 dark:text-gray-400">{t.hero.stat1Label}</div>
            </div>
            <div>
              <div className="font-pixelHeading text-lg sm:text-xl font-bold text-cyan-600 dark:text-cyan-400">{t.hero.stat2Value}</div>
              <div className="text-[11px] sm:text-xs text-slate-500 dark:text-gray-400">{t.hero.stat2Label}</div>
            </div>
            <div>
              <div className="font-pixelHeading text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400">{t.hero.stat3Value}</div>
              <div className="text-[11px] sm:text-xs text-slate-500 dark:text-gray-400">{t.hero.stat3Label}</div>
            </div>
          </div>

        </div>

        {/* Right: Interactive Growtopia Pixel Character on Dirt/Grass Stage */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          
          {/* Interactive Speech Bubble */}
          <div 
            onClick={handleCharacterClick}
            className="cursor-pointer mb-3 px-4 py-2.5 bg-white/95 dark:bg-slate-900/90 border-2 border-amber-500/80 dark:border-amber-400/80 rounded-2xl shadow-pixel text-center relative z-20 max-w-xs transition-transform hover:scale-105 active:scale-95"
            style={{
              transform: `translate3d(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px, 0)`,
            }}
          >
            <p className="text-xs sm:text-sm font-semibold text-amber-700 dark:text-amber-300 flex items-center justify-center gap-1.5">
              <span>{t.hero.dialogues[dialogueIndex % t.hero.dialogues.length]}</span>
            </p>
            {/* Bubble Tail */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-slate-900 border-r-2 border-b-2 border-amber-500/80 dark:border-amber-400/80 rotate-45"></div>
          </div>

          {/* Character Stage */}
          <div 
            className="relative flex flex-col items-center select-none"
            style={{
              transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            {/* Ambient Aura */}
            <div className="absolute top-10 w-44 h-44 bg-gradient-to-r from-amber-500/20 via-cyan-500/20 to-emerald-500/20 rounded-full blur-2xl -z-10 animate-pulse-glow" />

            {/* Growtopia Pixel Character SVG */}
            <div 
              onClick={handleCharacterClick}
              className={`cursor-pointer transition-transform duration-100 ${isPunching ? 'scale-110 -translate-y-4 rotate-3' : 'animate-float hover:scale-105'}`}
              title="Klik Karakter Growtopia!"
            >
              <svg 
                viewBox="0 0 160 180" 
                className="w-48 sm:w-60 h-auto filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.7)] pixelated"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* WINGS (Dragon / Angel Wings) */}
                <g className="animate-pulse" style={{ animationDuration: '2s' }}>
                  {/* Left Wing */}
                  <rect x="15" y="45" width="25" height="15" fill="#f87171" rx="2" />
                  <rect x="10" y="35" width="20" height="20" fill="#ef4444" rx="2" />
                  <rect x="5" y="25" width="20" height="20" fill="#fca5a5" rx="2" />
                  <rect x="0" y="20" width="15" height="15" fill="#fee2e2" rx="2" />
                  {/* Right Wing */}
                  <rect x="120" y="45" width="25" height="15" fill="#f87171" rx="2" />
                  <rect x="130" y="35" width="20" height="20" fill="#ef4444" rx="2" />
                  <rect x="135" y="25" width="20" height="20" fill="#fca5a5" rx="2" />
                  <rect x="145" y="20" width="15" height="15" fill="#fee2e2" rx="2" />
                </g>

                {/* HEAD & HAIR (Classic GT Spiky Blue/Black Hair) */}
                <rect x="50" y="20" width="60" height="20" fill="#1e293b" />
                <rect x="45" y="25" width="15" height="15" fill="#0f172a" />
                <rect x="100" y="25" width="15" height="15" fill="#0f172a" />
                <rect x="40" y="15" width="20" height="15" fill="#3b82f6" />
                <rect x="70" y="12" width="25" height="15" fill="#60a5fa" />
                <rect x="105" y="18" width="15" height="15" fill="#3b82f6" />

                {/* FACE (Skin tone) */}
                <rect x="52" y="38" width="56" height="42" fill="#fed7aa" />
                <rect x="48" y="46" width="6" height="14" fill="#fdba74" />
                <rect x="106" y="46" width="6" height="14" fill="#fdba74" />

                {/* FOCUSED EYES GOGGLES (Cyan Glowing Eyes) */}
                <g className="filter drop-shadow-[0_0_8px_#06b6d4]">
                  {/* Frame */}
                  <rect x="54" y="48" width="52" height="16" fill="#0f172a" rx="2" />
                  {/* Left Lens */}
                  <rect x="58" y="51" width="18" height="10" fill="#06b6d4" />
                  <rect x="62" y="53" width="6" height="6" fill="#ffffff" />
                  {/* Right Lens */}
                  <rect x="84" y="51" width="18" height="10" fill="#06b6d4" />
                  <rect x="88" y="53" width="6" height="6" fill="#ffffff" />
                </g>

                {/* SMILE */}
                <rect x="72" y="70" width="16" height="4" fill="#9a3412" rx="1" />

                {/* TORSO & SHIRT (Black Diamond Hood / Jacket) */}
                <rect x="54" y="80" width="52" height="40" fill="#1e1b4b" />
                <rect x="68" y="80" width="24" height="40" fill="#312e81" />

                {/* DIAMOND LOCK NECKLACE PENDANT */}
                <g className="filter drop-shadow-[0_0_6px_#f59e0b]">
                  <rect x="75" y="86" width="10" height="10" fill="#f59e0b" transform="rotate(45 80 91)" />
                  <rect x="78" y="89" width="4" height="4" fill="#fef08a" transform="rotate(45 80 91)" />
                </g>

                {/* RIGHT ARM (Holding Golden Pickaxe) */}
                <rect x="106" y="84" width="14" height="24" fill="#1e1b4b" />
                <rect x="108" y="106" width="12" height="12" fill="#fed7aa" />
                {/* Golden Pickaxe */}
                <g transform="rotate(-15 125 105)">
                  {/* Wood handle */}
                  <rect x="120" y="85" width="6" height="35" fill="#78350f" />
                  {/* Golden Head */}
                  <path d="M108 82 Q123 72 138 82 L134 88 Q123 80 112 88 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
                </g>

                {/* LEFT ARM / PUNCHING FIST */}
                {isPunching ? (
                  <g className="animate-ping" style={{ animationDuration: '0.2s' }}>
                    <rect x="25" y="78" width="30" height="18" fill="#1e1b4b" />
                    <rect x="15" y="75" width="20" height="22" fill="#f87171" rx="4" />
                    {/* Punch impact effect */}
                    <circle cx="20" cy="86" r="14" fill="#fbbf24" opacity="0.6" />
                  </g>
                ) : (
                  <g>
                    <rect x="40" y="84" width="14" height="24" fill="#1e1b4b" />
                    <rect x="40" y="106" width="12" height="12" fill="#fed7aa" />
                  </g>
                )}

                {/* PANTS & SHOES */}
                <rect x="56" y="120" width="22" height="26" fill="#1e293b" />
                <rect x="82" y="120" width="22" height="26" fill="#1e293b" />
                {/* Air Jordan / Red Shoes */}
                <rect x="52" y="142" width="26" height="12" fill="#dc2626" rx="2" />
                <rect x="82" y="142" width="26" height="12" fill="#dc2626" rx="2" />
                <rect x="52" y="152" width="26" height="3" fill="#ffffff" />
                <rect x="82" y="152" width="26" height="3" fill="#ffffff" />
              </svg>
            </div>

            {/* Dirt & Grass Floating Platform */}
            <div className="w-56 sm:w-72 mt-[-10px] z-10">
              {/* Grass Top Layer with pixel fringe */}
              <div className="h-5 bg-gt-grass rounded-t-md border-t-2 border-gt-grassLight flex items-center justify-around px-2">
                <div className="w-2 h-1 bg-green-300"></div>
                <div className="w-3 h-1.5 bg-green-200"></div>
                <div className="w-2 h-1 bg-green-300"></div>
                <div className="w-3 h-1 bg-green-200"></div>
              </div>
              {/* Dirt Body with pixel stones */}
              <div className="h-12 bg-gt-dirt border-x-2 border-b-4 border-stone-900 rounded-b-lg p-2 shadow-2xl relative">
                <div className="flex justify-between items-center opacity-80">
                  <span className="w-3 h-2 bg-gt-dirtDark rounded-sm"></span>
                  <span className="w-4 h-3 bg-stone-700 rounded-sm"></span>
                  <span className="w-3 h-2 bg-gt-dirtDark rounded-sm"></span>
                </div>
                <div className="flex justify-around items-center mt-2 opacity-60">
                  <span className="w-2 h-2 bg-stone-700"></span>
                  <span className="w-3 h-2 bg-gt-dirtDark"></span>
                  <span className="w-2 h-2 bg-stone-700"></span>
                </div>
              </div>
            </div>

            {/* Punch Counter Badge */}
            {punchCount > 0 && (
              <div className="mt-2 text-[11px] font-pixel text-amber-500 dark:text-amber-400 animate-bounce">
                {t.hero.punchCombo}: {punchCount}x 💥
              </div>
            )}

            <p className="text-[11px] text-slate-500 dark:text-gray-400 mt-2 text-center">
              💡 <span className="underline decoration-dotted cursor-pointer" onClick={handleCharacterClick}>{t.hero.punchHint}</span>
            </p>

          </div>

        </div>

      </div>
    </div>
  );
};
