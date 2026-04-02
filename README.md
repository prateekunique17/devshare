<div align="center">

# 🚀 DevShare — Dev Social Network

**A premium, dark-mode social network for developers to share code, collaborate on projects, and connect with the dev community.**

Built with React, Node.js, Express, and Supabase.

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Database-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

</div>

---

## ✨ Features

### 🏠 Landing Page
- Stunning hero section with gradient text and animated CTAs.
- Floating code snippet card with smooth infinite animations.
- Fully responsive glassmorphism navbar.

### 🔐 Authentication (Supabase Auth)
- **Secure Sign Up & Login** — Integrated with Supabase Auth for identity management.
- **Protected Routes** — Seamless redirection to login for unauthenticated users.
- **Global Auth Context** — Persistent user sessions throughout the application.

### 📊 Dashboard & Feed
- **Real-time Feed** — Powered by React Query for infinite scrolling and automatic caching.
- **Post Creation** — Share code snippets and project updates instantly.
- **Interactive Cards** — Syntax-highlighted code blocks with likes and comments.

### 👥 Social Logic (In Progress)
- **Personalized Recommendations** — Advanced SQL scoring algorithm for tailored feeds.
- **Follow System** — Connect with other developers.
- **Engagement** — Likes and comments tracking.

---

## 🛠️ Tech Stack

### Frontend
- **React 19** (Vite 8)
- **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion** (Animations)
- **@tanstack/react-query** (Data fetching)
- **@supabase/supabase-js** (Auth & Client)

### Backend
- **Node.js** (Express)
- **Supabase SDK** (Database & Storage)
- **Dotenv & CORS**

---

## 📁 Project Structure

```
/
├── frontend/             # React application
│   ├── src/
│   │   ├── components/   # Reusable UI elements
│   │   ├── contexts/     # AuthContext, etc.
│   │   ├── lib/          # Supabase client config
│   │   └── pages/        # Route-level components
├── backend/              # Express API
│   ├── routes/           # API Endpoints (posts, etc.)
│   └── index.js          # Entry point
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18+)
- **Supabase Project** (Database URL and API Keys)

### Setup

1. **Clone the Repo**
   ```bash
   git clone https://github.com/YOUR_USERNAME/devshare.git
   cd devshare
   ```

2. **Backend Configuration**
   ```bash
   cd backend
   npm install
   # Create a .env file with:
   # SUPABASE_URL=your_url
   # SUPABASE_SERVICE_ROLE_KEY=your_key
   # PORT=5000
   ```

3. **Frontend Configuration**
   ```bash
   cd ../frontend
   npm install
   # Create a .env file with:
   # VITE_SUPABASE_URL=your_url
   # VITE_SUPABASE_ANON_KEY=your_key
   ```

---

## 🏃 Running the Application

You need to run **both** the backend and frontend simultaneously.

### Start Backend
```bash
cd backend
npm run dev
```

### Start Frontend
```bash
cd frontend
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| `devshare-bg` | `#0b1016` | Page background |
| `devshare-panel` | `#121820` | Card/panel backgrounds |
| `devshare-blue` | `#259df4` | Primary accent color |
| `devshare-border` | `#1e2a3a` | Border color |
| `devshare-text_primary` | `#e8edf4` | Primary text |

---

<div align="center">

**Built with ❤️ for the Developer Community**

</div>
