# Overview

This is a Digital Tasbih Counter application built with React/TypeScript frontend and Express.js backend. The app provides a mobile-optimized interface for Islamic dhikr (remembrance) counting with features like multiple dhikr types, progress tracking, and statistics. The application uses a full-stack architecture with shadcn/ui components for a modern, accessible user interface.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React hooks with localStorage persistence for counter data
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Development Server**: Uses Vite middleware in development mode
- **Storage Interface**: Abstracted storage layer with memory implementation for users
- **Error Handling**: Centralized error middleware with structured error responses
- **Logging**: Custom request logging for API endpoints

## Data Storage Solutions
- **Client-side**: localStorage for persisting counter data and user preferences
- **Schema Validation**: Zod schemas for runtime type checking and data validation
- **Database Ready**: Drizzle ORM configured for PostgreSQL with Neon Database
- **Migration Support**: Drizzle-kit for database schema migrations

## Authentication and Authorization
- **Session Management**: Express sessions with PostgreSQL session store (connect-pg-simple)
- **User Model**: Basic user schema with username/ID structure
- **Storage Interface**: Prepared for user authentication with getUserByUsername methods

## Mobile Optimization
- **Responsive Design**: Mobile-first approach with touch-optimized interactions
- **Haptic Feedback**: Navigator vibrate API integration for counter interactions
- **Progressive Enhancement**: Works offline with localStorage persistence
- **Touch Interactions**: Press animations and visual feedback for counter buttons

## Key Features
- **Multiple Dhikr Types**: Support for different Islamic remembrance phrases
- **Progress Tracking**: Visual progress indicators and target counting
- **Statistics**: Daily streaks, weekly totals, and all-time counters
- **Accessible UI**: Screen reader friendly with proper ARIA labels
- **Data Persistence**: Automatic saving to localStorage with data validation

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL database (@neondatabase/serverless)
- **Drizzle ORM**: Type-safe SQL query builder and schema management
- **connect-pg-simple**: PostgreSQL session store for Express sessions

## UI and Styling
- **Radix UI**: Unstyled, accessible UI primitives for complex components
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **shadcn/ui**: Pre-built component library with consistent design system
- **Lucide Icons**: Modern icon library for UI elements

## Development Tools
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form handling with validation (@hookform/resolvers)
- **date-fns**: Date utility library for time-based calculations
- **class-variance-authority**: Type-safe variant API for component styling

## Build and Development
- **Vite**: Fast build tool with HMR and plugin ecosystem
- **TypeScript**: Static type checking across frontend and backend
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind and Autoprefixer