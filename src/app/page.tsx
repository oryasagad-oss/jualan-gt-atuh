'use client';

import React, { useState, useEffect } from 'react';
import { Account, StoreSettings } from '../types/account';
import { 
  getStoredAccounts, 
  getStoredSettings, 
  fetchAccounts, 
  fetchSettings, 
  subscribeToCloudUpdates 
} from '../utils/storage';
import { Navbar } from '../components/shared/Navbar';
import { FloatingClouds } from '../components/hero/FloatingClouds';
import { InteractiveHero } from '../components/hero/InteractiveHero';
import { TrustBadges } from '../components/hero/TrustBadges';
import { CatalogSection } from '../components/catalog/CatalogSection';
import { RekberGuideModal } from '../components/shared/RekberGuideModal';
import { Footer } from '../components/shared/Footer';

export default function HomePage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [settings, setSettings] = useState<StoreSettings>(getStoredSettings());
  const [isRekberOpen, setIsRekberOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // 1. Initial immediate load from local cache
    setAccounts(getStoredAccounts());
    setSettings(getStoredSettings());

    // 2. Fetch latest data from Supabase Cloud Database
    fetchAccounts().then((cloudAccounts) => {
      if (cloudAccounts) setAccounts(cloudAccounts);
    });

    fetchSettings().then((cloudSettings) => {
      if (cloudSettings) setSettings(cloudSettings);
    });

    // 3. Realtime subscription: auto-update whenever admin updates from any device
    const unsubscribe = subscribeToCloudUpdates((key, value) => {
      if (key === 'accounts' && Array.isArray(value)) {
        setAccounts(value);
      } else if (key === 'settings' && value) {
        setSettings(value);
      }
    });

    // 4. Also listen for localStorage changes across browser tabs on the same device
    const handleStorageChange = () => {
      setAccounts(getStoredAccounts());
      setSettings(getStoredSettings());
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      unsubscribe();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleScrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-slate-50 dark:bg-[#080c14] text-slate-900 dark:text-gray-100 flex flex-col selection:bg-amber-500 selection:text-black transition-colors">
      
      {/* Background Animated Pixel Clouds */}
      <FloatingClouds />

      {/* Navbar with Live Admin Status & Audio Switch */}
      <Navbar settings={settings} />

      {/* Interactive Hero Banner with Punchable Character & Floating Platform */}
      <InteractiveHero
        settings={settings}
        onExploreCatalog={handleScrollToCatalog}
        onOpenRekberGuide={() => setIsRekberOpen(true)}
      />

      {/* Trust Badges: Payment, Rekber GTID/GTMART, Clean Data Guarantee */}
      <TrustBadges
        settings={settings}
        onOpenRekberModal={() => setIsRekberOpen(true)}
      />

      {/* Main Catalog & Filter Section */}
      <CatalogSection
        accounts={accounts}
        settings={settings}
      />

      {/* Rekber & Security Guide Modal */}
      <RekberGuideModal
        settings={settings}
        isOpen={isRekberOpen}
        onClose={() => setIsRekberOpen(false)}
      />

      {/* Footer */}
      <Footer
        settings={settings}
        onOpenRekberGuide={() => setIsRekberOpen(true)}
      />

    </div>
  );
}
