<div align="center">

# 🚀 DevShare — Dev Social Network

**A premium, dark-mode social network for developers to share code, collaborate on projects, and connect with the dev community.**

Built with React, TypeScript, Tailwind CSS & Framer Motion.

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)

</div>

---

## ✨ Features

### 🏠 Landing Page
- Stunning hero section with gradient text and animated CTAs
- Floating code snippet card with smooth infinite animations
- Stats section, features grid, and footer
- Fully responsive glassmorphism navbar

### 🔐 Authentication
- **Sign Up Page** — Username, email, password fields with GitHub & Google OAuth buttons
- **Login Page** — Email/password with "Remember Me", password visibility toggle
- Both pages route to the Dashboard on submit

### 📊 Dashboard
- **3-Column Layout** with CSS Grid (Sidebar + Main Feed + Right Panel)
- **Sidebar** — Navigation with notification badges, user avatar, and active state highlighting
- **Stats Row** — Animated gradient cards for Projects, Followers, and Engagement
- **Feed Post Cards** — Project shares with syntax-highlighted code blocks, tags, and like toggles
- **Right Panel** — Search, trending projects, recent chats, and follow suggestions

### 🔍 Explore Page
- Search bar with filter button and "+ Drop Code" CTA
- Horizontally scrollable category pills (All Gems, UI Kits, Hooks & Utils, etc.)
- Trending Tech Stories — Gradient cards with dark overlays
- Top Community Gems — Mixed grid with image cards and code editor cards

### 👤 Profile Page
- Profile header with avatar, PRO badge, bio, and follower/following/stars stats
- GitHub-style **Contribution Graph** with 5-tier animated color intensity
- Top Projects grid with star/fork counts and tech tags
- Latest Code Drops with syntax highlighting and interaction stats
- Right panel with Trending Skills tags and Recent Activity timeline

### 🗂️ Projects Hub
- "Project Hub" header with All Projects / In Progress / Completed filter tabs
- Rich project cards with emoji icons, status badges (Beta, V1.0 Ready, Ongoing)
- Contributor avatar stacks with overflow count
- Right panel: Latest Activity feed, animated Trending Tech progress bars, Rising Stars
- Footer with "All Systems Optimal" status pill

### 🔔 Notifications
- Filterable notification feed (All, Unread, Mentions)
- Custom icon overlays per notification type (Sparks, Follows, Mentions, Comments, System)
- Unread indicator bar and quoted content blocks
- Action buttons (Reply, View Discussion, Follow Back)

### 💬 Messages
- Conversation list sidebar with avatars, online status, unread badges
- Active chat window with sent/received message bubbles
- Chat header with online status, call/video icons
- Message input with attachment and send button

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI library |
| **TypeScript** | Type safety |
| **Vite 8** | Build tool & dev server |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Animations & transitions |
| **React Router v7** | Client-side routing |
| **Lucide React** | Icon library |

---

## 📁 Project Structure

```
frontend/
├── public/
├── src/
│   ├── pages/
│   │   ├── LandingPage/
│   │   │   └── components/       # Navbar, Hero, Stats, Features, CTA, Footer
│   │   ├── SignupPage/
│   │   │   └── components/       # SignupForm
│   │   ├── LoginPage/
│   │   │   └── components/       # LoginForm
│   │   ├── DashboardPage/
│   │   │   └── components/       # Sidebar, MainFeed, StatsRow, FeedPostCard, RightPanel
│   │   ├── ExplorePage/
│   │   │   └── components/       # SearchHeader, TrendingStories, CommunityGems
│   │   ├── ProfilePage/
│   │   │   └── components/       # ProfileHeader, ContributionGraph, TopProjects, LatestCodeDrops, ProfileRightPanel
│   │   ├── ProjectsPage/
│   │   │   └── components/       # ProjectList, ProjectsRightPanel
│   │   ├── NotificationsPage/    # Notification feed with icons and filters
│   │   └── MessagesPage/         # Chat UI with conversation list
│   ├── App.tsx                   # Router configuration
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles & Tailwind
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/devshare.git

# Navigate to the project
cd devshare

# Navigate to frontend
cd frontend

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Production Build

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

---

## 🗺️ Routes

| Route | Page | Description |
|---|---|---|
| `/` | Landing Page | Marketing page with hero, features, and CTAs |
| `/signup` | Sign Up | Account creation form |
| `/login` | Login | Authentication form |
| `/dashboard` | Dashboard | Main authenticated view with feed and stats |
| `/explore` | Explore | Discover projects, stories, and community gems |
| `/profile` | Profile | User profile with contributions and projects |
| `/projects` | Projects Hub | Browse and filter community projects |
| `/notifications` | Notifications | Activity feed with filters |
| `/messages` | Messages | Direct messaging interface |

---

## 🎨 Design System

The app uses a custom dark-mode design system:

| Token | Value | Usage |
|---|---|---|
| `devshare-bg` | `#0b1016` | Page background |
| `devshare-panel` | `#121820` | Card/panel backgrounds |
| `devshare-blue` | `#259df4` | Primary accent color |
| `devshare-border` | `#1e2a3a` | Border color |
| `devshare-text_primary` | `#e8edf4` | Primary text |
| `devshare-text_secondary` | `#7a8ca5` | Secondary/muted text |

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | TypeScript check + Vite production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">

**Built with ❤️ by the DevShare Team**

</div>
