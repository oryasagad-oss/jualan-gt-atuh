'use client';

import React from 'react';
import { FilterState, LoginType, EmailStatus } from '../../types/account';
import { formatRupiah, formatLocks } from '../../utils/formatters';
import { sounds } from '../../utils/soundEffects';
import { Search, SlidersHorizontal, RotateCcw, Sparkles, Filter, Check } from 'lucide-react';

interface FilterBarProps {
  filter: FilterState;
  onFilterChange: (newFilter: FilterState) => void;
  onResetFilter: () => void;
  dlRate: number;
  totalResults: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  onFilterChange,
  onResetFilter,
  dlRate,
  totalResults,
}) => {
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filter, search: e.target.value });
  };

  const handleLoginTypeChange = (type: 'All' | LoginType) => {
    sounds.playClickSound();
    onFilterChange({ ...filter, loginType: type });
  };

  const handleEmailStatusChange = (status: 'All' | EmailStatus) => {
    sounds.playClickSound();
    onFilterChange({ ...filter, emailStatus: status });
  };

  const handleAvailabilityChange = (avail: 'All' | 'Available' | 'SoldOut') => {
    sounds.playClickSound();
    onFilterChange({ ...filter, availability: avail });
  };

  const handleQuickTagClick = (tag: string) => {
    sounds.playClickSound();
    if (tag === 'legacy') {
      onFilterChange({ ...filter, loginType: 'Legacy' });
    } else if (tag === 'gmail') {
      onFilterChange({ ...filter, loginType: 'Gmail' });
    } else if (tag === 'ringmaster') {
      onFilterChange({ ...filter, search: 'Ringmaster' });
    } else if (tag === 'old') {
      onFilterChange({ ...filter, search: '2015 2016' });
    } else if (tag === 'highlevel') {
      onFilterChange({ ...filter, minLevel: 75 });
    } else if (tag === 'under500k') {
      onFilterChange({ ...filter, maxPriceIdr: 500000 });
    }
  };

  return (
    <div className="bg-gt-card border border-gt-cardBorder rounded-2xl p-4 sm:p-6 mb-8 shadow-pixel">
      
      {/* Top Search & Primary Actions */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between mb-5">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={filter.search}
            onChange={handleSearchChange}
            placeholder="Cari akun (contoh: 'Ringmaster', 'Clean ID', 'Old 2016', 'Lv 80', 'Legacy')..."
            className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
          />
          {filter.search && (
            <button
              onClick={() => onFilterChange({ ...filter, search: '' })}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white text-xs font-semibold"
            >
              Clear
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          
          {/* Toggle Advanced Filters */}
          <button
            onClick={() => {
              sounds.playClickSound();
              setShowAdvanced(!showAdvanced);
            }}
            className={`px-4 py-3 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
              showAdvanced 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                : 'bg-slate-800/80 hover:bg-slate-800 text-gray-300 border-slate-700'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filter Detail</span>
            {(filter.minLevel > 1 || filter.maxPriceIdr < 2500000 || filter.emailStatus !== 'All' || filter.availability !== 'All') && (
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            )}
          </button>

          {/* Reset Filter Button */}
          <button
            onClick={() => {
              sounds.playClickSound();
              onResetFilter();
            }}
            title="Reset Semua Filter"
            className="p-3 bg-slate-800/80 hover:bg-slate-800 text-gray-400 hover:text-white border border-slate-700 rounded-xl transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Sort By Select */}
          <select
            value={filter.sortBy}
            onChange={(e) => onFilterChange({ ...filter, sortBy: e.target.value as FilterState['sortBy'] })}
            className="py-3 px-3.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-gray-200 focus:outline-none focus:border-amber-500"
          >
            <option value="latest">Terbaru Ditambahkan</option>
            <option value="price-asc">Harga: Terendah ke Tertinggi</option>
            <option value="price-desc">Harga: Tertinggi ke Terendah</option>
            <option value="level-desc">Level Tertinggi</option>
          </select>

        </div>

      </div>

      {/* Main Filter Tabs (Login Type & Availability) */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        
        {/* Login Type Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="text-xs text-gray-400 font-medium mr-1 hidden sm:inline">Tipe Login:</span>
          
          <button
            onClick={() => handleLoginTypeChange('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter.loginType === 'All'
                ? 'bg-slate-700 text-white shadow-sm'
                : 'bg-slate-900/60 text-gray-400 hover:text-gray-200 border border-slate-800'
            }`}
          >
            Semua Login
          </button>

          <button
            onClick={() => handleLoginTypeChange('Legacy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              filter.loginType === 'Legacy'
                ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-pixel-amber'
                : 'bg-amber-950/30 text-amber-300/80 hover:text-amber-200 border border-amber-500/30'
            }`}
          >
            <span className="font-pixel text-[9px]">👑</span>
            <span>Log Legacy</span>
          </button>

          <button
            onClick={() => handleLoginTypeChange('Gmail')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              filter.loginType === 'Gmail'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-pixel-blue'
                : 'bg-blue-950/30 text-blue-300/80 hover:text-blue-200 border border-blue-500/30'
            }`}
          >
            <span className="font-pixel text-[9px]">📧</span>
            <span>Log Gmail</span>
          </button>

          <button
            onClick={() => handleLoginTypeChange('Ubisoft')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter.loginType === 'Ubisoft'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-purple-950/30 text-purple-300/80 hover:text-purple-200 border border-purple-500/30'
            }`}
          >
            Ubisoft Connect
          </button>
        </div>

        {/* Availability Toggle */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => handleAvailabilityChange('All')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              filter.availability === 'All' ? 'bg-slate-800 text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Semua
          </button>
          <button
            onClick={() => handleAvailabilityChange('Available')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
              filter.availability === 'Available' ? 'bg-emerald-600 text-white' : 'text-emerald-400 hover:text-emerald-300'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Ready Stock
          </button>
          <button
            onClick={() => handleAvailabilityChange('SoldOut')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              filter.availability === 'SoldOut' ? 'bg-rose-900 text-rose-200' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            Sold Out
          </button>
        </div>

      </div>

      {/* Quick Filter Tags */}
      <div className="flex flex-wrap items-center gap-2 pt-3">
        <span className="text-[11px] text-gray-400 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" />
          Populer:
        </span>
        
        <button
          onClick={() => handleQuickTagClick('ringmaster')}
          className="text-xs px-2.5 py-0.5 rounded-full bg-slate-900 hover:bg-slate-800 text-gray-300 border border-slate-700/80 transition-colors"
        >
          💍 Ringmaster Full
        </button>

        <button
          onClick={() => handleQuickTagClick('old')}
          className="text-xs px-2.5 py-0.5 rounded-full bg-slate-900 hover:bg-slate-800 text-gray-300 border border-slate-700/80 transition-colors"
        >
          ⏳ Old 2015-2016
        </button>

        <button
          onClick={() => handleQuickTagClick('highlevel')}
          className="text-xs px-2.5 py-0.5 rounded-full bg-slate-900 hover:bg-slate-800 text-gray-300 border border-slate-700/80 transition-colors"
        >
          ⚡ Level 75+
        </button>

        <button
          onClick={() => handleQuickTagClick('under500k')}
          className="text-xs px-2.5 py-0.5 rounded-full bg-slate-900 hover:bg-slate-800 text-gray-300 border border-slate-700/80 transition-colors"
        >
          💰 Under 500k
        </button>
      </div>

      {/* Advanced Filter Collapse Panel */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fadeIn">
          
          {/* Email Status Filter */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2">
              Status Email Akun:
            </label>
            <div className="flex flex-col gap-1.5">
              {(['All', 'Clean Gmail', 'Changeable', 'Dummy Email'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => handleEmailStatusChange(status)}
                  className={`px-3 py-1.5 text-xs rounded-lg text-left transition-colors flex items-center justify-between ${
                    filter.emailStatus === status 
                      ? 'bg-blue-900/50 text-blue-200 border border-blue-500/40 font-semibold' 
                      : 'bg-slate-900/60 text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <span>{status === 'All' ? 'Semua Status Email' : status}</span>
                  {filter.emailStatus === status && <Check className="w-3.5 h-3.5 text-blue-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* Level Filter */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-gray-300 mb-2">
              <span>Minimal Level Akun:</span>
              <span className="text-amber-400 font-pixel">Lv. {filter.minLevel}</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              step="5"
              value={filter.minLevel}
              onChange={(e) => onFilterChange({ ...filter, minLevel: Number(e.target.value) })}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-500 mt-1">
              <span>Lv. 1</span>
              <span>Lv. 50</span>
              <span>Lv. 100</span>
            </div>
          </div>

          {/* Max Price Range */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-gray-300 mb-2">
              <span>Maksimal Harga:</span>
              <span className="text-emerald-400 font-mono font-bold">
                {filter.maxPriceIdr >= 2500000 ? 'Tanpa Batas' : formatRupiah(filter.maxPriceIdr)}
              </span>
            </div>
            <input
              type="range"
              min="200000"
              max="2500000"
              step="50000"
              value={filter.maxPriceIdr}
              onChange={(e) => onFilterChange({ ...filter, maxPriceIdr: Number(e.target.value) })}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-500 mt-1">
              <span>200k</span>
              <span>1 Jt</span>
              <span>2.5 Jt+</span>
            </div>
            {filter.maxPriceIdr < 2500000 && (
              <p className="text-[11px] text-gray-400 mt-1">
                Ekuivalen: <span className="text-amber-300 font-medium">~{formatLocks(filter.maxPriceIdr, dlRate).text}</span>
              </p>
            )}
          </div>

        </div>
      )}

      {/* Result Count Info Bar */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-gray-400">
        <div>
          Menampilkan <span className="text-white font-bold">{totalResults}</span> akun siap dipinang
        </div>
        <div className="text-[11px] text-gray-500">
          Kurs Acuan: <span className="text-amber-400/90 font-mono">1 DL = {formatRupiah(dlRate)}</span>
        </div>
      </div>

    </div>
  );
};
