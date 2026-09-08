import { Account, StoreSettings } from '../types/account';

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  storeName: "wicstore",
  adminStatus: "ONLINE",
  whatsappNumber: "6285812345678",
  discordId: "1199509687918399588",
  discordUsername: "wicstore#GT",
  discordServerUrl: "https://discord.gg/eUXdAKsvBY",
  gtmartDiscordUrl: "https://discord.gg/gtmart",
  gtidDiscordUrl: "https://discord.gg/gtid",
  dlRateIdr: 538, // 1 DL = Rp 538 (Market GTID)
  adminPin: "1234",
  autoSyncDlRate: true,
  dlRateSource: 'buy',
  dlRateLastSyncedAt: new Date().toISOString(),
  dlRateLiveInfo: {
    buy: 538,
    sell: 555,
    buyBgl: 53800,
    sellBgl: 55500,
  },
};

// High quality themed screenshot previews for Growtopia Legacy accounts
export const SAMPLE_ACCOUNTS: Account[] = [
  {
    id: "GT-9901",
    title: "Akun Sultan Old 2015 | Ringmaster (10/10 Rings) + Ances Lv 5 + DGS",
    category: "Super Supporter",
    categories: ["Super Supporter"],
    loginType: "Legacy",
    emailStatus: "Clean Gmail",
    isAvailable: true,
    level: 95,
    expPercent: 78,
    growIdFormat: "4 Letter Clean No Numbers (D***)",
    accountDays: "3.8k Days",
    priceIdr: 1250000,
    priceDl: 357,
    questItems: [
      "Ringmaster (10/10 Full Rings)",
      "Ances of Wisdom Lv 5",
      "Focused Eyes",
      "Dragon Gate Scepter (DGS)",
      "Legendary Wings",
      "Golden Pickaxe"
    ],
    untradeableHighlights: [
      "Growtokens: 145",
      "Old Guild Member Top 5",
      "Gems: 450,000+",
      "Original 1st Hand Email"
    ],
    images: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Akun kolektor era 2015. Login Legacy (RCE / RCN), email Clean Gmail diberikan beserta data recovery pertama. Quest Ringmaster lengkap 10 ring, ances level 5 siap farmer/main. Bebas riwayat ban atau suspend.",
    createdAt: "2026-03-01",
    badgeFeatured: true,
    notes: "Siap Rekber GTMART / GTID via Discord. Garansi seumur hidup untuk clean email."
  },
  {
    id: "GT-8842",
    title: "Akun Old 2018 Lv 75 | Focused Eyes + 6 Rings + Clean 5 Letters ID",
    category: "Roles",
    categories: ["Roles"],
    loginType: "Legacy",
    emailStatus: "Clean Gmail",
    isAvailable: true,
    level: 75,
    expPercent: 42,
    growIdFormat: "5 Letter Clean Word (B****)",
    accountDays: "2.7k Days",
    priceIdr: 520000,
    priceDl: 148,
    questItems: [
      "Focused Eyes",
      "6/10 Rings Carnival",
      "Ances of Time Lv 3",
      "Starboard",
      "Scythe"
    ],
    untradeableHighlights: [
      "Growtokens: 82",
      "Level 75 Ready Farm BGL",
      "Log Legacy (RCE / RCN)"
    ],
    images: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Cocok buat main harian atau farming BGL. Akun sudah level 75, Focused Eyes ready, ring carnival sudah 6 buah. Login Legacy (RCE / RCN) amanah.",
    createdAt: "2026-03-03",
    badgeFeatured: true,
    notes: "Direct transfer siap potongan, rekber Discord GTID/GTMART welcome."
  },
  {
    id: "GT-7719",
    title: "Akun Farmer Gahar Lv 82 | L-Dragon Quest On-Going + 40 Slots",
    category: "Roles",
    categories: ["Roles"],
    loginType: "Legacy",
    emailStatus: "Changeable",
    isAvailable: true,
    level: 82,
    expPercent: 89,
    growIdFormat: "Clean Name (V***)",
    accountDays: "3k Days",
    priceIdr: 780000,
    priceDl: 222,
    questItems: [
      "Legendary Dragon (Step 3/4)",
      "Ring of Winds",
      "Ring of Force",
      "Focused Eyes",
      "Surg Kit Unused 20x"
    ],
    untradeableHighlights: [
      "Growtokens: 110",
      "Role farmer & badge aktif",
      "World Farm 4 letter included"
    ],
    images: [
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Akun login Legacy (RCE / RCN) tanpa embel-embel Gmail. Email bisa diganti (Changeable) langsung ke email pribadi pembeli saat transaksi dipandu admin sampai beres.",
    createdAt: "2026-03-04",
    badgeFeatured: false,
    notes: "Proses change email langsung dipandu sampai sukses."
  },
  {
    id: "GT-6612",
    title: "Akun Starter Legacy Lv 52 | Clean Email + Focused Eyes Murah",
    category: "Plain / Polosan",
    categories: ["Plain / Polosan"],
    loginType: "Legacy",
    emailStatus: "Clean Gmail",
    isAvailable: true,
    level: 52,
    expPercent: 20,
    growIdFormat: "Normal ID 6 Huruf",
    accountDays: "2.3k Days",
    priceIdr: 275000,
    priceDl: 78,
    questItems: [
      "Focused Eyes",
      "Ring of Water",
      "Zeus Lightning Bolt"
    ],
    untradeableHighlights: [
      "Growtokens: 45",
      "Polosan siap build",
      "Inventory rapi"
    ],
    images: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Pilihan budget hemat bagi yang cari akun polosan sudah level 50+ dengan Focused Eyes untuk main santai atau farm tanpa repot leveling dari nol. Login Legacy (RCE / RCN).",
    createdAt: "2026-03-05",
    badgeFeatured: false,
    notes: "Bisa bayar via QRIS / Dana / GoPay / OVO."
  },
  {
    id: "GT-5503",
    title: "Akun Rare 2014 Lv 68 | 3 Letter Name + Legacy Full Info (SOLD)",
    category: "Super Supporter",
    categories: ["Super Supporter"],
    loginType: "Legacy",
    emailStatus: "Clean Gmail",
    isAvailable: false,
    level: 68,
    expPercent: 99,
    growIdFormat: "3 Letter Ultra Rare (X**)",
    accountDays: "4.1k Days",
    priceIdr: 1650000,
    priceDl: 471,
    questItems: [
      "Ringmaster (10 Rings)",
      "Focused Eyes",
      "Vintage 2014 Items"
    ],
    untradeableHighlights: [
      "3-Letter GrowID super langka",
      "Akun vintage 4.1k days era awal Growtopia",
      "Sold out via Direct BCA"
    ],
    images: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Akun vintage tahun 2014 (4.1k Days) dengan nama hanya 3 huruf. Telah terjual kepada buyer loyal via direct transfer.",
    createdAt: "2026-02-28",
    badgeFeatured: false,
    notes: "STATUS: SOLD OUT. Menjadi portfolio transaksi sukses."
  },
  {
    id: "GT-4411",
    title: "Akun Old 2016 Lv 90 | Ringmaster + 4 Ances Level 4",
    category: "Super Supporter",
    categories: ["Super Supporter"],
    loginType: "Legacy",
    emailStatus: "Clean Gmail",
    isAvailable: true,
    level: 90,
    expPercent: 15,
    growIdFormat: "5 Letter Clean (K****)",
    accountDays: "3.5k Days",
    priceIdr: 890000,
    priceDl: 254,
    questItems: [
      "Ringmaster (10/10 Rings)",
      "Ances of Wisdom Lv 4",
      "Focused Eyes",
      "Golden Heart Shield",
      "Legendary Wings"
    ],
    untradeableHighlights: [
      "Growtokens: 130",
      "Log Legacy (RCE / RCN) 100% Clean",
      "No minus / suspension"
    ],
    images: [
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Akun high-end level 90 dengan login Legacy (RCE / RCN). Data akun lengkap dan amanah.",
    createdAt: "2026-03-06",
    badgeFeatured: true,
    notes: "MM Discord GTMART / GTID welcome, admin standby fast respond."
  }
];
