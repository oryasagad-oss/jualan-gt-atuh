import { Account, StoreSettings } from '../types/account';
import { SAMPLE_ACCOUNTS, DEFAULT_STORE_SETTINGS } from '../data/initialAccounts';
import { supabase } from './supabase';

const ACCOUNTS_STORAGE_KEY = 'wicstore_accounts_v2';
const SETTINGS_STORAGE_KEY = 'wicstore_settings_v2';

// -------------------------------------------------------------
// Synchronous Local Cache (Immediate UI response without flash)
// -------------------------------------------------------------
export function getStoredAccounts(): Account[] {
  if (typeof window === 'undefined') return SAMPLE_ACCOUNTS;
  try {
    let raw = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
    if (!raw) {
      const legacy = localStorage.getItem('gt_store_accounts_v1');
      if (legacy) {
        localStorage.setItem(ACCOUNTS_STORAGE_KEY, legacy);
        raw = legacy;
      }
    }
    if (!raw) {
      localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(SAMPLE_ACCOUNTS));
      return SAMPLE_ACCOUNTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : SAMPLE_ACCOUNTS;
  } catch (err) {
    console.error('Failed to parse cached accounts:', err);
    return SAMPLE_ACCOUNTS;
  }
}

export function getStoredSettings(): StoreSettings {
  if (typeof window === 'undefined') return DEFAULT_STORE_SETTINGS;
  try {
    let raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) {
      const legacy = localStorage.getItem('gt_store_settings_v1');
      if (legacy) {
        localStorage.setItem(SETTINGS_STORAGE_KEY, legacy);
        raw = legacy;
      }
    }
    if (!raw) {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(DEFAULT_STORE_SETTINGS));
      return DEFAULT_STORE_SETTINGS;
    }
    return { ...DEFAULT_STORE_SETTINGS, ...JSON.parse(raw) };
  } catch (err) {
    console.error('Failed to parse cached settings:', err);
    return DEFAULT_STORE_SETTINGS;
  }
}

// -------------------------------------------------------------
// Cloud Database (Supabase) Async Fetchers & Sync
// -------------------------------------------------------------
export async function fetchAccounts(): Promise<Account[]> {
  try {
    const { data, error } = await supabase
      .from('store_data')
      .select('value')
      .eq('key', 'accounts')
      .maybeSingle();

    if (error) {
      console.warn('Supabase fetch accounts error, falling back to cache:', error.message);
      return getStoredAccounts();
    }

    if (data && Array.isArray(data.value)) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(data.value));
      }
      return data.value as Account[];
    }

    // Seed default accounts to Supabase if empty
    await saveStoredAccounts(SAMPLE_ACCOUNTS);
    return SAMPLE_ACCOUNTS;
  } catch (err) {
    console.error('Failed to fetch accounts from Supabase:', err);
    return getStoredAccounts();
  }
}

export async function saveStoredAccounts(accounts: Account[]): Promise<void> {
  // 1. Save to local cache immediately
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
    } catch (err) {
      console.error('Failed to cache accounts locally:', err);
    }
  }

  // 2. Persist to Supabase Cloud Database
  try {
    const { error } = await supabase
      .from('store_data')
      .upsert({
        key: 'accounts',
        value: accounts,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Failed to save accounts to Supabase:', error.message);
    }
  } catch (err) {
    console.error('Network error saving accounts to Supabase:', err);
  }
}

export interface GtidDlRateData {
  buy: number;
  sell: number;
  average: number;
  buyBgl: number;
  sellBgl: number;
  spread: { dl: number; bgl: number };
  posts24h?: number;
  sources?: number;
  updatedAt: string;
}

export async function fetchLiveGtidDlRate(): Promise<GtidDlRateData | null> {
  // 1. Try our internal Next.js API proxy route first (bypasses CORS & caches)
  try {
    const res = await fetch('/api/dl-rate', { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return json.data as GtidDlRateData;
      }
    }
  } catch {
    // If running in an environment where /api is not reached or direct fallback needed
  }

  // 2. Direct fallback to official GTID endpoints
  const fallbackUrls = ['https://api.gtid.pro/price', 'https://gtid.pro/price'];
  for (const url of fallbackUrls) {
    try {
      const directRes = await fetch(url, { cache: 'no-store' });
      if (directRes.ok) {
        const data = await directRes.json();
        if (data && typeof data.buy === 'number' && typeof data.sell === 'number') {
          const buy = Math.round(data.buy);
          const sell = Math.round(data.sell);
          const average = Math.round((buy + sell) / 2);
          const buyBgl = Math.round(data.buyBgl || buy * 100);
          const sellBgl = Math.round(data.sellBgl || sell * 100);
          return {
            buy,
            sell,
            average,
            buyBgl,
            sellBgl,
            spread: data.spread || { dl: sell - buy, bgl: sellBgl - buyBgl },
            posts24h: data.posts24h,
            sources: data.sources,
            updatedAt: data.updatedAt || new Date().toISOString(),
          };
        }
      }
    } catch {
      // Continue to next url
    }
  }

  return null;
}

export async function syncDlRateWithGtid(
  currentSettings: StoreSettings,
  force: boolean = false
): Promise<StoreSettings> {
  const isAuto = currentSettings.autoSyncDlRate !== false;
  if (!isAuto && !force) return currentSettings;

  try {
    const liveData = await fetchLiveGtidDlRate();
    if (!liveData) return currentSettings;

    const source = currentSettings.dlRateSource || 'buy';
    const targetRate = source === 'sell' ? liveData.sell : source === 'average' ? liveData.average : liveData.buy;

    if (targetRate && targetRate > 0) {
      const updated: StoreSettings = {
        ...currentSettings,
        dlRateIdr: targetRate,
        dlRateLastSyncedAt: new Date().toISOString(),
        dlRateLiveInfo: {
          buy: liveData.buy,
          sell: liveData.sell,
          buyBgl: liveData.buyBgl,
          sellBgl: liveData.sellBgl,
          updatedAt: liveData.updatedAt,
        },
      };

      await saveStoredSettings(updated);
      return updated;
    }
  } catch (err) {
    console.warn('Failed to sync DL rate with GTID:', err);
  }

  return currentSettings;
}

export async function fetchSettings(): Promise<StoreSettings> {
  try {
    const { data, error } = await supabase
      .from('store_data')
      .select('value')
      .eq('key', 'settings')
      .maybeSingle();

    if (error) {
      console.warn('Supabase fetch settings error, falling back to cache:', error.message);
      return getStoredSettings();
    }

    if (data && data.value) {
      const merged: StoreSettings = { ...DEFAULT_STORE_SETTINGS, ...data.value };

      // Background auto-sync if enabled and last synced was > 5 minutes ago
      if (merged.autoSyncDlRate !== false) {
        const lastSync = merged.dlRateLastSyncedAt ? new Date(merged.dlRateLastSyncedAt).getTime() : 0;
        const now = Date.now();
        const fiveMinutes = 5 * 60 * 1000;

        if (now - lastSync > fiveMinutes) {
          // Trigger non-blocking background sync
          syncDlRateWithGtid(merged).catch((e) => console.warn('Background sync error:', e));
        }
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(merged));
      }
      return merged as StoreSettings;
    }

    // Seed default settings to Supabase if empty
    await saveStoredSettings(DEFAULT_STORE_SETTINGS);
    return DEFAULT_STORE_SETTINGS;
  } catch (err) {
    console.error('Failed to fetch settings from Supabase:', err);
    return getStoredSettings();
  }
}

export async function saveStoredSettings(settings: StoreSettings): Promise<void> {
  // 1. Save to local cache immediately
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch (err) {
      console.error('Failed to cache settings locally:', err);
    }
  }

  // 2. Persist to Supabase Cloud Database
  try {
    const { error } = await supabase
      .from('store_data')
      .upsert({
        key: 'settings',
        value: settings,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Failed to save settings to Supabase:', error.message);
    }
  } catch (err) {
    console.error('Network error saving settings to Supabase:', err);
  }
}

// -------------------------------------------------------------
// Realtime Subscription (Live sync across devices)
// -------------------------------------------------------------
export function subscribeToCloudUpdates(
  onUpdate: (key: 'accounts' | 'settings', value: any) => void
): () => void {
  try {
    const channel = supabase
      .channel('store_data_realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'store_data' },
        (payload: any) => {
          if (payload.new && payload.new.key) {
            const key = payload.new.key as 'accounts' | 'settings';
            const value = payload.new.value;
            if (key === 'accounts' && Array.isArray(value)) {
              if (typeof window !== 'undefined') {
                localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(value));
              }
              onUpdate('accounts', value);
            } else if (key === 'settings' && value) {
              const merged = { ...DEFAULT_STORE_SETTINGS, ...value };
              if (typeof window !== 'undefined') {
                localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(merged));
              }
              onUpdate('settings', merged);
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  } catch (err) {
    console.warn('Realtime subscription failed:', err);
    return () => {};
  }
}

export async function resetToDefaultData(): Promise<{ accounts: Account[]; settings: StoreSettings }> {
  await saveStoredAccounts(SAMPLE_ACCOUNTS);
  await saveStoredSettings(DEFAULT_STORE_SETTINGS);
  return { accounts: SAMPLE_ACCOUNTS, settings: DEFAULT_STORE_SETTINGS };
}

export function exportDataToJson(): string {
  const data = {
    exportDate: new Date().toISOString(),
    settings: getStoredSettings(),
    accounts: getStoredAccounts(),
  };
  return JSON.stringify(data, null, 2);
}

export async function importDataFromJson(jsonStr: string): Promise<{ success: boolean; error?: string; count?: number }> {
  try {
    const data = JSON.parse(jsonStr);
    if (!data || !Array.isArray(data.accounts)) {
      return { success: false, error: 'Format file JSON tidak valid. Properti "accounts" tidak ditemukan.' };
    }
    await saveStoredAccounts(data.accounts);
    if (data.settings) {
      await saveStoredSettings(data.settings);
    }
    return { success: true, count: data.accounts.length };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, error: `Gagal membaca file JSON: ${message}` };
  }
}
