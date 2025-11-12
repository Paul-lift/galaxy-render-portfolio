# Galaxy Render Portfolio

A modern, interactive portfolio website featuring 3D visualizations, smooth animations, and a professional design. Built with React, TypeScript, Three.js, and Tailwind CSS.

## 🌟 Features

- **Interactive 3D Scene** - Dynamic background with custom shaders (Glow & Quantum Plasma effects)
- **Smooth Animations** - Scroll-triggered animations with Framer Motion
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Modern UI Components** - Built with shadcn/ui and Radix UI
- **Dark Mode Support** - Seamless dark/light theme switching
- **Dynamic Content** - All content managed in JSON for easy updates
- **Contact Form** - Integrated contact system with toast notifications
- **Skills Showcase** - Animated skill progress bars with categories
- **Project Portfolio** - Grid-based project display with live links

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Bun or npm package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd galaxy-render-portfolio

# Install dependencies
bun install
# or
npm install

# Start development server
bun dev
# or
npm run dev
```

The app will be available at `http://localhost:8080`

## 📦 Available Scripts

```bash
# Development server with hot reload
bun dev

# Production build
bun build

# Development build
bun build:dev

# Preview production build
bun preview

# Lint code
bun lint
```

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3 + PostCSS
- **3D Graphics**: Three.js + @react-three/fiber
- **Animations**: Framer Motion
- **UI Library**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **State Management**: TanStack React Query
- **Email**: EmailJS
- **Routing**: React Router DOM

## 📁 Project Structure

```
src/
├── pages/               # Page components
│   ├── Index.tsx       # Main portfolio page
│   └── NotFound.tsx    # 404 page
├── components/          # Reusable components
│   ├── Navbar.tsx      # Navigation header
│   ├── HeroSection.tsx # Introduction section
│   ├── AboutSection.tsx
│   ├── ProjectsSection.tsx
│   ├── SkillsSection.tsx
│   ├── ContactSection.tsx
│   ├── ThreeScene.tsx  # 3D background
│   └── ui/             # shadcn/ui components
├── data/
│   └── content.json    # All content (editable)
├── lib/
│   ├── utils.ts
│   └── shaders/        # Custom GLSL shaders
├── hooks/              # Custom React hooks
└── App.tsx            # Root component
```

## 🎨 Content Management

All website content is managed in `src/data/content.json`:

- Portfolio projects and descriptions
- About section text and features
- Skills and proficiency levels
- Contact information and labels

Simply edit the JSON file to update your portfolio without touching the code!

## 🌈 Customization

### Colors & Styling
- **Tailwind Config**: `tailwind.config.ts` - Customize theme colors and spacing
- **CSS Variables**: `src/index.css` - Update theme colors globally

### Components
- All UI components are from `src/components/ui/` (shadcn/ui)
- Fully customizable and well-documented

### 3D Scene
- Custom shaders located in `src/lib/shaders/`
- Edit `src/components/ThreeScene.tsx` for 3D configuration

## 🚢 Deployment

The app is a static SPA and can be deployed to any hosting service:

### Deploy to Vercel
```bash
# Vercel CLI will auto-detect the setup
vercel
```

### Deploy to Netlify
```bash
# Connect your Git repo to Netlify
# Auto-deploys on push to main
```

### Manual Deployment
```bash
# Build the app
bun build

# The `dist/` folder is ready to be deployed
```

## 📝 License

Feel free to use this project as a template for your own portfolio.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ❤️ and cosmic energy ✨
