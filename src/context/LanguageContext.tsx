'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'en' | 'id';

export interface Translations {
  navbar: {
    brandSubtitle: string;
    adminOnline: string;
    adminFastResponse: string;
    adminOffline: string;
    mmReady: string;
    soundTooltipMuted: string;
    soundTooltipUnmuted: string;
    discordCta: string;
    adminLink: string;
  };
  hero: {
    badgeCatalog: string;
    badgeMm: string;
    mainTitleLine1: string;
    mainTitleHighlight: string;
    mainTitleLine2: string;
    description: string;
    btnExplore: string;
    btnRekber: string;
    btnDiscord: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
    punchHint: string;
    punchCombo: string;
    dialogues: string[];
  };
  trustBadges: {
    card1Badge: string;
    card1Status: string;
    card1Title: string;
    card1Desc: string;
    card1Tag1: string;
    card1Tag2: string;
    card1Tag3: string;

    card2Badge: string;
    card2Status: string;
    card2Title: string;
    card2Desc: string;

    card3Badge: string;
    card3Status: string;
    card3Title: string;
    card3Desc: string;
    card3Tag1: string;
    card3Tag2: string;
  };
  catalog: {
    sectionBadge: string;
    sectionTitle: string;
    sectionSubtitle: string;
    searchPlaceholder: string;
    sortLatest: string;
    sortPriceAsc: string;
    sortPriceDesc: string;
    sortLevelDesc: string;
    totalCountSuffix: string;
    categoryAll: string;
    categoryPlain: string;
    categorySuperSupporter: string;
    categoryRoles: string;
    emptyTitle: string;
    emptyDesc: string;
    emptyReset: string;
  };
  card: {
    badgeLegacy: string;
    statusAvailable: string;
    statusSoldOut: string;
    yearPrefix: string;
    agePrefix: string;
    levelPrefix: string;
    rolePrefix: string;
    categoryPrefix: string;
    growIdPrefix: string;
    emailPrefix: string;
    specialItems: string;
    moreItems: string;
    priceLabel: string;
    equivalentLabel: string;
    btnDetails: string;
    btnDiscordOrder: string;
    btnSold: string;
  };
  modal: {
    codePrefix: string;
    statusAvailable: string;
    statusSoldOut: string;
    yearLabel: string;
    ageLabel: string;
    zoomPhoto: string;
    zoomCloseHint: string;
    priceLabel: string;
    inGameLocksLabel: string;
    tableTitle: string;
    tableLogin: string;
    tableLoginVal: string;
    tableEmail: string;
    tableLevelExp: string;
    tableGrowId: string;
    tableRole: string;
    tableCategory: string;
    tableYear: string;
    tableAge: string;
    tableYearVal: string;
    tableBackpack?: string;
    questItemsTitle: string;
    untradeableTitle: string;
    descTitle: string;
    sellerNotesTitle: string;
    termsTitle: string;
    termsBadge: string;
    termsDesc: string;
    paymentMethodPrompt: string;
    btnCopyPost: string;
    btnDiscordProfile: string;
    btnDiscordCopy: string;
    btnCopied: string;
    btnOrderDiscord: string;
    btnSoldOut: string;
  };
  rekberModal: {
    title: string;
    boxMmTitle: string;
    boxMmDesc: string;
    btnGtid: string;
    btnGtmart: string;
    flowTitle: string;
    flowMmTitle: string;
    flowMmDesc: string;
    flowDirectTitle: string;
    flowDirectDesc: string;
    guaranteeTitle: string;
    g1: string;
    g2: string;
    g3: string;
    btnClose: string;
  };
  postGenModal: {
    title: string;
    selectTemplate: string;
    templateFull: string;
    templateShort: string;
    hint: string;
    btnClose: string;
    btnCopy: string;
    btnCopied: string;
  };
  footer: {
    bio: string;
    adminStatusPrefix: string;
    discordIdPrefix: string;
    secTitle: string;
    secRekberGuide: string;
    secCleanGuarantee: string;
    secAdminPortal: string;
    contactTitle: string;
    contactDiscordProfile: string;
    contactGtid: string;
    disclaimer: string;
    builtWith: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    navbar: {
      brandSubtitle: 'Safe, Legal & Verified Legacy Accounts',
      adminOnline: 'ADMIN ONLINE',
      adminFastResponse: 'FAST RESPONSE',
      adminOffline: 'ADMIN OFFLINE',
      mmReady: 'MM GTID & GTMART Ready',
      soundTooltipMuted: 'Enable 8-Bit Sound Effects',
      soundTooltipUnmuted: 'Mute Sound Effects',
      discordCta: 'Discord',
      adminLink: 'Admin',
    },
    hero: {
      badgeCatalog: 'OFFICIAL CATALOG 2026',
      badgeMm: 'Direct & MM GTID / GTMART Welcome',
      mainTitleLine1: 'GROWTOPIA LEGACY',
      mainTitleHighlight: 'ACCOUNT STORE',
      mainTitleLine2: 'TRUSTED & 100% VERIFIED',
      description: 'Providing the best Log Legacy accounts. Safe transactions via QRIS, All Banks, & Official Middleman (GTMART & GTID).',
      btnExplore: 'EXPLORE CATALOG',
      btnRekber: 'Middleman & Guarantee',
      btnDiscord: 'Contact on Discord',
      stat1Value: '100%',
      stat1Label: 'Clean & Safe',
      stat2Value: 'GTID / GTMART',
      stat2Label: 'Verified Middleman',
      stat3Value: '< 10 Mins',
      stat3Label: 'Fast Delivery',
      punchHint: 'Click character to punch!',
      punchCombo: 'PUNCH COMBO',
      dialogues: [
        'Click me to punch! 👊',
        "Ouch! Don't hit so hard! 😆",
        'Ready Vintage Legacy Accounts! 💎',
        'Ringmaster 10/10 Rings ready to adopt! 💍',
        '100% Safe & Middleman GTID/GTMART Welcome! 🛡️',
        'Log Legacy (RCE / RCN)! 🔑',
        'CRITICAL HIT! +9999 Gems! ✨',
        'Fast response admin standby! ⚡',
      ],
    },
    trustBadges: {
      card1Badge: 'MIDDLEMAN VERIFIED',
      card1Status: 'Safe & Official',
      card1Title: 'Official Middleman GTID & GTMART',
      card1Desc: 'We support Middleman transactions via official Discord servers GTID Official & GTMART. Trustworthy direct transfer also welcome.',
      card1Tag1: '🛡️ GTID Discord',
      card1Tag2: '🛡️ GTMART Discord',
      card1Tag3: '⚡ Direct Welcome',

      card2Badge: 'PAYMENT GATEWAY',
      card2Status: 'Instant',
      card2Title: 'QRIS, E-Wallet & All Banks',
      card2Desc: 'Supports automatic QRIS (All E-Wallets: GoPay, Dana, OVO, ShopeePay), plus BCA, Mandiri, BRI, BNI bank transfers.',

      card3Badge: '100% CLEAN DATA',
      card3Status: 'Anti Hackback',
      card3Title: 'Clean Legacy & Full Access Guarantee',
      card3Desc: 'All accounts undergo strict security checks. Log Legacy (RCE / RCN) with clean history and zero risk of hackback.',
      card3Tag1: '✓ Clean Ban History',
      card3Tag2: '✓ Full Recovery Support',
    },
    catalog: {
      sectionBadge: 'LATEST LEGACY ACCOUNTS',
      sectionTitle: 'CHOOSE YOUR GROWTOPIA ACCOUNT',
      sectionSubtitle: 'Click on any account to view screenshot gallery & complete specifications.',
      searchPlaceholder: 'Search account code, items, or keywords...',
      sortLatest: 'Latest Added',
      sortPriceAsc: 'Price: Low to High',
      sortPriceDesc: 'Price: High to Low',
      sortLevelDesc: 'Level: Highest',
      totalCountSuffix: 'Legacy Accounts',
      categoryAll: 'All Categories',
      categoryPlain: 'Plain / Polosan',
      categorySuperSupporter: 'Super Supporter',
      categoryRoles: 'Roles',
      emptyTitle: 'No accounts match your criteria',
      emptyDesc: 'Try adjusting your search keywords to find what you are looking for.',
      emptyReset: 'Reset Search',
    },
    card: {
      badgeLegacy: 'LOG LEGACY',
      statusAvailable: 'AVAILABLE',
      statusSoldOut: 'SOLD OUT',
      yearPrefix: 'Year',
      agePrefix: 'Age',
      levelPrefix: 'Level:',
      rolePrefix: 'Role:',
      categoryPrefix: 'Category:',
      growIdPrefix: 'Format ID:',
      emailPrefix: 'Email:',
      specialItems: 'Special Items / Quests:',
      moreItems: 'more',
      priceLabel: 'Account Price:',
      equivalentLabel: 'Equivalent:',
      btnDetails: 'View Specs',
      btnDiscordOrder: 'Order Discord',
      btnSold: 'Sold Out',
    },
    modal: {
      codePrefix: 'CODE',
      statusAvailable: '● READY FOR ADOPT',
      statusSoldOut: '✕ SOLD OUT',
      yearLabel: 'Creation Year:',
      ageLabel: 'Account Age:',
      zoomPhoto: 'Zoom Photo',
      zoomCloseHint: 'Click anywhere to close zoom',
      priceLabel: 'OFFICIAL ACCOUNT PRICE:',
      inGameLocksLabel: 'Or pay via In-Game Locks:',
      tableTitle: 'Full Specifications Table',
      tableLogin: 'Account Login Type:',
      tableLoginVal: 'Log Legacy (RCE / RCN)',
      tableEmail: 'Email Status & Access:',
      tableLevelExp: 'Level & EXP:',
      tableGrowId: 'GrowID Format:',
      tableRole: 'Role & Supporter:',
      tableCategory: 'Category:',
      tableYear: 'Creation Year:',
      tableAge: 'Account Age (Days):',
      tableYearVal: 'Classic Growtopia Era',
      tableBackpack: 'Backpack Slots & Worlds:',
      questItemsTitle: 'Quest & Ringmaster Items:',
      untradeableTitle: 'Highlights & Untradeables:',
      descTitle: 'Account Description:',
      sellerNotesTitle: '📌 Seller Notes:',
      termsTitle: 'Transaction Terms & Official Middleman',
      termsBadge: '100% Verified',
      termsDesc: 'Direct transfer or official Middleman via GTMART Discord & GTID Discord. Middleman fee covered by buyer or as mutually agreed.',
      paymentMethodPrompt: 'Select your preferred payment method:',
      btnCopyPost: 'Copy Post Format',
      btnDiscordProfile: 'Discord Profile',
      btnDiscordCopy: 'Copy Discord ID',
      btnCopied: 'Copied!',
      btnOrderDiscord: 'ORDER NOW ON DISCORD',
      btnSoldOut: 'ACCOUNT SOLD OUT',
    },
    rekberModal: {
      title: 'Middleman Guide & Safety Guarantee',
      boxMmTitle: '🛡️ Official Middleman: GTID & GTMART Discord',
      boxMmDesc: 'We fully support middleman transactions through the largest Indonesian Growtopia communities on Discord: GTID (Growtopia Indonesia) & GTMART.',
      btnGtid: 'Discord GTID Official',
      btnGtmart: 'Discord GTMART',
      flowTitle: 'Transaction Flow (Middleman vs Direct):',
      flowMmTitle: '1. Middleman Option (Recommended):',
      flowMmDesc: 'Buyer opens a ticket in the official GTID / GTMART Discord server and invites our admin. Buyer sends payment to the verified middleman, admin provides full account data, buyer verifies the account, and middleman releases funds.',
      flowDirectTitle: '2. Direct Transfer Option (Instant):',
      flowDirectDesc: 'Buyer transfers directly to our store QRIS or Bank account. Account details delivered within 5 minutes along with email security guidance.',
      guaranteeTitle: 'Our Account Guarantee',
      g1: 'Clean Legacy Guarantee: Log Legacy (RCE / RCN) with zero hackback risk.',
      g2: 'Guided Setup: Step-by-step guidance on changing passwords, configuring 2FA, and checking login history.',
      g3: 'Clean Record: Account is clean from bot bans, suspension issues, or illegal links.',
      btnClose: 'Understood & Close',
    },
    postGenModal: {
      title: 'Social Media Post Template Generator',
      selectTemplate: 'Choose Post Template:',
      templateFull: 'Full Format (FB / Discord)',
      templateShort: 'Short Format (Stories)',
      hint: 'The text above is automatically filled with specs, price in IDR & DLs, Middleman options, and your Discord contact.',
      btnClose: 'Close',
      btnCopy: 'COPY POST FORMAT (1-CLICK)',
      btnCopied: 'COPIED TO CLIPBOARD!',
    },
    footer: {
      bio: 'Trusted Growtopia account catalog with a proven reputation. Specializing exclusively in pure Log Legacy accounts from vintage eras, Ringmaster, full ances, and collector gems.',
      adminStatusPrefix: 'Admin',
      discordIdPrefix: 'Discord ID:',
      secTitle: 'STORE SAFETY',
      secRekberGuide: 'GTID / GTMART Middleman Guide',
      secCleanGuarantee: 'Clean Legacy Data Guarantee',
      secAdminPortal: 'Admin Portal',
      contactTitle: 'OFFICIAL CONTACTS',
      contactDiscordProfile: 'Discord Admin Profile',
      contactGtid: 'GTID Official Server',
      disclaimer: 'Growtopia is a registered trademark of Ubisoft Entertainment. This website is a fan-made community marketplace and is not affiliated with or endorsed by Ubisoft.',
      builtWith: 'Built with pixel passion for Growtopians',
    },
  },
  id: {
    navbar: {
      brandSubtitle: 'Katalog Akun Aman, Legal & Siap Rekber',
      adminOnline: 'ADMIN ONLINE',
      adminFastResponse: 'FAST RESPONSE',
      adminOffline: 'ADMIN OFFLINE',
      mmReady: 'MM GTID & GTMART Ready',
      soundTooltipMuted: 'Aktifkan Efek Suara 8-Bit',
      soundTooltipUnmuted: 'Matikan Efek Suara',
      discordCta: 'Discord',
      adminLink: 'Admin',
    },
    hero: {
      badgeCatalog: 'KATALOG RESMI 2026',
      badgeMm: 'Direct & MM GTID / GTMART Welcome',
      mainTitleLine1: 'PUSAT JUAL BELI',
      mainTitleHighlight: 'AKUN GROWTOPIA',
      mainTitleLine2: 'TERPERCAYA & BERGARANSI',
      description: 'Menyediakan akun Log Legacy terbaik. Transaksi aman via QRIS, Semua Bank, & Rekber Resmi (GTMART & GTID).',
      btnExplore: 'JELAJAHI KATALOG',
      btnRekber: 'Info Rekber & Garansi',
      btnDiscord: 'Hubungi via Discord',
      stat1Value: '100%',
      stat1Label: 'Clean & Amanah',
      stat2Value: 'GTID / GTMART',
      stat2Label: 'Verified Rekber',
      stat3Value: '< 10 Menit',
      stat3Label: 'Proses Cepat',
      punchHint: 'Klik karakter untuk punch!',
      punchCombo: 'PUNCH COMBO',
      dialogues: [
        'Klik aku untuk punch! 👊',
        'Ouch! Jangan dipukul dong! 😆',
        'Ready Akun Old 2015 - 2020! 💎',
        'Ringmaster 10/10 Rings siap angkut! 💍',
        '100% Amanah & Siap Rekber GTID/GTMART! 🛡️',
        'Login Legacy (RCE / RCN)! 🔑',
        'CRITICAL HIT! +9999 Gems! ✨',
        'Fast Response Admin standby! ⚡',
      ],
    },
    trustBadges: {
      card1Badge: 'MIDDLEMAN VERIFIED',
      card1Status: 'Resmi & Aman',
      card1Title: 'Siap Rekber GTID & GTMART',
      card1Desc: 'Melayani transaksi Rekber (Middleman) resmi via server Discord GTID Official & GTMART. Bisa juga Direct Transfer amanah.',
      card1Tag1: '🛡️ GTID Discord',
      card1Tag2: '🛡️ GTMART Discord',
      card1Tag3: '⚡ Direct Welcome',

      card2Badge: 'PAYMENT GATEWAY',
      card2Status: 'Instant',
      card2Title: 'QRIS, E-Wallet & Semua Bank',
      card2Desc: 'Mendukung pembayaran QRIS otomatis (Semua E-Wallet), GoPay, Dana, OVO, ShopeePay, serta transfer Bank BCA, Mandiri, BRI, BNI.',

      card3Badge: '100% CLEAN DATA',
      card3Status: 'Anti Hackback',
      card3Title: 'Garansi Akses & Data Bersih',
      card3Desc: 'Semua akun dicek ketat riwayat keamanannya. Login Legacy (RCE / RCN) dengan garansi data bersih tanpa risiko hackback.',
      card3Tag1: '✓ Bebas Riwayat Ban',
      card3Tag2: '✓ Full Data Recovery',
    },
    catalog: {
      sectionBadge: 'KATALOG AKUN TERBARU',
      sectionTitle: 'PILIH AKUN GROWTOPIA ANDA',
      sectionSubtitle: 'Klik pada salah satu akun untuk melihat galeri screenshot & detail spek lengkap.',
      searchPlaceholder: 'Cari kode akun, item, atau kata kunci...',
      sortLatest: 'Terbaru',
      sortPriceAsc: 'Harga: Termurah',
      sortPriceDesc: 'Harga: Termahal',
      sortLevelDesc: 'Level: Tertinggi',
      totalCountSuffix: 'Akun Legacy',
      categoryAll: 'Semua Kategori',
      categoryPlain: 'Plain / Polosan',
      categorySuperSupporter: 'Super Supporter',
      categoryRoles: 'Roles',
      emptyTitle: 'Tidak ada akun yang sesuai kriteria',
      emptyDesc: 'Coba ubah kata kunci pencarian Anda.',
      emptyReset: 'Reset Pencarian',
    },
    card: {
      badgeLegacy: 'LOG LEGACY',
      statusAvailable: 'AVAILABLE',
      statusSoldOut: 'SOLD OUT',
      yearPrefix: 'Tahun',
      agePrefix: 'Umur',
      levelPrefix: 'Level:',
      rolePrefix: 'Role:',
      categoryPrefix: 'Kategori:',
      growIdPrefix: 'Format ID:',
      emailPrefix: 'Email:',
      specialItems: 'Item Spesial / Quest:',
      moreItems: 'lagi',
      priceLabel: 'Harga Akun:',
      equivalentLabel: 'Ekuivalen:',
      btnDetails: 'Detail Spek',
      btnDiscordOrder: 'Order Discord',
      btnSold: 'Terjual',
    },
    modal: {
      codePrefix: 'KODE',
      statusAvailable: '● READY FOR ADOPT',
      statusSoldOut: '✕ SOLD OUT',
      yearLabel: 'Pembuatan Akun:',
      ageLabel: 'Umur Akun:',
      zoomPhoto: 'Zoom Foto',
      zoomCloseHint: 'Klik di mana saja untuk menutup zoom',
      priceLabel: 'HARGA RESMI AKUN:',
      inGameLocksLabel: 'Atau bayar via In-Game Locks:',
      tableTitle: 'Tabel Spesifikasi Lengkap',
      tableLogin: 'Tipe Login Akun:',
      tableLoginVal: 'Log Legacy (RCE / RCN)',
      tableEmail: 'Status Email & Akses:',
      tableLevelExp: 'Level & EXP:',
      tableGrowId: 'Format GrowID:',
      tableRole: 'Role & Supporter:',
      tableCategory: 'Kategori:',
      tableYear: 'Tahun Pembuatan:',
      tableAge: 'Umur Akun (Days):',
      tableYearVal: 'Era Klasik Growtopia',
      tableBackpack: 'Backpack Slots & World:',
      questItemsTitle: 'Quest & Ringmaster Items:',
      untradeableTitle: 'Keistimewaan & Untradeables:',
      descTitle: 'Deskripsi Akun:',
      sellerNotesTitle: '📌 Catatan Penjual:',
      termsTitle: 'Ketentuan Transaksi & Rekber Resmi',
      termsBadge: '100% Verified',
      termsDesc: 'Menerima transaksi langsung (Direct) atau Rekber Resmi via GTMART Discord & GTID Discord. Fee Middleman / Rekber ditanggung pembeli atau kesepakatan bersama.',
      paymentMethodPrompt: 'Pilih Rencana Metode Pembayaran Anda:',
      btnCopyPost: 'Copy Format Post',
      btnDiscordProfile: 'Profil Discord',
      btnDiscordCopy: 'Salin Discord ID',
      btnCopied: 'Tersalin!',
      btnOrderDiscord: 'ORDER SEKARANG VIA DISCORD',
      btnSoldOut: 'AKUN SUDAH TERJUAL (SOLD OUT)',
    },
    rekberModal: {
      title: 'Panduan Rekber & Garansi Keamanan',
      boxMmTitle: '🛡️ Rekber Resmi: GTID & GTMART Discord',
      boxMmDesc: 'Kami mendukung penuh transaksi rekber melalui server Discord resmi komunitas Growtopia terbesar di Indonesia: GTID (Growtopia Indonesia) & GTMART.',
      btnGtid: 'Discord GTID Official',
      btnGtmart: 'Discord GTMART',
      flowTitle: 'Alur Transaksi (Rekber vs Direct):',
      flowMmTitle: '1. Opsi Rekber (Middleman):',
      flowMmDesc: 'Pembeli membuka ticket di server Discord GTID / GTMART & mengundang Discord Admin kami. Pembeli transfer dana ke Middleman resmi, Admin menyerahkan full data akun, pembeli memverifikasi akun, dan Middleman melepaskan dana.',
      flowDirectTitle: '2. Opsi Direct Transfer:',
      flowDirectDesc: 'Pembeli transfer langsung ke Rekening/QRIS toko kami. Akun langsung diserahkan dalam waktu kurang dari 5 menit beserta panduan pengamanan email.',
      guaranteeTitle: 'Garansi Akun Kami',
      g1: 'Garansi Log Legacy Bersih: Akun Log Legacy (RCE / RCN) tanpa risiko minus/hackback.',
      g2: 'Dipandu Sampai Beres: Pembeli dipandu cara ganti password, pasang 2FA/authenticator, dan cek history login.',
      g3: 'Bebas Riwayat Ilegal: Akun bersih dari bot ban / suspension issues.',
      btnClose: 'Mengerti & Tutup',
    },
    postGenModal: {
      title: 'Auto-Generator Format Postingan Sosmed',
      selectTemplate: 'Pilih Template Postingan:',
      templateFull: 'Format Lengkap (FB/Discord)',
      templateShort: 'Format Ringkas (Story)',
      hint: 'Teks di atas telah terisi otomatis dengan spesifikasi akun, harga IDR/DL, opsi MM GTID/GTMART, dan kontak Discord admin Anda.',
      btnClose: 'Tutup',
      btnCopy: 'SALIN FORMAT POSTINGAN (1-KLIK)',
      btnCopied: 'FORMAT TERSALIN KE CLIPBOARD!',
    },
    footer: {
      bio: 'Katalog jual beli akun Growtopia terpercaya dengan reputasi amanah. Fokus khusus menyediakan akun Log Legacy murni era 2014-2016, Ringmaster, full ances, hingga akun kolektor impian.',
      adminStatusPrefix: 'Admin',
      discordIdPrefix: 'Discord ID:',
      secTitle: 'KEAMANAN TOKO',
      secRekberGuide: 'Panduan Rekber GTID / GTMART',
      secCleanGuarantee: 'Garansi Data Clean Legacy',
      secAdminPortal: 'Portal Admin',
      contactTitle: 'KONTAK RESMI',
      contactDiscordProfile: 'Profil Discord Admin',
      contactGtid: 'GTID Official Server',
      disclaimer: 'Growtopia is a registered trademark of Ubisoft Entertainment. This website is a fan-made community marketplace and is not affiliated with or endorsed by Ubisoft.',
      builtWith: 'Dibuat dengan passion pixel untuk Growtopian',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('wicstore_lang') as Language | null;
    if (saved === 'en' || saved === 'id') {
      setLanguageState(saved);
    } else {
      // Default to English as requested
      setLanguageState('en');
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('wicstore_lang', lang);
  };

  const toggleLanguage = () => {
    const next: Language = language === 'en' ? 'id' : 'en';
    setLanguage(next);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
