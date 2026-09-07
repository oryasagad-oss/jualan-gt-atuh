'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Account, StoreSettings, LoginType } from '../../types/account';
import { 
  getStoredAccounts, 
  saveStoredAccounts, 
  getStoredSettings, 
  saveStoredSettings, 
  exportDataToJson, 
  importDataFromJson,
  resetToDefaultData
} from '../../utils/storage';
import { formatRupiah, formatLocks } from '../../utils/formatters';
import { sounds } from '../../utils/soundEffects';
import { AdminLoginModal } from '../../components/admin/AdminLoginModal';
import { AccountFormModal } from '../../components/admin/AccountFormModal';
import { StoreSettingsModal } from '../../components/admin/StoreSettingsModal';
import { 
  ArrowLeft, 
  Plus, 
  Settings, 
  Download, 
  Upload, 
  Copy, 
  Edit3, 
  Trash2, 
  RotateCcw, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Layers, 
  DollarSign, 
  Package, 
  ShieldCheck, 
  Eye,
  LogOut
} from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [settings, setSettings] = useState<StoreSettings>(getStoredSettings());
  const [isLoading, setIsLoading] = useState(true);

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [searchTable, setSearchTable] = useState('');

  // Load from local storage on mount
  useEffect(() => {
    const loadedAccounts = getStoredAccounts();
    const loadedSettings = getStoredSettings();
    setAccounts(loadedAccounts);
    setSettings(loadedSettings);
    setIsLoading(false);
  }, []);

  // Sync back to storage on change
  const handleSaveAccounts = (newAccounts: Account[]) => {
    setAccounts(newAccounts);
    saveStoredAccounts(newAccounts);
  };

  const handleSaveSettings = (newSettings: StoreSettings) => {
    setSettings(newSettings);
    saveStoredSettings(newSettings);
    setIsSettingsOpen(false);
  };

  // Toggle Account Available/Sold Out in 1 click
  const handleToggleAvailability = (accountId: string) => {
    sounds.playClickSound();
    const updated = accounts.map((acc) => {
      if (acc.id === accountId) {
        return { ...acc, isAvailable: !acc.isAvailable };
      }
      return acc;
    });
    handleSaveAccounts(updated);
  };

  // Duplicate Account
  const handleDuplicateAccount = (account: Account) => {
    sounds.playCoinSound();
    const newId = `GT-${Math.floor(1000 + Math.random() * 9000)}`;
    const duplicated: Account = {
      ...account,
      id: newId,
      title: `${account.title} (Salinan)`,
      isAvailable: true,
      createdAt: new Date().toISOString().split('T')[0],
    };
    handleSaveAccounts([duplicated, ...accounts]);
  };

  // Delete Account
  const handleDeleteAccount = (accountId: string) => {
    if (confirm(`Yakin ingin menghapus akun #${accountId} dari katalog?`)) {
      sounds.playPunchSound();
      const updated = accounts.filter((a) => a.id !== accountId);
      handleSaveAccounts(updated);
    }
  };

  // Add / Edit Account Callback
  const handleSaveAccountForm = (account: Account) => {
    if (editingAccount) {
      const updated = accounts.map((a) => (a.id === account.id ? account : a));
      handleSaveAccounts(updated);
    } else {
      handleSaveAccounts([account, ...accounts]);
    }
    setIsFormOpen(false);
    setEditingAccount(null);
  };

  // Export JSON Backup
  const handleExportBackup = () => {
    sounds.playSuccessSound();
    const jsonStr = exportDataToJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Growtopia-Catalog-Backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON Backup
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importDataFromJson(content);
      if (res.success) {
        sounds.playSuccessSound();
        setAccounts(getStoredAccounts());
        setSettings(getStoredSettings());
        alert(`Berhasil mengimpor ${res.count} akun ke dalam katalog!`);
      } else {
        alert(res.error || 'Gagal mengimpor file backup.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Reset to default sample accounts
  const handleResetToDefault = () => {
    if (confirm('Apakah Anda yakin ingin me-reset katalog ke data contoh awal Growtopia?')) {
      sounds.playSuccessSound();
      const res = resetToDefaultData();
      setAccounts(res.accounts);
      setSettings(res.settings);
    }
  };

  // Filtered accounts for table
  const filteredAccounts = useMemo(() => {
    if (!searchTable) return accounts;
    const q = searchTable.toLowerCase();
    return accounts.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q) ||
        a.loginType.toLowerCase().includes(q) ||
        a.emailStatus.toLowerCase().includes(q)
    );
  }, [accounts, searchTable]);

  // Statistics
  const totalStock = accounts.length;
  const availableStock = accounts.filter((a) => a.isAvailable).length;
  const soldStock = accounts.filter((a) => !a.isAvailable).length;
  const totalValueIdr = accounts
    .filter((a) => a.isAvailable)
    .reduce((sum, a) => sum + a.priceIdr, 0);
  const totalValueDl = formatLocks(totalValueIdr, settings.dlRateIdr);

  // If not authenticated, show PIN login modal
  if (!isAuthenticated) {
    return (
      <AdminLoginModal
        correctPin={settings.adminPin}
        onSuccess={() => setIsAuthenticated(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gt-darker text-gray-100 pb-20">
      
      {/* Admin Top Navbar */}
      <header className="sticky top-0 z-40 bg-gt-dark/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <Link
              href="/"
              onClick={() => sounds.playClickSound()}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-gray-300 hover:text-white border border-slate-800 transition-colors"
              title="Kembali ke Toko Publik"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-pixelHeading text-sm font-bold text-white">
                  ADMIN DASHBOARD
                </span>
                <span className="text-[10px] font-pixel text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30">
                  {settings.storeName}
                </span>
              </div>
              <p className="text-[11px] text-gray-400 hidden sm:block">
                Kelola inventaris akun Growtopia & pengaturan kontak
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                sounds.playClickSound();
                setIsSettingsOpen(true);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
            >
              <Settings className="w-3.5 h-3.5 text-amber-400" />
              <span>Pengaturan Toko</span>
            </button>

            <button
              onClick={() => {
                sounds.playClickSound();
                setIsAuthenticated(false);
              }}
              className="p-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 text-xs border border-rose-800/40 transition-colors"
              title="Keluar dari Admin"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Stat Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-gt-card border border-slate-800 shadow-pixel">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400 font-semibold">Total Akun</span>
              <Package className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono">{totalStock}</div>
            <span className="text-[11px] text-gray-500">Tercatat di katalog</span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-gt-card border border-emerald-500/30 shadow-pixel">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-emerald-400 font-semibold">Ready Stock</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-300 font-mono">{availableStock}</div>
            <span className="text-[11px] text-emerald-500/80">Siap dijual ke buyer</span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-gt-card border border-rose-900/40 shadow-pixel">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-rose-400 font-semibold">Sold Out</span>
              <XCircle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-rose-400 font-mono">{soldStock}</div>
            <span className="text-[11px] text-rose-500/80">Sudah laku terjual</span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-gt-card border border-amber-500/30 shadow-pixel">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-amber-300 font-semibold">Estimasi Nilai Ready</span>
              <DollarSign className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-lg sm:text-xl font-bold text-white font-mono">{formatRupiah(totalValueIdr)}</div>
            <span className="text-[11px] text-amber-400 font-pixel">~{totalValueDl.text}</span>
          </div>

        </div>

        {/* Action Header & Tools */}
        <div className="bg-gt-card border border-slate-800 rounded-2xl p-4 sm:p-5 mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Table */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTable}
              onChange={(e) => setSearchTable(e.target.value)}
              placeholder="Cari kode akun, judul, atau tipe login..."
              className="w-full pl-10 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Quick Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            
            <button
              onClick={() => {
                sounds.playCoinSound();
                setEditingAccount(null);
                setIsFormOpen(true);
              }}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold rounded-xl text-xs shadow-pixel-amber flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Akun Baru</span>
            </button>

            {/* Export Backup JSON */}
            <button
              onClick={handleExportBackup}
              title="Download backup data katalog (JSON)"
              className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-gray-300 hover:text-white border border-slate-700 rounded-xl text-xs flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Backup JSON</span>
            </button>

            {/* Import Backup JSON */}
            <label 
              title="Pulihkan data katalog dari file JSON"
              className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-gray-300 hover:text-white border border-slate-700 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Restore JSON</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportBackup}
                className="hidden"
              />
            </label>

            {/* Reset to Default */}
            <button
              onClick={handleResetToDefault}
              title="Reset ke akun contoh awal"
              className="p-2 bg-slate-900 hover:bg-slate-800 text-gray-400 hover:text-amber-400 border border-slate-700 rounded-xl transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

          </div>

        </div>

        {/* Accounts Management Table */}
        <div className="bg-gt-card border border-slate-800 rounded-2xl overflow-hidden shadow-pixel">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-gray-400 border-b border-slate-800">
                <tr>
                  <th className="p-4 font-semibold">Status / Toggle</th>
                  <th className="p-4 font-semibold">Kode & Judul Akun</th>
                  <th className="p-4 font-semibold">Login / Email</th>
                  <th className="p-4 font-semibold">Level & Role</th>
                  <th className="p-4 font-semibold">Harga (Rp & DL)</th>
                  <th className="p-4 font-semibold text-right">Aksi Kelola</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredAccounts.map((acc) => {
                  const lock = formatLocks(acc.priceIdr, settings.dlRateIdr);
                  return (
                    <tr 
                      key={acc.id}
                      className="hover:bg-slate-900/50 transition-colors"
                    >
                      {/* 1-Click Available / Sold Toggle */}
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleAvailability(acc.id)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase transition-all flex items-center gap-1.5 ${
                            acc.isAvailable
                              ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 hover:bg-rose-950 hover:text-rose-300'
                              : 'bg-rose-950/90 text-rose-300 border border-rose-800 hover:bg-emerald-950 hover:text-emerald-300'
                          }`}
                          title="Klik untuk ubah status Available / Sold Out"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${acc.isAvailable ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                          <span>{acc.isAvailable ? 'AVAILABLE' : 'SOLD OUT'}</span>
                        </button>
                      </td>

                      {/* Code & Title */}
                      <td className="p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono font-bold text-amber-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                            #{acc.id}
                          </span>
                          <span className="text-[11px] text-gray-400">
                            Thn {acc.accountYear}
                          </span>
                        </div>
                        <div className="font-semibold text-white max-w-xs truncate" title={acc.title}>
                          {acc.title}
                        </div>
                      </td>

                      {/* Login Type & Email Status */}
                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold w-fit ${
                            acc.loginType === 'Legacy' 
                              ? 'bg-amber-950 text-amber-300 border border-amber-600/40' 
                              : 'bg-blue-950 text-blue-300 border border-blue-600/40'
                          }`}>
                            Log {acc.loginType}
                          </span>
                          <span className="text-[11px] text-gray-400">
                            {acc.emailStatus}
                          </span>
                        </div>
                      </td>

                      {/* Level & Role */}
                      <td className="p-4">
                        <div className="font-pixel text-[11px] text-amber-300 mb-0.5">
                          Lv. {acc.level}
                        </div>
                        <div className="text-[11px] text-cyan-300">
                          {acc.role}
                        </div>
                      </td>

                      {/* Price */}
                      <td className="p-4">
                        <div className="font-mono font-bold text-white">
                          {formatRupiah(acc.priceIdr)}
                        </div>
                        <div className="text-[10px] font-pixel text-amber-400">
                          {lock.text}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          
                          {/* Duplicate Button */}
                          <button
                            onClick={() => handleDuplicateAccount(acc)}
                            title="Duplikat Akun"
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-gray-400 hover:text-cyan-400 border border-slate-800 transition-colors"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>

                          {/* Edit Button */}
                          <button
                            onClick={() => {
                              sounds.playClickSound();
                              setEditingAccount(acc);
                              setIsFormOpen(true);
                            }}
                            title="Edit Akun"
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-gray-400 hover:text-amber-400 border border-slate-800 transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDeleteAccount(acc.id)}
                            title="Hapus Akun"
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950 text-gray-400 hover:text-rose-400 border border-slate-800 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filteredAccounts.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      Tidak ada akun yang sesuai dengan pencarian tabel.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* Add / Edit Form Modal */}
      {isFormOpen && (
        <AccountFormModal
          accountToEdit={editingAccount}
          settings={settings}
          onSave={handleSaveAccountForm}
          onClose={() => {
            setIsFormOpen(false);
            setEditingAccount(null);
          }}
        />
      )}

      {/* Store Settings Modal */}
      {isSettingsOpen && (
        <StoreSettingsModal
          settings={settings}
          onSave={handleSaveSettings}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}

    </div>
  );
}
