'use client';

import React, { useState, useEffect } from 'react';
import { StoreSettings, AdminStatus } from '../../types/account';
import { sounds } from '../../utils/soundEffects';
import { X, Settings, ShieldCheck, Key, Phone, Save, RefreshCw, TrendingUp, Sparkles, ExternalLink, CheckCircle2, Zap } from 'lucide-react';
import { fetchLiveGtidDlRate, GtidDlRateData } from '../../utils/storage';
import { formatRupiah } from '../../utils/formatters';

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
  const [liveGtid, setLiveGtid] = useState<GtidDlRateData | null>(null);
  const [isFetchingGtid, setIsFetchingGtid] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  useEffect(() => {
    // Initial fetch of fresh GTID live rate when modal opens
    let mounted = true;
    fetchLiveGtidDlRate().then((data) => {
      if (mounted && data) {
        setLiveGtid(data);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const handleManualFetchGtid = async () => {
    sounds.playClickSound();
    setIsFetchingGtid(true);
    setSyncFeedback(null);

    const fresh = await fetchLiveGtidDlRate();
    setIsFetchingGtid(false);

    if (fresh) {
      setLiveGtid(fresh);
      const source = form.dlRateSource || 'buy';
      const targetRate = source === 'sell' ? fresh.sell : source === 'average' ? fresh.average : fresh.buy;

      setForm((prev) => ({
        ...prev,
        dlRateIdr: targetRate,
        dlRateLastSyncedAt: new Date().toISOString(),
        dlRateLiveInfo: {
          buy: fresh.buy,
          sell: fresh.sell,
          buyBgl: fresh.buyBgl,
          sellBgl: fresh.sellBgl,
          updatedAt: fresh.updatedAt,
        },
      }));
      setSyncFeedback(`Berhasil! Kurs disesuaikan ke Rp ${targetRate.toLocaleString('id-ID')} (GTID ${source.toUpperCase()})`);
      setTimeout(() => setSyncFeedback(null), 4000);
    } else {
      setSyncFeedback('Gagal terhubung ke API GTID. Silakan coba beberapa saat lagi.');
      setTimeout(() => setSyncFeedback(null), 4000);
    }
  };

  const handleRateSourceChange = (newSource: 'buy' | 'sell' | 'average') => {
    sounds.playClickSound();
    if (liveGtid && form.autoSyncDlRate !== false) {
      const targetRate = newSource === 'sell' ? liveGtid.sell : newSource === 'average' ? liveGtid.average : liveGtid.buy;
      setForm((prev) => ({
        ...prev,
        dlRateSource: newSource,
        dlRateIdr: targetRate,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        dlRateSource: newSource,
      }));
    }
  };

  const handleToggleAutoSync = (checked: boolean) => {
    sounds.playClickSound();
    if (checked && liveGtid) {
      const source = form.dlRateSource || 'buy';
      const targetRate = source === 'sell' ? liveGtid.sell : source === 'average' ? liveGtid.average : liveGtid.buy;
      setForm((prev) => ({
        ...prev,
        autoSyncDlRate: true,
        dlRateIdr: targetRate,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        autoSyncDlRate: checked,
      }));
    }
  };

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

          {/* WhatsApp & Discord Contact */}
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
              <span className="text-[10px] text-gray-500">Contoh: 1199509687918399588 (Dipakai untuk deep link profil)</span>
            </div>

            <div>
              <label className="block font-semibold text-gray-300 mb-1">
                Discord Username Admin (@username):
              </label>
              <input
                type="text"
                required
                value={form.discordUsername}
                onChange={(e) => setForm({ ...form, discordUsername: e.target.value })}
                placeholder="wicstore#GT atau wicstore"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-mono"
              />
              <span className="text-[10px] text-gray-500">Username/tag untuk dicopy pembeli jika ingin add friend</span>
            </div>

            <div>
              <label className="block font-semibold text-gray-300 mb-1">
                Link Server Discord Toko (Opsional):
              </label>
              <input
                type="text"
                value={form.discordServerUrl || ''}
                onChange={(e) => setForm({ ...form, discordServerUrl: e.target.value })}
                placeholder="https://discord.gg/namaserver"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-mono"
              />
              <span className="text-[10px] text-gray-500">Jika ada server Discord toko sendiri</span>
            </div>
          </div>

          {/* DL Exchange Rate & GTID Dynamic API Integration */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-amber-300">
                    Kurs Diamond Lock (DL) & BGL
                  </h4>
                  <p className="text-[10px] text-gray-400">
                    Kalkulator harga in-game otomatis untuk semua kartu akun
                  </p>
                </div>
              </div>

              {/* Manual Refresh Button */}
              <button
                type="button"
                onClick={handleManualFetchGtid}
                disabled={isFetchingGtid}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-gray-300 hover:text-white text-[11px] font-semibold flex items-center gap-1.5 transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${isFetchingGtid ? 'animate-spin text-amber-400' : ''}`} />
                <span>{isFetchingGtid ? 'Menarik...' : 'Cek Live GTID'}</span>
              </button>
            </div>

            {/* Live GTID Market Info Card */}
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-400 font-mono">
                    GTID Live Market
                  </span>
                </div>
                <a
                  href="https://gtid.pro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-gray-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                >
                  <span>api.gtid.pro</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800/80">
                  <span className="text-[9px] text-gray-400 block">Harga BUY (Beli)</span>
                  <span className="font-mono font-bold text-emerald-300">
                    Rp {liveGtid ? liveGtid.buy.toLocaleString('id-ID') : '538'}{' '}
                    <span className="text-[9px] text-gray-400 font-normal">/ DL</span>
                  </span>
                  <span className="text-[9px] text-gray-400 block">
                    Rp {liveGtid ? (liveGtid.buyBgl / 1000).toFixed(1) : '53.8'}k / BGL
                  </span>
                </div>

                <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800/80">
                  <span className="text-[9px] text-gray-400 block">Harga SELL (Jual)</span>
                  <span className="font-mono font-bold text-sky-300">
                    Rp {liveGtid ? liveGtid.sell.toLocaleString('id-ID') : '555'}{' '}
                    <span className="text-[9px] text-gray-400 font-normal">/ DL</span>
                  </span>
                  <span className="text-[9px] text-gray-400 block">
                    Rp {liveGtid ? (liveGtid.sellBgl / 1000).toFixed(1) : '55.5'}k / BGL
                  </span>
                </div>

                <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800/80 col-span-2 sm:col-span-1">
                  <span className="text-[9px] text-gray-400 block">Rata-Rata (Avg)</span>
                  <span className="font-mono font-bold text-amber-300">
                    Rp {liveGtid ? liveGtid.average.toLocaleString('id-ID') : '546'}{' '}
                    <span className="text-[9px] text-gray-400 font-normal">/ DL</span>
                  </span>
                  <span className="text-[9px] text-gray-400 block">
                    Spread: Rp {liveGtid?.spread?.dl || 17} / DL
                  </span>
                </div>
              </div>

              {/* Feedback toast */}
              {syncFeedback && (
                <div className="mt-2 text-[10px] text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 rounded-lg px-2.5 py-1 flex items-center gap-1.5 animate-fadeIn">
                  <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                  <span>{syncFeedback}</span>
                </div>
              )}
            </div>

            {/* Auto-Sync Toggle Switch */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="space-y-0.5 pr-2">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-semibold text-gray-200 text-xs">
                    Auto-Sync Kurs dari GTID API
                  </span>
                </div>
                <p className="text-[10px] text-gray-400">
                  Otomatis sesuaikan kurs konversi DL secara berkala dengan pasar GTID
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                <input
                  type="checkbox"
                  checked={form.autoSyncDlRate !== false}
                  onChange={(e) => handleToggleAutoSync(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
              </label>
            </div>

            {/* Choice of Rate Source when Auto-Sync is Active */}
            {form.autoSyncDlRate !== false && (
              <div className="space-y-1.5 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 animate-fadeIn">
                <span className="text-[10px] font-semibold text-gray-300 block">
                  Patokan Harga yang Digunakan Toko:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleRateSourceChange('buy')}
                    className={`p-2 rounded-xl text-left border transition-all ${
                      (form.dlRateSource || 'buy') === 'buy'
                        ? 'bg-amber-500/15 border-amber-500/60 text-amber-300 shadow-sm'
                        : 'bg-slate-950 border-slate-800 text-gray-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-bold text-[11px]">Harga Buy</span>
                      {(form.dlRateSource || 'buy') === 'buy' && (
                        <CheckCircle2 className="w-3 h-3 text-amber-400" />
                      )}
                    </div>
                    <span className="text-[10px] font-mono block text-white font-bold">
                      Rp {liveGtid ? liveGtid.buy.toLocaleString('id-ID') : '538'}
                    </span>
                    <span className="text-[9px] text-amber-400/80 block mt-0.5">
                      ⭐ Rekomendasi Toko
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRateSourceChange('sell')}
                    className={`p-2 rounded-xl text-left border transition-all ${
                      form.dlRateSource === 'sell'
                        ? 'bg-amber-500/15 border-amber-500/60 text-amber-300 shadow-sm'
                        : 'bg-slate-950 border-slate-800 text-gray-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-bold text-[11px]">Harga Sell</span>
                      {form.dlRateSource === 'sell' && (
                        <CheckCircle2 className="w-3 h-3 text-amber-400" />
                      )}
                    </div>
                    <span className="text-[10px] font-mono block text-white font-bold">
                      Rp {liveGtid ? liveGtid.sell.toLocaleString('id-ID') : '555'}
                    </span>
                    <span className="text-[9px] text-gray-400 block mt-0.5">
                      Sesuai harga jual pasar
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRateSourceChange('average')}
                    className={`p-2 rounded-xl text-left border transition-all ${
                      form.dlRateSource === 'average'
                        ? 'bg-amber-500/15 border-amber-500/60 text-amber-300 shadow-sm'
                        : 'bg-slate-950 border-slate-800 text-gray-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-bold text-[11px]">Rata-Rata</span>
                      {form.dlRateSource === 'average' && (
                        <CheckCircle2 className="w-3 h-3 text-amber-400" />
                      )}
                    </div>
                    <span className="text-[10px] font-mono block text-white font-bold">
                      Rp {liveGtid ? liveGtid.average.toLocaleString('id-ID') : '546'}
                    </span>
                    <span className="text-[9px] text-gray-400 block mt-0.5">
                      Nilai tengah Buy & Sell
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Current Active Rate Input (Manual Override) */}
            <div className="pt-1">
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-gray-300 text-xs">
                  Kurs Konversi Aktif:
                </label>
                {form.autoSyncDlRate !== false ? (
                  <span className="text-[10px] text-amber-400 font-medium flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    Terkoneksi Auto GTID ({(form.dlRateSource || 'buy').toUpperCase()})
                  </span>
                ) : (
                  <span className="text-[10px] text-gray-400">Mode Input Manual</span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-mono text-xs">1 DL = Rp</span>
                <input
                  type="number"
                  step="1"
                  required
                  value={form.dlRateIdr}
                  onChange={(e) => setForm({ ...form, dlRateIdr: Number(e.target.value) })}
                  className="w-36 px-3 py-1.5 bg-slate-900 border border-amber-500/40 rounded-lg text-xs text-amber-300 font-bold font-mono focus:border-amber-400 outline-none"
                />
                <span className="text-[11px] text-gray-400 font-mono">
                  (~Rp {(form.dlRateIdr * 100).toLocaleString('id-ID')} / BGL)
                </span>
              </div>
              <span className="text-[10px] text-gray-500 mt-1 block">
                Simulasi: Akun Rp 125.000 = ~{Math.round(125000 / (form.dlRateIdr || 538))} DL ({Math.floor(Math.round(125000 / (form.dlRateIdr || 538)) / 100)} BGL {Math.round(125000 / (form.dlRateIdr || 538)) % 100} DL)
              </span>
            </div>
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
