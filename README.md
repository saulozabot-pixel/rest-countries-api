# 🌍 REST Countries API with Theme Switcher

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?logo=tailwindcss)

A beautiful, fully-functional countries explorer built with the REST Countries API. Features dark/light theme switching, search, filtering, and detailed country information.

## 🔗 Links

- **Live Demo**: [Coming soon - Vercel deployment]
- **Repository**: [GitHub](https://github.com/saulozabot-pixel/rest-countries-api)

## ✨ Features

- ✅ **Browse All Countries** - View all countries in a responsive grid
- ✅ **Search Functionality** - Search for countries by name (debounced)
- ✅ **Region Filter** - Filter countries by region (Africa, Americas, Asia, Europe, Oceania)
- ✅ **Country Details** - View detailed information about each country
- ✅ **Border Countries** - Navigate to bordering countries
- ✅ **Dark/Light Theme** - Toggle between themes with localStorage persistence
- ✅ **Responsive Design** - Mobile-first approach, works on all devices
- ✅ **Type Safety** - Full TypeScript coverage

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **API**: REST Countries API v3.1
- **State Management**: React Context (Theme) + URL Search Params (Filters)
- **Icons**: Lucide React
- **Font**: Nunito Sans (300, 600, 800)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
rest-countries-api/
├── app/
│   ├── country/[code]/
│   │   └── page.tsx          # Country detail page (Server Component)
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page (Client Component)
│   └── globals.css            # Global styles + theme variables
├── components/
│   ├── ClientLayout.tsx       # Client wrapper for theme provider
│   ├── CountryCard.tsx        # Country card component
│   ├── CountryGrid.tsx        # Grid with loading states
│   ├── Header.tsx             # Header with theme toggle
│   ├── RegionFilter.tsx       # Region dropdown filter
│   └── SearchBar.tsx          # Debounced search input
├── contexts/
│   └── ThemeContext.tsx       # Theme context + localStorage
└── lib/
    ├── api.ts                 # REST Countries API client
    ├── types.ts               # TypeScript interfaces
    └── utils.ts               # Utility functions
```

## 🎨 Design Decisions

### Theme Management
- **React Context** for global theme state
- **localStorage** persistence across sessions
- **System preference** detection on first load
- Smooth CSS transitions between themes

### API Integration
- **Client-side fetching** for search/filter interactivity
- **Server Components** for country detail pages (SEO-friendly)
- Combined search + filter logic
- Error handling for API failures

### Responsive Approach
- Mobile-first design (375px → 1440px)
- Grid adapts: 1 column (mobile) → 2 (tablet) → 3 (desktop) → 4 (large)
- Touch-friendly interactive elements

## 🧪 Features Tested

- [x] All countries load correctly
- [x] Search filters countries by name
- [x] Region filter works independently
- [x] Combined search + filter works
- [x] Country detail page displays all information
- [x] Border countries navigation works
- [x] Theme toggle switches between light/dark
- [x] Theme persists across page refreshes
- [x] Back button returns to home
- [x] Responsive on mobile, tablet, desktop

## 📝 License

MIT © SAULO

---

**Frontend Mentor Challenge**: [REST Countries API with color theme switcher](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5c375394e6170a6c30132c1e)
