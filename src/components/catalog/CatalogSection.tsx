'use client';

import React, { useState, useMemo } from 'react';
import { Account, StoreSettings } from '../../types/account';
import { AccountCard } from './AccountCard';
import { AccountModal } from './AccountModal';
import { PostGeneratorModal } from '../shared/PostGeneratorModal';
import { sounds } from '../../utils/soundEffects';
import { useLanguage } from '../../context/LanguageContext';
import { PackageSearch, Sparkles, Search, ArrowUpDown, X } from 'lucide-react';

interface CatalogSectionProps {
  accounts: Account[];
  settings: StoreSettings;
}

type SortOption = 'latest' | 'price-asc' | 'price-desc' | 'level-desc';

export const CatalogSection: React.FC<CatalogSectionProps> = ({ accounts, settings }) => {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [postGenAccount, setPostGenAccount] = useState<Account | null>(null);

  // Filter & Sort Logic (Focused entirely on Legacy accounts)
  const filteredAccounts = useMemo(() => {
    return accounts
      .filter((acc) => {
        // Search query
        if (search.trim()) {
          const query = search.toLowerCase().trim();
          const matchTitle = acc.title.toLowerCase().includes(query);
          const matchId = acc.id.toLowerCase().includes(query);
          const matchGrowId = acc.growIdFormat.toLowerCase().includes(query);
          const matchYear = String(acc.accountYear).includes(query);
          const matchQuests = acc.questItems.some((q) => q.toLowerCase().includes(query));
          const matchHighlights = acc.untradeableHighlights.some((h) => h.toLowerCase().includes(query));
          const matchDesc = acc.description.toLowerCase().includes(query);

          if (!matchTitle && !matchId && !matchGrowId && !matchYear && !matchQuests && !matchHighlights && !matchDesc) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') {
          return a.priceIdr - b.priceIdr;
        }
        if (sortBy === 'price-desc') {
          return b.priceIdr - a.priceIdr;
        }
        if (sortBy === 'level-desc') {
          return b.level - a.level;
        }
        // 'latest': available accounts first, then newest creation
        if (a.isAvailable && !b.isAvailable) return -1;
        if (!a.isAvailable && b.isAvailable) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [accounts, search, sortBy]);

  return (
    <section id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-pixel text-amber-600 dark:text-amber-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.catalog.sectionBadge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            {t.catalog.sectionTitle}
          </h2>
          <p className="text-sm text-slate-600 dark:text-gray-400 mt-1">
            {t.catalog.sectionSubtitle}
          </p>
        </div>

        {/* Stock Counter Badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-amber-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{filteredAccounts.length} {t.catalog.totalCountSuffix}</span>
          </span>
        </div>
      </div>

      {/* Clean Minimalist Search & Sort Bar */}
      <div className="bg-white dark:bg-gt-card border border-slate-200 dark:border-slate-800 rounded-2xl p-3 sm:p-4 mb-8 shadow-pixel flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 dark:text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.catalog.searchPlaceholder}
            className="w-full pl-10 pr-9 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
          />
          {search && (
            <button
              onClick={() => {
                sounds.playClickSound();
                setSearch('');
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-slate-400 hover:text-slate-600 dark:text-gray-400 dark:hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-gray-400 pl-1">
            <ArrowUpDown className="w-3.5 h-3.5" />
          </div>
          <select
            value={sortBy}
            onChange={(e) => {
              sounds.playClickSound();
              setSortBy(e.target.value as SortOption);
            }}
            className="px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-gray-200 font-medium focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
          >
            <option value="latest">{t.catalog.sortLatest}</option>
            <option value="price-asc">{t.catalog.sortPriceAsc}</option>
            <option value="price-desc">{t.catalog.sortPriceDesc}</option>
            <option value="level-desc">{t.catalog.sortLevelDesc}</option>
          </select>
        </div>

      </div>

      {/* Accounts Grid */}
      {filteredAccounts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredAccounts.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
              settings={settings}
              onSelectDetail={(acc) => setSelectedAccount(acc)}
              onQuickShare={(acc) => setPostGenAccount(acc)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 rounded-3xl bg-white dark:bg-gt-card border border-slate-200 dark:border-slate-800">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-gray-500">
            <PackageSearch className="w-8 h-8 text-amber-500 dark:text-amber-400/60" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            {t.catalog.emptyTitle}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-gray-400 max-w-md mx-auto mb-6">
            {t.catalog.emptyDesc}
          </p>
          <button
            onClick={() => {
              sounds.playClickSound();
              setSearch('');
            }}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shadow-pixel-amber transition-all"
          >
            {t.catalog.emptyReset}
          </button>
        </div>
      )}

      {/* Detail Modal */}
      {selectedAccount && (
        <AccountModal
          account={selectedAccount}
          settings={settings}
          onClose={() => setSelectedAccount(null)}
          onOpenPostGenerator={(acc) => setPostGenAccount(acc)}
        />
      )}

      {/* Post Generator Modal */}
      {postGenAccount && (
        <PostGeneratorModal
          account={postGenAccount}
          settings={settings}
          onClose={() => setPostGenAccount(null)}
        />
      )}

    </section>
  );
};
