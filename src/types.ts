/**
 * Types and Matrix Data for CreatorPay
 */

export type PlatformType = 'youtube' | 'tiktok';
export type VideoFormatType = 'long' | 'short';

export type NicheType = 'finance' | 'tech' | 'lifestyle' | 'entertainment' | 'gaming';

export interface NicheConfig {
  id: NicheType;
  label: string;
  sublabel: string;
  icon: string; // lucide icon name
  rpm: {
    youtube: {
      long: number;
      short: number;
    };
    tiktok: {
      long: number;
      short: number;
    };
  };
}

export interface CountryConfig {
  code: string;
  name: string;
  currency: string;
  symbol: string;
  rate: number;          // USD to local currency rate (e.g. 1 USD = 0.92 EUR)
  rpmMultiplier: number; // Regional market RPM index coefficient
}

export const COUNTRY_LIST: CountryConfig[] = [
  {
    code: 'US',
    name: 'United States',
    currency: 'USD',
    symbol: '$',
    rate: 1.0,
    rpmMultiplier: 1.00
  },
  {
    code: 'UK',
    name: 'United Kingdom',
    currency: 'GBP',
    symbol: '£',
    rate: 0.78,
    rpmMultiplier: 0.88
  },
  {
    code: 'DE',
    name: 'Germany (Europe)',
    currency: 'EUR',
    symbol: '€',
    rate: 0.92,
    rpmMultiplier: 0.90
  },
  {
    code: 'CA',
    name: 'Canada',
    currency: 'CAD',
    symbol: 'C$',
    rate: 1.36,
    rpmMultiplier: 0.82
  },
  {
    code: 'AU',
    name: 'Australia',
    currency: 'AUD',
    symbol: 'A$',
    rate: 1.49,
    rpmMultiplier: 0.84
  },
  {
    code: 'JP',
    name: 'Japan',
    currency: 'JPY',
    symbol: '¥',
    rate: 158.5,
    rpmMultiplier: 0.75
  },
  {
    code: 'IN',
    name: 'India',
    currency: 'INR',
    symbol: '₹',
    rate: 83.5,
    rpmMultiplier: 0.28
  },
  {
    code: 'BR',
    name: 'Brazil',
    currency: 'BRL',
    symbol: 'R$',
    rate: 5.50,
    rpmMultiplier: 0.32
  }
];

export const NICHE_LIST: NicheConfig[] = [
  {
    id: 'finance',
    label: 'Finance & Business',
    sublabel: 'Investing, personal finance, crypto, SaaS, careers',
    icon: 'TrendingUp',
    rpm: {
      youtube: { long: 9.50, short: 0.15 },
      tiktok: { long: 1.10, short: 0.00 }
    }
  },
  {
    id: 'tech',
    label: 'Tech & Gadgets',
    sublabel: 'Hardware, software development, AI, smartphone reviews',
    icon: 'Cpu',
    rpm: {
      youtube: { long: 5.50, short: 0.09 },
      tiktok: { long: 0.85, short: 0.00 }
    }
  },
  {
    id: 'lifestyle',
    label: 'Lifestyle & Vlogging',
    sublabel: 'Travel, food, daily logs, fashion, beauty, wellness',
    icon: 'Heart',
    rpm: {
      youtube: { long: 2.50, short: 0.05 },
      tiktok: { long: 0.60, short: 0.00 }
    }
  },
  {
    id: 'entertainment',
    label: 'Entertainment & Comedy',
    sublabel: 'Skits, reaction videos, pop culture, movies, storytelling',
    icon: 'Sparkles',
    rpm: {
      youtube: { long: 1.50, short: 0.03 },
      tiktok: { long: 0.45, short: 0.00 }
    }
  },
  {
    id: 'gaming',
    label: 'Gaming',
    sublabel: 'Let\'s plays, speedruns, game reviews, esports walkthroughs',
    icon: 'Gamepad2',
    rpm: {
      youtube: { long: 0.90, short: 0.02 },
      tiktok: { long: 0.30, short: 0.00 }
    }
  }
];
