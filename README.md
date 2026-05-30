# StockFlow — Inventory Management Dashboard

A professional enterprise SaaS inventory management dashboard built with React + Vite.

## Tech Stack

- **React 18** — UI library
- **Vite** — Build tool
- **Tailwind CSS** — Utility-first styling
- **Recharts** — Charts and data visualization
- **Framer Motion** — Animations
- **React Router DOM** — Routing
- **Lucide React** — Icons

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── assets/           # Static assets
├── components/
│   ├── ui/           # Reusable UI primitives (Button, Card, Modal, Table...)
│   ├── layout/       # Sidebar, Topbar, MainLayout
│   ├── dashboard/    # Dashboard-specific components
│   ├── charts/       # Recharts wrappers
│   └── forms/        # Form components
├── pages/            # Page-level components
├── routes/           # AppRoutes router
├── context/          # AppContext (global state)
├── hooks/            # Custom hooks
├── data/             # Static/mock data
├── utils/            # Formatters, constants
└── styles/           # Global CSS
```

## Demo Login

Use any email and any password to log in.

## Features

- 📊 Dashboard with live stats and charts
- 📦 Inventory management with filters
- 🏷️ Product catalog (grid/list view)
- 🛒 Orders tracking with timeline
- 🤝 Supplier management
- 📈 Analytics with revenue charts
- 📋 Reports center
- ⚙️ Settings with profile, notifications, security
