'use client';

import React, { useState } from 'react';
import { StoreSettings, AdminStatus } from '../../types/account';
import { sounds } from '../../utils/soundEffects';
import { X, Settings, ShieldCheck, Key, Phone, Save } from 'lucide-react';

interface StoreSettingsModalProps {
  settings: StoreSettings;
  onSave: (newSettings: StoreSettings) => void;
  onClose: () => void;
}

export const StoreSettingsModal: React.FC<StoreSettingsModalProps> = ({
  settings,
  onSave,
  onClose,
}) => {
  const [form, setForm] = useState<StoreSettings>({ ...settings });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playSuccessSound();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-gt-card border border-slate-700 rounded-3xl overflow-hidden shadow-pixel-lg my-6 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">
              Pengaturan Toko & Kontak Admin
            </h3>
          </div>
          <button
            onClick={() => {
              sounds.playClickSound();
              onClose();
            }}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          {/* Store Name */}
          <div>
            <label className="block font-semibold text-gray-300 mb-1">
              Nama Toko:
            </label>
            <input
              type="text"
              required
              value={form.storeName}
              onChange={(e) => setForm({ ...form, storeName: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
            />
          </div>

          {/* Admin Status */}
          <div>
            <label className="block font-semibold text-gray-300 mb-1">
              Status Keberadaan Admin:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'ONLINE', label: '🟢 ONLINE', desc: 'Siap layani order' },
                { id: 'FAST_RESPONSE', label: '⚡ FAST RESPONSE', desc: 'Respon secepat kilat' },
                { id: 'OFFLINE', label: '🔴 OFFLINE', desc: 'Tidur / Istirahat' },
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => {
                    sounds.playClickSound();
                    setForm({ ...form, adminStatus: item.id as AdminStatus });
                  }}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    form.adminStatus === item.id
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <div className="text-xs font-semibold">{item.label}</div>
                  <div className="text-[10px] opacity-75">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* WhatsApp & Discord ID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-300 mb-1">
                Nomor WhatsApp Admin (Kode Negara 62):
              </label>
              <input
                type="text"
                required
                value={form.whatsappNumber}
                onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                placeholder="misal: 6285812345678"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-mono"
              />
              <span className="text-[10px] text-gray-500">Awali dengan 62 tanpa spasi atau strip</span>
            </div>

            <div>
              <label className="block font-semibold text-gray-300 mb-1">
                Discord User ID Admin:
              </label>
              <input
                type="text"
                required
                value={form.discordId}
                onChange={(e) => setForm({ ...form, discordId: e.target.value })}
                placeholder="1199509687918399588"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-mono"
              />
              <span className="text-[10px] text-gray-500">Contoh: 1199509687918399588</span>
            </div>
          </div>

          {/* DL Exchange Rate */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <label className="block font-semibold text-amber-300 mb-1">
              Kurs Konversi 1 Diamond Lock (DL) ke Rupiah:
            </label>
            <div className="flex items-center gap-3">
              <span className="text-gray-400 font-mono">1 DL = Rp</span>
              <input
                type="number"
                step="100"
                required
                value={form.dlRateIdr}
                onChange={(e) => setForm({ ...form, dlRateIdr: Number(e.target.value) })}
                className="w-36 px-3 py-1.5 bg-slate-900 border border-amber-500/40 rounded-lg text-xs text-amber-300 font-bold font-mono"
              />
            </div>
            <span className="text-[10px] text-gray-500 mt-1 block">
              Akan otomatis mengalkulasi harga DL dan BGL pada semua kartu akun
            </span>
          </div>

          {/* Admin PIN */}
          <div>
            <label className="block font-semibold text-gray-300 mb-1">
              PIN Keamanan Admin Dashboard:
            </label>
            <input
              type="text"
              required
              value={form.adminPin}
              onChange={(e) => setForm({ ...form, adminPin: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-mono"
            />
            <span className="text-[10px] text-gray-500">PIN saat ini digunakan untuk login ke portal admin</span>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                sounds.playClickSound();
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-300 text-xs font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-xs shadow-pixel-amber flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>SIMPAN PENGATURAN</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
