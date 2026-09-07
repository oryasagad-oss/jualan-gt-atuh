import { Account, StoreSettings } from '../types/account';
import { SAMPLE_ACCOUNTS, DEFAULT_STORE_SETTINGS } from '../data/initialAccounts';

const ACCOUNTS_STORAGE_KEY = 'wicstore_accounts_v2';
const SETTINGS_STORAGE_KEY = 'wicstore_settings_v2';

export function getStoredAccounts(): Account[] {
  if (typeof window === 'undefined') return SAMPLE_ACCOUNTS;
  try {
    const raw = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(SAMPLE_ACCOUNTS));
      return SAMPLE_ACCOUNTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : SAMPLE_ACCOUNTS;
  } catch (err) {
    console.error('Failed to parse stored accounts:', err);
    return SAMPLE_ACCOUNTS;
  }
}

export function saveStoredAccounts(accounts: Account[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
  } catch (err) {
    console.error('Failed to save accounts to storage:', err);
  }
}

export function getStoredSettings(): StoreSettings {
  if (typeof window === 'undefined') return DEFAULT_STORE_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(DEFAULT_STORE_SETTINGS));
      return DEFAULT_STORE_SETTINGS;
    }
    return { ...DEFAULT_STORE_SETTINGS, ...JSON.parse(raw) };
  } catch (err) {
    console.error('Failed to parse stored settings:', err);
    return DEFAULT_STORE_SETTINGS;
  }
}

export function saveStoredSettings(settings: StoreSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save settings to storage:', err);
  }
}

export function resetToDefaultData(): { accounts: Account[]; settings: StoreSettings } {
  if (typeof window !== 'undefined') {
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(SAMPLE_ACCOUNTS));
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(DEFAULT_STORE_SETTINGS));
  }
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

export function importDataFromJson(jsonStr: string): { success: boolean; error?: string; count?: number } {
  try {
    const data = JSON.parse(jsonStr);
    if (!data || !Array.isArray(data.accounts)) {
      return { success: false, error: 'Format file JSON tidak valid. Properti "accounts" tidak ditemukan.' };
    }
    saveStoredAccounts(data.accounts);
    if (data.settings) {
      saveStoredSettings(data.settings);
    }
    return { success: true, count: data.accounts.length };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, error: `Gagal membaca file JSON: ${message}` };
  }
}
