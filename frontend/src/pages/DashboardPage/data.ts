export const mockStats = [
  { label: 'TOTAL PROJECTS', value: '24', change: '+2 this week', icon: 'Folder' },
  { label: 'FOLLOWERS', value: '1,248', change: '+42 new', icon: 'Users' },
  { label: 'ENGAGEMENT', value: '89%', change: 'Top 5% in React', icon: 'Zap' },
];

export const mockPosts = [
  {
    id: 1,
    user: {
      name: 'Sarah Chen',
      handle: '@sarah_dev',
      avatar: '#fecaca',
    },
    title: 'AI-Powered Code Reviewer',
    content: 'Just pushed a new microservice for automated PR reviews using LLMs. Check out the logic for the token limit handling!',
    tags: ['React', 'Go', 'OpenAI'],
    code: `func ProcessReview(prID string) {
  // Initialize LLM client
  client := openai.NewClient(os.Getenv("API_KEY"))
  if err != nil {
    log.Fatal(err)
  }
}`,
    fileName: 'process_review.go',
    likes: 124,
    comments: 18,
    shares: 5,
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    user: {
      name: 'Marcus Aurelius',
      handle: '@stoic_coder',
      avatar: '#fed7aa',
    },
    title: 'Quantum-State UI Kit',
    content: 'Experimenting with deterministic state transitions in React using finite state machines. The hover effects are buttery smooth.',
    tags: ['TypeScript', 'Framer', 'Design'],
    code: `const stateMachine = {
  initial: 'idle',
  states: {
    idle: { on: { MOUSE_OVER: 'hovered' } },
    hovered: { on: { MOUSE_OUT: 'idle' } }
  }
};`,
    fileName: 'state_machine.ts',
    likes: 85,
    comments: 12,
    shares: 3,
    timestamp: '5 hours ago',
  }
];

export const mockTrends = [
  { title: 'Rust-based OS kernel', spark: '+1.2k', desc: 'A minimal kernel written from scratch in Rust.', tags: ['Rust', 'Low-level'] },
  { title: 'Next.js 15 Boilerplate', spark: '+850', desc: 'Optimized setup with Tailwind, Clerk, and Drizzle.', tags: ['Next.js', 'Clerk'] },
  { title: 'TensorFlow Lite Visualizer', spark: '+420', desc: 'Real-time weights inspection tool.', tags: ['Python'] },
];

export const mockChats = [
  { name: 'Jordan Smith', message: 'Did you see the new PR review microservice?', time: '12m', online: true },
  { name: 'Taylor Reed', message: 'I\'ll have the Dockerfile ready by tonight.', time: '1h', online: false },
];

export const mockFollows = [
  { name: 'Elena Kostic', role: 'Python Expert' },
  { name: 'Hiroki Tanaka', role: 'Cloud Architect' },
];
