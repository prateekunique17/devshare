export const categories = [
  'All Gems', 'UI Kits', 'Hooks & Utils', 'Animations', 'Backend Tools', 'AI Prompts'
];

export const trendingStories = [
  {
    category: 'FUTURE TECH',
    categoryColor: 'text-blue-400',
    title: 'React 19 Server Components: A deep dive into the architecture',
    gradient: 'from-[#8b6e62] to-[#3a2e29]'
  },
  {
    category: 'SECURITY',
    categoryColor: 'text-emerald-400',
    title: 'Why Post-Quantum Cryptography is closer than you think',
    gradient: 'from-[#889977] to-[#2d3a28]'
  },
  {
    category: 'AI TOOLS',
    categoryColor: 'text-purple-400',
    title: 'Open-source LLMs that are actually outperforming GPT-4',
    gradient: 'from-[#6e6b8c] to-[#252336]'
  }
];

export const communityGems = [
  {
    id: 1,
    type: 'image',
    tags: ['UI KIT', 'FEATURED'],
    imageGradient: 'from-[#aac3ab] to-[#4e6b52]',
    user: {
      name: 'Liam West',
      avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Liam',
      time: 'Released 4h ago'
    },
    title: 'Glassmorphism Design System v2.0',
    description: 'A comprehensive collection of production-ready CSS and React components for building ultra-modern interfaces.',
    stats: {
      likes: '2.4k',
      downloads: '842',
    }
  },
  {
    id: 2,
    type: 'code',
    tags: ['REACT HOOK'],
    code: `export const useMagicGlow = (ref) => {\n  const [style, setStyle] = useState({});\n  // Calculation logic for cursor distance...\n  return { ...style, transition: '0.2s' };\n};`,
    user: {
      name: 'Elena Gomez',
      avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Elena',
      time: 'Updated 8h ago'
    },
    title: 'Dynamic Cursor Glow Engine',
    description: 'Lightweight performance-optimized hook to add interactive illumination to any element in your app.',
    stats: {
      likes: '1.8k',
      comments: '42',
    }
  }
];
