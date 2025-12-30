# Beauty Cops 🎨

A modern, responsive beauty products e-commerce platform built with Next.js, featuring a beautiful Arabic interface with RTL support.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Project Structure](#project-structure)
- [Key Pages & Routes](#key-pages--routes)
- [Styling & Design System](#styling--design-system)
- [Available Scripts](#available-scripts)
- [Configuration](#configuration)
- [Deployment](#deployment)

## 🎯 Overview

Beauty Cops is a comprehensive beauty products e-commerce platform designed for Arabic-speaking users. The application provides an intuitive interface for browsing, searching, and discovering beauty products across multiple categories including skincare, haircare, makeup, and perfumes. The platform features a blog with beauty tips, product ratings, user profiles, and a favorites system.

## ✨ Features

### Core Functionality
- 🛍️ **Product Browsing**: Browse products by category with detailed product pages
- 🔍 **Advanced Search**: Search products by name with an intuitive search interface
- ⭐ **Rating System**: Comprehensive product rating and review system
- ❤️ **Favorites**: Save favorite products to your wishlist
- 📰 **Blog**: Beauty tips, skincare guides, and product information articles
- 👤 **User Profiles**: Manage your account and preferences
- 🔔 **Notifications**: Stay updated with notifications
- 📱 **Responsive Design**: Fully responsive across mobile, tablet, and desktop
- 🌐 **RTL Support**: Right-to-left layout optimized for Arabic language

### User Authentication
- Login and registration
- Password reset functionality
- Account management
- Profile customization

### Categories
- **العناية** (Care/Skincare)
- **الشعر** (Hair)
- **المكياج** (Makeup)
- **العطور** (Perfumes)

## 🛠️ Tech Stack

### Core Technologies
- **[Next.js 16.0.1](https://nextjs.org/)** - React framework with App Router
- **[React 19.2.0](https://react.dev/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 3.4.1](https://tailwindcss.com/)** - Utility-first CSS framework

### Key Dependencies
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[React Country Flag](https://www.npmjs.com/package/react-country-flag)** - Country flag components

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18.0 or higher
- **pnpm** (recommended) or npm/yarn/bun
- A code editor (VS Code recommended)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd beautycops
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 💻 Development

### Development Server

Start the development server with hot-reload:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

### Code Quality

**Linting:**
```bash
pnpm lint              # Check for linting errors
pnpm lint:fix          # Fix linting errors automatically
```

**Type Checking:**
```bash
pnpm type-check        # Run TypeScript type checking
```

**Formatting:**
```bash
pnpm format            # Format code with Prettier
pnpm format:check      # Check code formatting
```

## 📁 Project Structure

```
beautycops/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── account/           # Account management
│   ├── blog/              # Blog pages (list and detail)
│   ├── favorites/         # User favorites/wishlist
│   ├── forgot-password/   # Password recovery
│   ├── login/             # Login page
│   ├── notifications/     # Notifications page
│   ├── products/          # Product pages (list and detail)
│   ├── profile/           # User profile
│   ├── rating-system/     # Rating system information
│   ├── register/          # Registration page
│   ├── reset-password/    # Password reset
│   ├── sections/          # Reusable page sections
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── assets/                # Static assets
│   ├── icons/             # Custom icons
│   └── images/           # Image assets
├── components/            # React components
│   ├── home/             # Home-specific components
│   ├── Badge.tsx         # Badge component
│   ├── BottomNavbar.tsx  # Mobile bottom navigation
│   ├── Button.tsx        # Button component
│   ├── CarouselSnap.tsx  # Carousel component
│   ├── Footer.tsx        # Footer component
│   ├── Icon.tsx          # Icon wrapper component
│   ├── Input.tsx         # Input component
│   ├── MainNavbar.tsx    # Main navigation
│   ├── MobileMenu.tsx    # Mobile menu
│   ├── NavbarContainer.tsx
│   ├── PageHeader.tsx    # Page header component
│   ├── ProductCard.tsx   # Product card component
│   ├── RatingStars.tsx   # Rating stars component
│   └── SectionHeader.tsx # Section header component
├── lib/                   # Utility libraries
│   ├── breakpoints.ts    # Responsive breakpoints
│   ├── constants.ts      # Application constants
│   ├── design-tokens.ts  # Design system tokens
│   └── icon-utils.ts     # Icon utilities
├── public/                # Public static files
│   ├── icons/            # SVG icon library
│   └── logo.png         # Application logo
├── types/                 # TypeScript type definitions
│   ├── env.d.ts         # Environment types
│   └── index.ts         # Shared types
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies
```

## 🗺️ Key Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with hero banners, categories, products, and blog |
| `/products` | Product listing page |
| `/products/[id]` | Individual product detail page |
| `/blog` | Blog listing page |
| `/blog/[id]` | Individual blog article page |
| `/login` | User login page |
| `/register` | User registration page |
| `/forgot-password` | Password recovery page |
| `/reset-password` | Password reset page |
| `/profile` | User profile page |
| `/account` | Account management page |
| `/favorites` | User favorites/wishlist page |
| `/notifications` | Notifications page |
| `/about` | About page |
| `/rating-system` | Rating system information page |

## 🎨 Styling & Design System

### Design Tokens

The application uses a comprehensive design system with CSS variables for theming:

**Brand Colors:**
- Primary: `#b24f87`
- Button states (default, hover, disabled, focus)

**Natural Colors:**
- White, borders, text colors, input hints

**Status Colors:**
- Error, warning, success with light variants

### Tailwind Configuration

The project uses Tailwind CSS with custom configuration:
- Custom color palette mapped to CSS variables
- Custom spacing values
- Font family configuration (Rubik font)
- Responsive breakpoints

### Typography

- **Font Family**: Rubik (loaded from Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800, 900
- **Subsets**: Latin, Arabic

### Responsive Design

The application is fully responsive with breakpoints:
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build production application |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Fix ESLint errors |
| `pnpm type-check` | Run TypeScript type checking |
| `pnpm format` | Format code with Prettier |
| `pnpm format:check` | Check code formatting |

## ⚙️ Configuration

### Next.js Configuration (`next.config.ts`)

- Image optimization (AVIF, WebP formats)
- Compression enabled
- TypeScript strict checking
- ESLint checking during builds

### TypeScript Configuration

- Strict mode enabled
- Path aliases configured (`@/*` maps to root)
- React JSX support
- ES2017 target

### Environment Variables

Create a `.env.local` file in the root directory for environment-specific variables:

```env
# Example environment variables
# NEXT_PUBLIC_API_URL=your_api_url
```

## 🚢 Deployment

### Build for Production

```bash
pnpm build
```

### Start Production Server

```bash
pnpm start
```

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and configure the build

Alternatively, you can use the Vercel CLI:

```bash
pnpm add -g vercel
vercel
```

### Other Deployment Options

- **Netlify**: Configure build command as `pnpm build` and publish directory as `.next`
- **Docker**: Create a Dockerfile for containerized deployment
- **Traditional hosting**: Follow Next.js deployment documentation

## 📝 Notes

- The application uses the App Router (Next.js 13+ feature)
- RTL (Right-to-Left) support is built-in for Arabic language
- All components are TypeScript-based with type safety
- The design system uses CSS variables for easy theming
- Image optimization is handled automatically by Next.js

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

---

**Built with ❤️ using Next.js and React**
