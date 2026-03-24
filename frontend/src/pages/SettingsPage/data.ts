import { 
  Globe, Shield, Lock, Tag, Ban, BellOff, Bell, MessageSquare, 
  Heart, Eye, UserCog, Code, Palette, Monitor
} from 'lucide-react';

export const settingsSections = [
  { id: 'language', label: 'Language', icon: Globe },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'account-privacy', label: 'Account Privacy', icon: Lock },
  { id: 'tags-mentions', label: 'Tags & Mentions', icon: Tag },
  { id: 'blocked', label: 'Blocked Accounts', icon: Ban },
  { id: 'muted', label: 'Muted Accounts', icon: BellOff },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'comments', label: 'Comments', icon: MessageSquare },
  { id: 'likes-shares', label: 'Likes & Shares', icon: Heart },
  { id: 'who-can-view', label: 'Who Can View', icon: Eye },
  { id: 'manage-account', label: 'Manage Account', icon: UserCog },
  { id: 'interested-tech', label: 'Interested Tech', icon: Code },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'sessions', label: 'Active Sessions', icon: Monitor },
];

export const languages = [
  'English (US)', 'Spanish', 'French', 'German', 'Japanese', 'Korean', 'Hindi', 'Portuguese', 'Chinese (Simplified)', 'Arabic'
];

export const blockedAccounts = [
  { name: 'spam_bot_42', handle: '@spam_bot_42', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=spam&backgroundColor=ffdfbf', blockedAt: '2 weeks ago' },
  { name: 'toxic_dev', handle: '@toxic_dev', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=toxic&backgroundColor=c0aede', blockedAt: '1 month ago' },
];

export const mutedAccounts = [
  { name: 'noisy_poster', handle: '@noisy_poster', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=noisy&backgroundColor=ffd5dc', mutedAt: '3 days ago' },
];

export const activeSessions = [
  { device: 'Windows 11 • Chrome', location: 'Mumbai, IN • Active now', active: true },
  { device: 'iPhone 15 Pro • App', location: 'Mumbai, IN • 2h ago', active: false },
  { device: 'macOS Sonoma • Safari', location: 'Delhi, IN • 3d ago', active: false },
];

export const interestedTech = [
  { name: 'React', selected: true },
  { name: 'TypeScript', selected: true },
  { name: 'Rust', selected: true },
  { name: 'Go', selected: false },
  { name: 'Python', selected: true },
  { name: 'Docker', selected: false },
  { name: 'GraphQL', selected: true },
  { name: 'WebAssembly', selected: false },
  { name: 'Next.js', selected: true },
  { name: 'Tailwind CSS', selected: true },
  { name: 'Node.js', selected: false },
  { name: 'Kubernetes', selected: false },
  { name: 'AWS', selected: false },
  { name: 'Svelte', selected: false },
  { name: 'Vue', selected: false },
  { name: 'Solidity', selected: false },
];
