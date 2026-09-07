'use client';

import React, { useState } from 'react';
import { Account, LoginType, EmailStatus, RoleStatus, StoreSettings } from '../../types/account';
import { formatLocks, formatRupiah } from '../../utils/formatters';
import { sounds } from '../../utils/soundEffects';
import { X, Upload, Plus, Trash2, Image as ImageIcon, Sparkles, Check, Info } from 'lucide-react';

interface AccountFormModalProps {
  accountToEdit?: Account | null;
  settings: StoreSettings;
  onSave: (account: Account) => void;
  onClose: () => void;
}

export const AccountFormModal: React.FC<AccountFormModalProps> = ({
  accountToEdit,
  settings,
  onSave,
  onClose,
}) => {
  const isEdit = !!accountToEdit;

  const [formData, setFormData] = useState<Account>({
    id: accountToEdit?.id || `GT-${Math.floor(1000 + Math.random() * 9000)}`,
    title: accountToEdit?.title || '',
    loginType: accountToEdit?.loginType || 'Legacy',
    emailStatus: accountToEdit?.emailStatus || 'Clean Gmail',
    isAvailable: accountToEdit ? accountToEdit.isAvailable : true,
    level: accountToEdit?.level || 50,
    expPercent: accountToEdit?.expPercent || 0,
    growIdFormat: accountToEdit?.growIdFormat || 'Clean 5 Letter (No Numbers)',
    role: accountToEdit?.role || 'Supporter',
    accountYear: accountToEdit?.accountYear || 2017,
    backpackSlots: accountToEdit?.backpackSlots || 40,
    worldCount: accountToEdit?.worldCount || 5,
    priceIdr: accountToEdit?.priceIdr || 450000,
    questItems: accountToEdit?.questItems || ['Focused Eyes', 'Ringmaster (10 Rings)'],
    untradeableHighlights: accountToEdit?.untradeableHighlights || ['Clean Email 1st Hand', 'Growtokens: 50+'],
    images: accountToEdit?.images || [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80'
    ],
    description: accountToEdit?.description || 'Akun siap pakai, email clean amanah tanpa risiko minus.',
    createdAt: accountToEdit?.createdAt || new Date().toISOString().split('T')[0],
    notes: accountToEdit?.notes || 'Bisa Rekber GTID / GTMART',
  });

  const [imageUrlInput, setImageUrlInput] = useState('');
  const [questInput, setQuestInput] = useState('');
  const [highlightInput, setHighlightInput] = useState('');

  // Handle local image file upload (convert to Base64)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setFormData((prev) => ({
            ...prev,
            images: [...prev.images, reader.result as string],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
    sounds.playCoinSound();
  };

  const handleAddImageUrl = () => {
    if (!imageUrlInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, imageUrlInput.trim()],
    }));
    setImageUrlInput('');
    sounds.playClickSound();
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleAddQuestItem = () => {
    if (!questInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      questItems: [...prev.questItems, questInput.trim()],
    }));
    setQuestInput('');
    sounds.playClickSound();
  };

  const handleRemoveQuestItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      questItems: prev.questItems.filter((_, i) => i !== index),
    }));
  };

  const handleAddHighlight = () => {
    if (!highlightInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      untradeableHighlights: [...prev.untradeableHighlights, highlightInput.trim()],
    }));
    setHighlightInput('');
    sounds.playClickSound();
  };

  const handleRemoveHighlight = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      untradeableHighlights: prev.untradeableHighlights.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Judul akun wajib diisi!');
      return;
    }
    sounds.playSuccessSound();
    onSave(formData);
  };

  const lockInfo = formatLocks(formData.priceIdr, settings.dlRateIdr);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-gt-card border border-slate-700 rounded-3xl overflow-hidden shadow-pixel-lg my-6 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>{isEdit ? `Edit Akun #${formData.id}` : 'Tambah Akun Baru ke Katalog'}</span>
            </h3>
            <p className="text-xs text-gray-400">
              Isi form spesifikasi akun Growtopia di bawah ini
            </p>
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

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6">
          
          {/* Availability Toggle Switch */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-200">Status Ketersediaan Akun:</span>
              <p className="text-[11px] text-gray-400">
                Ubah status akun menjadi Sold Out saat sudah laku terjual
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sounds.playClickSound();
                setFormData((prev) => ({ ...prev, isAvailable: !prev.isAvailable }));
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                formData.isAvailable
                  ? 'bg-emerald-600 text-white shadow-pixel-green'
                  : 'bg-rose-950 text-rose-300 border border-rose-800'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${formData.isAvailable ? 'bg-white animate-pulse' : 'bg-rose-500'}`} />
              <span>{formData.isAvailable ? 'AVAILABLE (READY STOCK)' : 'SOLD OUT (TERJUAL)'}</span>
            </button>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Kode Akun:
              </label>
              <input
                type="text"
                required
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Judul Akun (Headline Promo):
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Contoh: Akun Old 2016 Ringmaster + 4 Ances Level 88"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>
          </div>

          {/* Login Type & Email Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Tipe Login:
              </label>
              <select
                value={formData.loginType}
                onChange={(e) => setFormData({ ...formData, loginType: e.target.value as LoginType })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
              >
                <option value="Legacy">Log Legacy (GrowID + Password Murni)</option>
                <option value="Gmail">Log Gmail (First Hand Clean)</option>
                <option value="Ubisoft">Ubisoft Connect</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Status Email & Keamanan:
              </label>
              <select
                value={formData.emailStatus}
                onChange={(e) => setFormData({ ...formData, emailStatus: e.target.value as EmailStatus })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
              >
                <option value="Clean Gmail">Clean Gmail (Akun Google Dikasih Tuntas)</option>
                <option value="Changeable">Changeable Email (Bisa Langsung Diganti)</option>
                <option value="Dummy Email">Dummy Email (Email Mati / Akses Terbatas)</option>
              </select>
            </div>
          </div>

          {/* Level, GrowID, Role, Year */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Level Akun:
              </label>
              <input
                type="number"
                min="1"
                max="125"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Role / Supporter:
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as RoleStatus })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
              >
                <option value="None">None</option>
                <option value="Supporter">Supporter</option>
                <option value="Super Supporter">Super Supporter</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Tahun Pembuatan:
              </label>
              <input
                type="number"
                value={formData.accountYear}
                onChange={(e) => setFormData({ ...formData, accountYear: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Format GrowID:
              </label>
              <input
                type="text"
                value={formData.growIdFormat}
                onChange={(e) => setFormData({ ...formData, growIdFormat: e.target.value })}
                placeholder="misal: 4 Letter Clean"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>
          </div>

          {/* Slots & Worlds */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Backpack Slots:
              </label>
              <input
                type="number"
                value={formData.backpackSlots}
                onChange={(e) => setFormData({ ...formData, backpackSlots: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Jumlah World / World Lock:
              </label>
              <input
                type="number"
                value={formData.worldCount}
                onChange={(e) => setFormData({ ...formData, worldCount: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>
          </div>

          {/* Price & DL Auto Calculator */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/30 to-slate-950 border border-amber-500/30">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1">
                  Harga Akun (Rupiah IDR):
                </label>
                <input
                  type="number"
                  step="10000"
                  required
                  value={formData.priceIdr}
                  onChange={(e) => setFormData({ ...formData, priceIdr: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 bg-slate-950 border border-amber-500/50 rounded-xl text-sm font-bold text-white font-mono"
                />
              </div>

              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-[11px] text-gray-400">Kalkulasi Otomatis Lock:</span>
                <div className="text-sm sm:text-base font-pixel text-amber-400 font-bold mt-0.5">
                  {lockInfo.text}
                </div>
                <div className="text-[10px] text-gray-500">
                  Berdasarkan kurs 1 DL = {formatRupiah(settings.dlRateIdr)}
                </div>
              </div>
            </div>
          </div>

          {/* Screenshot Upload & URLs */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-gray-300">
              Galeri Screenshot Akun (Bisa Upload atau Masukkan URL):
            </label>

            {/* Input URL or File */}
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="url"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                placeholder="Tempel URL gambar (https://...)"
                className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
              />
              <button
                type="button"
                onClick={handleAddImageUrl}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-gray-200 text-xs font-semibold rounded-xl"
              >
                + Tambah URL
              </button>
              
              <label className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl cursor-pointer flex items-center justify-center gap-1.5 shadow-pixel-blue">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Foto</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Image Preview Grid */}
            {formData.images.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-2">
                {formData.images.map((img, idx) => (
                  <div key={idx} className="relative group rounded-lg overflow-hidden border border-slate-700 aspect-video bg-black">
                    <img src={img} alt="preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute inset-0 bg-red-950/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quest Items Tag Manager */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Quest & Ring Items:
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={questInput}
                onChange={(e) => setQuestInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddQuestItem();
                  }
                }}
                placeholder="Contoh: Ringmaster (10 Rings), Focused Eyes, Ances Lv 4"
                className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
              />
              <button
                type="button"
                onClick={handleAddQuestItem}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs rounded-xl"
              >
                + Tambah
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {formData.questItems.map((item, idx) => (
                <span key={idx} className="text-xs px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-amber-300 flex items-center gap-1.5">
                  <span>{item}</span>
                  <button type="button" onClick={() => handleRemoveQuestItem(idx)} className="text-gray-500 hover:text-red-400">
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Description & Seller Notes */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Deskripsi Akun:
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Catatan Penjual / Garansi:
              </label>
              <input
                type="text"
                value={formData.notes || ''}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Contoh: Garansi seumur hidup untuk clean email / Siap rekber GTID"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>
          </div>

          {/* Form Actions */}
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
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-bold text-xs shadow-pixel-amber"
            >
              {isEdit ? 'SIMPAN PERUBAHAN AKUN' : 'PUBLIKASIKAN KE KATALOG'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
