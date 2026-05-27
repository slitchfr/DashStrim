export type SocialPlatform = 'linkedin' | 'twitter' | 'instagram' | 'threads';

export type Tone = 'hype' | 'professional' | 'analytical' | 'punchy' | 'story';

export interface Review {
  id: string;
  author: string;
  avatarUrl?: string;
  company?: string;
  text: string;
  rating: number; // 1-5
  date: string;
  source: 'google' | 'trustpilot' | 'g2' | 'appstore' | 'custom';
}

export interface MarketingPost {
  id: string;
  platform: SocialPlatform;
  content: string;
  score: {
    hook: number; // 0-100
    viral: number; // 0-100
    clarity: number; // 0-100
  };
  metrics: {
    views: string;
    engagement: string;
  };
  hashtags: string[];
}

export interface BrandProfile {
  name: string;
  industry: string;
  audience: string;
  tonePreferences: string;
  emojiUsage: 'heavy' | 'moderate' | 'none';
}

export interface MetricPoint {
  date: string;
  reach: number;
  conversions: number;
  posts: number;
}
