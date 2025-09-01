# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a personal website project for "Muizz N Wali" built with Next.js 15, TypeScript, and Firebase. The site includes multiple features including a portfolio homepage, admin panel, todo application with real-time authentication, and various utility apps.

## Architecture

### Next.js App Router Structure
- **Next.js 15** with App Router (`src/app/`) - modern routing with layouts and page components
- **TypeScript** throughout the codebase for type safety
- **Turbopack** enabled for faster builds and development

### Key Application Areas
1. **Homepage (`/`)** - Personal portfolio with information about Muizz and Wali
2. **Todo App (`/todo`)** - Full-featured task management with Firebase auth and real-time sync
3. **Admin Panel (`/admin`)** - Protected admin interface with cookie-based authentication
4. **Downloads Page (`/downloads`)** - File download utilities
5. **Heavy Duty Calculator (`/heavy-duty-calculator`)** - Custom calculator tool
6. **AI Interface (`/ai`)** - AI processing features

### Firebase Integration
- **Authentication** - Email/password auth with user profiles stored in Realtime Database
- **Realtime Database** - Task storage with user-scoped security rules
- **Real-time Sync** - Tasks update live across sessions via Firebase listeners
- Firebase config uses environment variables (see `lib/firebase.ts`)

### State Management & Context
- **AuthContext** (`contexts/AuthContext.tsx`) - Global authentication state management
- Real-time task synchronization via Firebase listeners
- No additional state management libraries (uses React built-ins)

### Styling & UI
- **Tailwind CSS v4** with extensive custom animations and utilities
- **Custom CSS** for specific components (todo.css, various app-specific styles)
- **Responsive Design** throughout with mobile-first approach
- **Animation System** - Custom keyframes and transitions for enhanced UX

## Development Commands

### Core Development
```bash
# Start development server with Turbopack
npm run dev

# Build for production with Turbopack  
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Firebase Setup
Before running the todo app, ensure Firebase is properly configured:

1. Set up environment variables for Firebase configuration
2. Enable Authentication with Email/Password in Firebase Console
3. Set up Realtime Database security rules (see `FIREBASE_AUTH_SETUP.md`)
4. Test at `http://localhost:3000/todo`

### Project-Specific Commands
```bash
# Run specific page in development
npm run dev
# Then navigate to:
# http://localhost:3000/todo - Todo application
# http://localhost:3000/admin - Admin panel  
# http://localhost:3000/downloads - Downloads page

# Test Firebase connection
# Visit http://localhost:3000/test-firebase for debugging
```

## Important File Locations

### Configuration
- `next.config.ts` - Next.js configuration with Turbopack setup
- `tailwind.config.ts` - Tailwind configuration with custom animations
- `tsconfig.json` - TypeScript configuration with path aliases (`@/*` -> `./src/*`)

### Core Utilities
- `lib/firebase.ts` - Firebase initialization and configuration
- `lib/authHelpers.ts` - Authentication utilities and user management
- `lib/todoHelpers.ts` - Todo application business logic and Firebase operations
- `contexts/AuthContext.tsx` - Global authentication context provider

### Key Components
- `components/AuthForm.tsx` - Authentication form for login/signup
- `components/navbar/navbar.tsx` - Site navigation component
- Page-specific client components in respective app directories

## Development Considerations

### Authentication Flow
- Todo app uses Firebase Authentication with real-time user profile sync
- Admin panel uses separate cookie-based authentication system
- Protected routes use middleware (`src/middleware.ts`) for access control

### Firebase Security
- User data is scoped to authenticated user IDs
- Tasks and user profiles are protected by Firebase security rules
- Environment variables must be configured for Firebase integration

### Styling Patterns
- Extensive use of Tailwind utilities with custom animation classes
- Component-specific CSS files for complex styling (todo.css)
- Consistent use of gradient backgrounds and shadow effects
- Mobile-responsive design patterns throughout

### Code Organization
- Server Components for static content and layouts
- Client Components for interactive features (marked with 'use client')
- Utility functions separated into `lib/` directory
- Context providers for global state management

## Debugging & Testing

### Firebase Debugging
- Use `/test-firebase` route for Firebase connection testing
- Check browser console for authentication state changes
- Verify environment variables are properly loaded

### Development Environment
- Default development port: 3000
- Turbopack provides fast refresh and detailed error reporting
- TypeScript provides compile-time error checking

## Important Notes

- This is a personal portfolio/testing project for brothers Muizz and Wali
- Firebase requires proper environment configuration before running todo features
- Admin panel has separate authentication from user-facing features
- The project includes advertising integration code (currently commented out)
