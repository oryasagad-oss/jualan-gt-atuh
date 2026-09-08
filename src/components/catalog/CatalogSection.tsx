'use client';

import React, { useState, useMemo } from 'react';
import { Account, AccountCategory, StoreSettings } from '../../types/account';
import { AccountCard } from './AccountCard';
import { AccountModal } from './AccountModal';
import { PostGeneratorModal } from '../shared/PostGeneratorModal';
import { sounds } from '../../utils/soundEffects';
import { useLanguage } from '../../context/LanguageContext';
import { PackageSearch, Sparkles, Search, ArrowUpDown, X, Tag } from 'lucide-react';

interface CatalogSectionProps {
  accounts: Account[];
  settings: StoreSettings;
}

type SortOption = 'latest' | 'price-asc' | 'price-desc' | 'level-desc';

export function getAccountCategories(acc: Account): AccountCategory[] {
  if (Array.isArray(acc.categories) && acc.categories.length > 0) {
    return acc.categories;
  }
  if (Array.isArray(acc.category)) {
    return acc.category;
  }
  if (typeof acc.category === 'string' && acc.category) {
    return [acc.category];
  }
  if (acc.role === 'Super Supporter') {
    return ['Super Supporter'];
  }
  const lower = (acc.title + ' ' + acc.description).toLowerCase();
  if (lower.includes('role') || lower.includes('doctor') || lower.includes('chef') || lower.includes('farmer')) {
    return ['Roles'];
  }
  return ['Plain / Polosan'];
}

export function getAccountCategory(acc: Account): AccountCategory {
  return getAccountCategories(acc)[0] || 'Plain / Polosan';
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({ accounts, settings }) => {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | AccountCategory>('All');
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [postGenAccount, setPostGenAccount] = useState<Account | null>(null);

  // Filter & Sort Logic
  const filteredAccounts = useMemo(() => {
    return accounts
      .filter((acc) => {
        // Multi-Category filter: matches if the account belongs to the selected category
        if (selectedCategory !== 'All' && !getAccountCategories(acc).includes(selectedCategory)) {
          return false;
        }

        // Search query
        if (search.trim()) {
          const query = search.toLowerCase().trim();
          const matchTitle = acc.title.toLowerCase().includes(query);
          const matchId = acc.id.toLowerCase().includes(query);
          const matchGrowId = acc.growIdFormat.toLowerCase().includes(query);
          const matchDays = acc.accountDays ? acc.accountDays.toLowerCase().includes(query) : false;
          const matchYear = String(acc.accountYear || '').includes(query);
          const matchCategory = getAccountCategories(acc).some(c => c.toLowerCase().includes(query));
          const matchQuests = acc.questItems.some((q) => q.toLowerCase().includes(query));
          const matchHighlights = acc.untradeableHighlights.some((h) => h.toLowerCase().includes(query));
          const matchDesc = acc.description.toLowerCase().includes(query);

          if (!matchTitle && !matchId && !matchGrowId && !matchDays && !matchYear && !matchCategory && !matchQuests && !matchHighlights && !matchDesc) {
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

      {/* Category Filter Tabs (3 Primary Categories: Plain / Polosan, Super Supporter, Roles) */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-8">
        {[
          { key: 'All', label: t.catalog.categoryAll, icon: '🌟' },
          { key: 'Plain / Polosan', label: t.catalog.categoryPlain, icon: '📦' },
          { key: 'Super Supporter', label: t.catalog.categorySuperSupporter, icon: '👑' },
          { key: 'Roles', label: t.catalog.categoryRoles, icon: '🎖️' },
        ].map((cat) => {
          const count = cat.key === 'All'
            ? accounts.length
            : accounts.filter((a) => getAccountCategories(a).includes(cat.key as AccountCategory)).length;
          const isActive = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => {
                sounds.playClickSound();
                setSelectedCategory(cat.key as any);
              }}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                isActive
                  ? 'bg-amber-500 text-black border-amber-400 shadow-pixel-amber scale-[1.02]'
                  : 'bg-white dark:bg-gt-card text-slate-700 dark:text-gray-300 border-slate-200 dark:border-slate-800 hover:border-amber-400/60 hover:text-black dark:hover:text-white'
              }`}
            >
              <span className="text-xs">{cat.icon}</span>
              <span>{cat.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono ${
                  isActive
                    ? 'bg-black/20 text-black font-extrabold'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-gray-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
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
