export type LoginType = 'Legacy' | 'Gmail' | 'Ubisoft';
export type EmailStatus = 'Clean Gmail' | 'Changeable' | 'Dummy Email';
export type RoleStatus = 'None' | 'Supporter' | 'Super Supporter';
export type AdminStatus = 'ONLINE' | 'OFFLINE' | 'FAST_RESPONSE';

export interface Account {
  id: string; // e.g. "GT-8801"
  title: string;
  loginType: LoginType;
  emailStatus: EmailStatus;
  isAvailable: boolean;
  level: number;
  expPercent?: number;
  growIdFormat: string; // e.g. "4 Letter Clean (ex: D***)"
  role: RoleStatus;
  accountYear: number | string; // e.g. 2016
  backpackSlots: number;
  worldCount: number;
  priceIdr: number; // e.g. 850000
  priceDl?: number; // e.g. 240
  questItems: string[];
  untradeableHighlights: string[];
  images: string[];
  description: string;
  createdAt: string;
  badgeFeatured?: boolean;
  notes?: string;
}

export interface StoreSettings {
  storeName: string;
  adminStatus: AdminStatus;
  whatsappNumber: string;
  discordId: string;
  discordUsername: string;
  gtmartDiscordUrl: string;
  gtidDiscordUrl: string;
  dlRateIdr: number; // e.g. 3500
  adminPin: string; // default '1234'
}

export interface FilterState {
  search: string;
  loginType: 'All' | LoginType;
  emailStatus: 'All' | EmailStatus;
  availability: 'All' | 'Available' | 'SoldOut';
  minLevel: number;
  maxLevel: number;
  minPriceIdr: number;
  maxPriceIdr: number;
  sortBy: 'latest' | 'price-asc' | 'price-desc' | 'level-desc';
}
