export const trendingSkills = [
  'TypeScript', 'GraphQL', 'Docker', 'AWS', 'Rust', 'Python'
];

export const recentActivity = [
  {
    type: 'commit',
    user: 'Alex',
    action: 'pushed 4 commits to',
    target: 'neural-canvas-ui',
    time: '12 MINUTES AGO',
    color: 'bg-blue-500'
  },
  {
    type: 'star',
    user: 'Alex',
    action: 'starred',
    target: 'shadcn-ui',
    time: '1 HOUR AGO',
    color: 'bg-devshare-text_secondary'
  },
  {
    type: 'pr',
    user: 'Alex',
    action: 'merged pull request',
    target: '#42',
    time: '4 HOURS AGO',
    color: 'bg-blue-500'
  }
];

export const topProjects = [
  {
    id: 1,
    title: 'Neural-Canvas UI',
    description: 'A high-performance design system framework built with Rust and WebAssembly for lightning-fast UI rendering.',
    tags: ['REACT', 'RUST', 'WASM'],
    icon: 'rocket',
    iconColor: 'text-blue-400 bg-blue-500/10',
    stars: '1.2k',
    forks: '245'
  },
  {
    id: 2,
    title: 'FluxDB Edge',
    description: 'Low-latency distributed database for edge computing applications. Optimized for real-time synchronization.',
    tags: ['GO', 'GRPC', 'REDIS'],
    icon: 'database',
    iconColor: 'text-blue-400 bg-blue-500/10',
    stars: '850',
    forks: '112'
  }
];

export const latestCodeDrops = [
  {
    id: 1,
    fileName: 'useIntersectionObserver.ts',
    code: `export const useObserver = (ref, options) => {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, options);`,
    likes: 124,
    comments: 58,
    time: 'Shared 2h ago'
  },
  {
    id: 2,
    fileName: 'tailwind.config.js',
    code: `module.exports = {
  theme: {
    extend: {
      colors: { primary: '#259df4' }`,
    likes: 45,
    comments: 4,
    time: 'Shared 1d ago'
  }
];
