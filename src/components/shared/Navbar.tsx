'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StoreSettings } from '../../types/account';
import { sounds } from '../../utils/soundEffects';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { ShieldCheck, Volume2, VolumeX, Lock, Sun, Moon, Globe } from 'lucide-react';

interface NavbarProps {
  settings: StoreSettings;
}

export const Navbar: React.FC<NavbarProps> = ({ settings }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme, isDark } = useTheme();

  useEffect(() => {
    setIsMuted(sounds.isMuted);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sounds.playCoinSound();
    }
  };

  const handleThemeChange = () => {
    sounds.playClickSound();
    toggleTheme();
  };

  const handleLanguageChange = () => {
    sounds.playClickSound();
    toggleLanguage();
  };

  const getStatusBadge = () => {
    switch (settings.adminStatus) {
      case 'ONLINE':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-400 dark:border-emerald-500/40 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.25)]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
            {t.navbar.adminOnline}
          </span>
        );
      case 'FAST_RESPONSE':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 border border-amber-400 dark:border-amber-500/40 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.25)]">
            <span className="w-2 h-2 rounded-full bg-amber-500 dark:bg-amber-400 animate-ping"></span>
            {t.navbar.adminFastResponse}
          </span>
        );
      case 'OFFLINE':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-500 dark:text-gray-400 bg-slate-200 dark:bg-gray-900 border border-slate-300 dark:border-gray-700 rounded-full">
            <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-gray-500"></span>
            {t.navbar.adminOffline}
          </span>
        );
    }
  };

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 dark:bg-[#080c14]/95 backdrop-blur-md border-b border-slate-200 dark:border-gt-cardBorder shadow-md dark:shadow-lg dark:shadow-black/40' 
        : 'bg-transparent border-b border-black/5 dark:border-white/5'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-20 flex items-center justify-between gap-2">
        
        {/* Brand Logo & Name: WICSTORE */}
        <Link 
          href="/" 
          onClick={() => sounds.playCoinSound()}
          className="flex items-center gap-2 sm:gap-3 group shrink-0 min-w-0"
        >
          {/* Pixel Diamond Logo */}
          <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 p-0.5 shadow-pixel-amber group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-slate-900 dark:bg-[#111827] rounded-[7px] sm:rounded-[10px] flex items-center justify-center relative overflow-hidden">
              <span className="text-base sm:text-2xl select-none group-hover:animate-bounce">💎</span>
            </div>
          </div>
          
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-pixelHeading text-sm sm:text-lg tracking-wider text-slate-900 dark:text-white font-extrabold group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors truncate">
                WICSTORE
              </span>
              <span className="text-[9px] sm:text-[10px] font-pixel text-amber-600 dark:text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30 shrink-0">
                LEGACY
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-gray-400 hidden sm:block truncate">
              {t.navbar.brandSubtitle}
            </p>
          </div>
        </Link>

        {/* Center: Admin Status Live Badge */}
        <div className="hidden md:flex items-center gap-3">
          {getStatusBadge()}
          <div className="flex items-center gap-1.5 text-xs text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/50 border border-blue-300 dark:border-blue-800/40 px-2.5 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>{t.navbar.mmReady}</span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          
          {/* Language Switcher Toggle */}
          <button
            onClick={handleLanguageChange}
            title={language === 'en' ? "Switch to Bahasa Indonesia" : "Ganti ke Bahasa Inggris"}
            className="flex items-center gap-1 px-2 py-1.5 sm:px-2.5 text-xs font-semibold rounded-lg border transition-all bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300 dark:bg-gt-card dark:hover:bg-gt-cardHover dark:text-amber-300 dark:border-gt-cardBorder"
          >
            <Globe className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-mono text-[11px] sm:text-xs font-bold uppercase">{language}</span>
          </button>

          {/* Theme Toggle (Dark / Light) */}
          <button
            onClick={handleThemeChange}
            title={isDark ? "Switch to Light Mode" : "Aktifkan Mode Gelap"}
            className="p-1.5 sm:p-2 text-slate-600 hover:text-amber-600 dark:text-gray-400 dark:hover:text-amber-400 bg-slate-100 hover:bg-slate-200 dark:bg-gt-card dark:hover:bg-gt-cardHover border border-slate-300 dark:border-gt-cardBorder rounded-lg transition-colors"
          >
            {isDark ? (
              <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" />
            )}
          </button>

          {/* Sound Toggle (hidden on mobile to save width, visible on sm+) */}
          <button
            onClick={handleToggleSound}
            title={isMuted ? t.navbar.soundTooltipMuted : t.navbar.soundTooltipUnmuted}
            className="hidden sm:flex p-2 text-slate-600 hover:text-amber-600 dark:text-gray-400 dark:hover:text-amber-400 bg-slate-100 hover:bg-slate-200 dark:bg-gt-card dark:hover:bg-gt-cardHover border border-slate-300 dark:border-gt-cardBorder rounded-lg transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-500 dark:text-amber-400 animate-pulse" />}
          </button>

          {/* Primary CTA: Discord */}
          <a
            href={`https://discord.com/users/${settings.discordId}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playCoinSound()}
            className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 text-xs font-semibold text-white bg-[#5865F2] hover:bg-[#4752C4] rounded-lg shadow-pixel-blue transition-all"
            title="Discord"
          >
            {/* Discord Icon SVG */}
            <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 127.14 96.36">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,45.91,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,45.91,96.12,53,91.08,65.69,84.69,65.69Z" />
            </svg>
            <span className="hidden sm:inline">{t.navbar.discordCta}</span>
          </a>

          {/* Admin Panel Link */}
          <Link
            href="/admin"
            onClick={() => sounds.playClickSound()}
            className="inline-flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-medium text-amber-700 hover:text-amber-900 dark:text-amber-300 dark:hover:text-white bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg transition-all"
            title="Admin"
          >
            <Lock className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">{t.navbar.adminLink}</span>
          </Link>

        </div>

      </div>
    </header>
  );
};
