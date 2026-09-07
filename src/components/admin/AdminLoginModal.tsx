'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { sounds } from '../../utils/soundEffects';
import { Lock, ArrowLeft, KeyRound, ShieldAlert } from 'lucide-react';

interface AdminLoginModalProps {
  correctPin: string;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ correctPin, onSuccess }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === correctPin.trim()) {
      sounds.playSuccessSound();
      setError(false);
      onSuccess();
    } else {
      sounds.playPunchSound();
      setError(true);
      setPin('');
    }
  };

  return (
    <div className="min-h-screen bg-gt-darker flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-gt-card border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-pixel-lg">
        
        {/* Top Icon */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
          <Lock className="w-8 h-8" />
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-white text-center mb-1 font-pixelHeading">
          PORTAL ADMIN
        </h2>
        <p className="text-xs text-gray-400 text-center mb-6">
          Masukkan PIN Admin untuk mengelola katalog akun & pengaturan toko.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2">
              PIN / Password Admin:
            </label>
            <div className="relative">
              <input
                type="password"
                value={pin}
                autoFocus
                onChange={(e) => {
                  setPin(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="Masukkan PIN (Default: 1234)"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-center text-lg font-mono text-white placeholder-gray-500 tracking-widest focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>
            {error && (
              <p className="mt-2 text-xs text-rose-400 flex items-center justify-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>PIN salah! Silakan coba lagi (Default: 1234)</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold rounded-xl shadow-pixel-amber text-sm transition-all"
          >
            MASUK DASHBOARD
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-800 text-center">
          <Link
            href="/"
            onClick={() => sounds.playClickSound()}
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Halaman Publik</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
