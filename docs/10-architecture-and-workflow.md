# 🏗️ SkillPath AI — Architecture & Workflow Documentation

> **A deep-dive into how the project is built, how its layers communicate, and how data flows end-to-end.**
> SDG 4 – Quality Education | MERN Stack + Groq AI

---

## 📋 Table of Contents

1. [High-Level Architecture Overview](#1-high-level-architecture-overview)
2. [Technology Stack](#2-technology-stack)
3. [Project Folder Structure](#3-project-folder-structure)
4. [Frontend Architecture](#4-frontend-architecture)
5. [Backend Architecture](#5-backend-architecture)
6. [Database Schema](#6-database-schema)
7. [AI Integration Architecture](#7-ai-integration-architecture)
8. [API Endpoints Reference](#8-api-endpoints-reference)
9. [Authentication & Security Workflow](#9-authentication--security-workflow)
10. [End-to-End User Workflow](#10-end-to-end-user-workflow)
11. [Data Flow Diagrams](#11-data-flow-diagrams)
12. [Deployment Architecture](#12-deployment-architecture)

---

## 1. High-Level Architecture Overview

SkillPath AI follows a classic **3-Tier MERN Architecture** combined with an external **AI Layer** powered by Groq API.

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER (Browser)                              │
└───────────────────────────────┬─────────────────────────────────────┘
                                │  HTTPS Requests
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│              TIER 1 — FRONTEND (React + Vite)                       │
│   Pages · Components · Context (Auth/Theme) · React Router          │
│   Deployed on: Vercel                                                │
└───────────────────────────────┬─────────────────────────────────────┘
                                │  REST API Calls (Axios)
                                │  JSON Payloads over HTTPS
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│              TIER 2 — BACKEND (Node.js + Express.js)                │
│   Routes · Controllers · Middleware · Services                       │
│   Auth (JWT + Cookies) · Rate Limiting · CORS · Helmet              │
│   Deployed on: Render / Railway                                      │
└─────────────┬──────────────────────────────┬────────────────────────┘
              │  Mongoose ODM                 │  Groq SDK (HTTP)
              ▼                               ▼
┌─────────────────────────┐     ┌────────────────────────────────────┐
│  TIER 3 — DATABASE      │     │  EXTERNAL AI LAYER                 │
│  MongoDB Atlas (Cloud)  │     │  Groq Cloud API                    │
│  7 Collections          │     │  Model: llama-3.3-70b-versatile    │
│  Mongoose Schemas       │     │  Tasks: Roadmap, Chat, Quiz,       │
│                         │     │         Project, Lesson generation  │
└─────────────────────────┘     └────────────────────────────────────┘
```

---

## 2. Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | v19 | UI component library |
| **Vite** | v8 | Dev server & build tool |
| **React Router DOM** | v7 | Client-side page routing |
| **Axios** | v1.15 | HTTP client for API calls |
| **Framer Motion** | v12 | Animations & transitions |
| **Recharts** | v3 | Dashboard charts & graphs |
| **React Icons** | v5 | Icon library |
| **React Hot Toast** | v2 | Toast notifications |
| **React Markdown** | v10 | Render AI markdown responses |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | ≥18 | JavaScript runtime |
| **Express.js** | v4 | Web framework & routing |
| **Mongoose** | v9 | MongoDB ODM |
| **bcryptjs** | v3 | Password hashing |
| **jsonwebtoken** | v9 | JWT token generation/verification |
| **Groq SDK** | v1.1 | AI API integration |
| **Helmet** | v8 | HTTP security headers |
| **cors** | v2 | Cross-Origin Resource Sharing |
| **express-rate-limit** | v8 | API rate limiting |
| **morgan** | v1 | HTTP request logging |
| **cookie-parser** | v1 | Cookie handling |
| **dotenv** | v17 | Environment variable management |

### Database & Cloud
| Technology | Purpose |
|------------|---------|
| **MongoDB Atlas** | Cloud-hosted NoSQL database |
| **Groq Cloud** | LLM inference API (llama-3.3-70b-versatile) |
| **Vercel** | Frontend deployment |
| **Render / Railway** | Backend deployment |

---

## 3. Project Folder Structure

```
SDG-Quality-Education/
│
├── README.md                          ← Master project index
│
├── frontend/                          ← React + Vite Application
│   ├── index.html                     ← HTML entry point
│   ├── vite.config.js                 ← Vite configuration
│   ├── vercel.json                    ← Vercel deployment config
│   ├── package.json                   ← Frontend dependencies
│   └── src/
│       ├── main.jsx                   ← App entry (ReactDOM.render)
│       ├── App.jsx                    ← Route definitions
│       ├── index.css                  ← Global CSS design system
│       ├── App.css                    ← App-level styles
│       ├── context/
│       │   ├── AuthContext.jsx        ← Auth state (user, token)
│       │   └── ThemeContext.jsx       ← Dark/light mode
│       ├── routes/
│       │   ├── ProtectedRoute.jsx     ← Guards auth-required pages
│       │   └── AdminRoute.jsx         ← Guards admin-only pages
│       ├── pages/
│       │   ├── LandingPage.jsx        ← Public home page
│       │   ├── AboutPage.jsx          ← About / SDG info
│       │   ├── LoginPage.jsx          ← User login
│       │   ├── RegisterPage.jsx       ← User registration
│       │   ├── OnboardingPage.jsx     ← Goal & skill setup
│       │   ├── DashboardPage.jsx      ← Main user dashboard
│       │   ├── RoadmapPage.jsx        ← AI learning roadmap
│       │   ├── ChatPage.jsx           ← AI chat assistant
│       │   ├── ProjectsPage.jsx       ← AI project suggestions
│       │   ├── ResourcesPage.jsx      ← Curated resources
│       │   ├── ProfilePage.jsx        ← User profile & settings
│       │   ├── NotFoundPage.jsx       ← 404 fallback
│       │   └── admin/
│       │       ├── AdminDashboard.jsx ← Admin overview
│       │       ├── AdminResources.jsx ← Manage resources
│       │       └── AdminUsers.jsx     ← Manage users
│       ├── components/
│       │   ├── landing/               ← Hero, Features, CTA sections
│       │   ├── layout/                ← Navbar, Footer, Sidebar
│       │   ├── learning/              ← Roadmap steps, quiz, lesson
│       │   └── ui/                    ← Reusable buttons, cards, modals
│       ├── hooks/                     ← Custom React hooks
│       ├── utils/                     ← Helper functions (e.g., axios config)
│       └── assets/                    ← Static images, SVGs
│
├── backend/                           ← Node.js + Express API Server
│   ├── server.js                      ← App entry point
│   ├── package.json                   ← Backend dependencies
│   ├── .env                           ← Secret environment variables
│   ├── .env.example                   ← Env variable template
│   ├── config/
│   │   └── db.js                      ← MongoDB connection setup
│   ├── middleware/
│   │   ├── authMiddleware.js          ← JWT token verification
│   │   ├── errorMiddleware.js         ← Global error handler
│   │   └── rateLimiter.js             ← API rate limiting rules
│   ├── models/                        ← Mongoose database schemas
│   │   ├── User.js
│   │   ├── Profile.js
│   │   ├── Roadmap.js
│   │   ├── Progress.js
│   │   ├── ChatHistory.js
│   │   ├── SavedProject.js
│   │   └── Resource.js
│   ├── controllers/                   ← Request handlers (business logic)
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── profileController.js
│   │   ├── roadmapController.js
│   │   ├── progressController.js
│   │   ├── chatController.js
│   │   ├── projectController.js
│   │   ├── resourceController.js
│   │   ├── learningController.js
│   │   └── adminController.js
│   ├── routes/                        ← Express route definitions
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── profileRoutes.js
│   │   ├── roadmapRoutes.js
│   │   ├── progressRoutes.js
│   │   ├── chatRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── resourceRoutes.js
│   │   ├── learningRoutes.js
│   │   └── adminRoutes.js
│   ├── services/
│   │   ├── aiService.js               ← Groq AI API integration
│   │   └── fallbackService.js         ← Offline/fallback responses
│   ├── utils/                         ← Shared utility helpers
│   └── data/                          ← Seed data / static content
│
├── docs/                              ← Teaching & architecture docs
│   ├── 01-project-overview.md
│   ├── 02-masterclass-division.md
│   ├── 03-architecture.md
│   ├── 04-api-and-ai.md
│   ├── 05-structure-and-build.md
│   ├── 06-guidelines-and-deployment.md
│   ├── 07-summary-and-tables.md
│   ├── 08-phase-wise-code-plan.md
│   ├── 09-teaching-support-notes.md
│   └── 10-architecture-and-workflow.md ← THIS FILE
│
└── notes/                             ← Masterclass session notes
    ├── day-0-orientation-session.md
    ├── masterclass-1-react-fundamentals.md
    ├── masterclass-2-advanced-ui.md
    ├── masterclass-3-dashboard-pages.md
    ├── masterclass-4-backend-apis.md
    ├── masterclass-5-database-mongodb.md
    ├── masterclass-6-fullstack-wiring.md
    ├── masterclass-7-deployment.md
    └── zoom-polls-master-reference.md
```

---

## 4. Frontend Architecture

### Routing Structure

The frontend uses **React Router DOM v7** for client-side routing. Routes are organized into three access tiers:

```
Public Routes (no auth required)
├── /                  → LandingPage
├── /about             → AboutPage
├── /login             → LoginPage
└── /register          → RegisterPage

Protected Routes (requires JWT auth via ProtectedRoute)
├── /onboarding        → OnboardingPage
├── /dashboard         → DashboardPage
├── /roadmap           → RoadmapPage
├── /chat              → ChatPage
├── /projects          → ProjectsPage
├── /resources         → ResourcesPage
└── /profile           → ProfilePage

Admin Routes (requires isAdmin flag via AdminRoute)
├── /admin             → AdminDashboard
├── /admin/resources   → AdminResources
└── /admin/users       → AdminUsers

Fallback
└── /*                 → NotFoundPage (404)
```

### State Management

State is managed via **React Context API** (no Redux needed for this scale):

| Context | What it stores | Consumed by |
|---------|---------------|-------------|
| `AuthContext` | `user` object, `token`, `login()`, `logout()` | All protected pages, Navbar |
| `ThemeContext` | `theme` (dark/light), `toggleTheme()` | Layout, all styled components |

### Component Hierarchy

```
main.jsx
└── BrowserRouter
    └── AuthContext.Provider
        └── ThemeContext.Provider
            └── App.jsx (Routes)
                ├── Layout (Navbar + Footer + Sidebar)
                │   └── [Page Component]
                │       └── [Feature Components]
                │           └── [UI Components (buttons, cards, modals)]
                └── ...
```

### Axios API Configuration

All API calls go through a **centralized Axios instance** (`src/utils/`) with:
- Base URL pointing to the backend API
- Credentials included (`withCredentials: true`) for cookie-based auth
- Interceptors to attach JWT token from `AuthContext`

---

## 5. Backend Architecture

### Request Lifecycle

Every incoming HTTP request travels through this pipeline:

```
Client Request
      │
      ▼
┌──────────────────────────────────────────────────┐
│  Global Middleware Stack (applied to all routes)  │
│  ① helmet()        — Security HTTP headers       │
│  ② cors()          — Cross-origin policy         │
│  ③ express.json()  — Parse JSON body             │
│  ④ cookieParser()  — Parse cookies               │
│  ⑤ morgan()        — Dev request logging         │
└──────────────────┬───────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────┐
│  Route Matching  (server.js)                      │
│  /api/auth      → authRoutes.js                  │
│  /api/users     → userRoutes.js                  │
│  /api/roadmaps  → roadmapRoutes.js               │
│  /api/chat      → chatRoutes.js                  │
│  /api/...       → [other routes]                 │
└──────────────────┬───────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────┐
│  Route-Level Middleware                           │
│  • authMiddleware.js — verifyToken (protect())   │
│  • rateLimiter.js    — request throttling         │
└──────────────────┬───────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────┐
│  Controller Function (business logic)             │
│  • Reads req.body / req.params / req.user         │
│  • Calls AI service or DB operation               │
│  • Sends res.json() response                      │
└──────────────────┬───────────────────────────────┘
                   │
          ┌────────┴────────┐
          ▼                 ▼
   MongoDB Atlas       Groq AI API
   (via Mongoose)      (via groq-sdk)
          │                 │
          └────────┬────────┘
                   ▼
             JSON Response
             sent to Client
```

### Module Responsibilities

| Module | File(s) | Responsibility |
|--------|---------|---------------|
| **Entry Point** | `server.js` | Bootstrap Express, mount middleware, register routes |
| **Config** | `config/db.js` | Establish MongoDB connection via Mongoose |
| **Routes** | `routes/*.js` | Define HTTP method + path + middleware chain |
| **Controllers** | `controllers/*.js` | Handle req/res, orchestrate DB and AI calls |
| **Models** | `models/*.js` | Mongoose schemas + data validation |
| **Services** | `services/aiService.js` | All Groq API communication logic |
| **Middleware** | `middleware/*.js` | Auth guard, error handler, rate limiter |

---

## 6. Database Schema

The application uses **7 MongoDB collections**:

### `users` Collection
```
User {
  name:         String (required)
  email:        String (unique, required)
  password:     String (hashed with bcryptjs)
  isAdmin:      Boolean (default: false)
  onboarded:    Boolean (default: false)
  createdAt:    Date (auto)
}
```

### `profiles` Collection
```
Profile {
  user:         ObjectId → ref: User (unique, required)
  goal:         String   ← learning goal (e.g., "Learn React")
  level:        String   ← skill level (beginner/intermediate/advanced)
  weeklyHours:  Number   ← hours available per week
  bio:          String
  avatar:       String
  updatedAt:    Date
}
```

### `roadmaps` Collection
```
Roadmap {
  user:              ObjectId → ref: User
  goal:              String
  level:             String
  weeklyHours:       Number
  estimatedDuration: String
  aiGenerated:       Boolean
  steps: [{
    stepNumber:  Number
    title:       String
    description: String
    duration:    String
    resources:   [String]
  }]
  createdAt:         Date
}
```

### `progresses` Collection
```
Progress {
  user:           ObjectId → ref: User
  roadmap:        ObjectId → ref: Roadmap
  completedSteps: [Number] ← array of completed step numbers
  updatedAt:      Date
}
```

### `chathistories` Collection
```
ChatHistory {
  user:     ObjectId → ref: User
  messages: [{
    role:      String ("user" | "assistant")
    content:   String
    timestamp: Date
  }]
  updatedAt: Date
}
```

### `savedprojects` Collection
```
SavedProject {
  user:          ObjectId → ref: User
  title:         String
  description:   String
  difficulty:    String
  techStack:     [String]
  estimatedTime: String
  savedAt:       Date
}
```

### `resources` Collection
```
Resource {
  title:       String (required)
  description: String
  url:         String
  category:    String
  addedBy:     ObjectId → ref: User (Admin)
  createdAt:   Date
}
```

### Entity Relationship Diagram

```
User ──────────────┬── Profile         (1 : 1)
                   ├── Roadmap         (1 : many)
                   ├── Progress        (1 : many)
                   ├── ChatHistory     (1 : 1)
                   ├── SavedProject    (1 : many)
                   └── Resource        (Admin adds: 1 : many)
```

---

## 7. AI Integration Architecture

The AI layer uses **Groq Cloud** with the `llama-3.3-70b-versatile` model via the `groq-sdk` npm package.

### AI Features & Flow

```
                    ┌────────────────────────────────┐
                    │       aiService.js              │
                    │                                 │
    Roadmap Gen  ──►│  generateRoadmapWithAI()        │──► Groq API
    Project Gen  ──►│  generateProjectRecommendations()│──► Groq API
    AI Chat      ──►│  chatWithAI()                   │──► Groq API
    Lesson Gen   ──►│  generateStepLesson()           │──► Groq API
    Quiz Gen     ──►│  generateStepQuiz()             │──► Groq API
                    │                                 │
                    │  ❌ If GROQ_API_KEY missing:    │
                    │  fallbackService.js (offline)   │
                    └────────────────────────────────┘
```

### AI Prompting Strategy

| Feature | Model Temperature | Output Format | Fallback |
|---------|------------------|---------------|----------|
| Roadmap Generation | 0.3 (low = consistent JSON) | JSON object | Rule-based roadmap |
| Project Recommendations | 0.5 | JSON array | Hardcoded project list |
| AI Chat | 0.7 (creative) | Plain text (markdown) | Offline message |
| Step Lesson | 0.5 | Markdown text | Error message |
| Step Quiz | 0.3 (precise) | JSON array | `null` |

### Fallback Strategy

If the Groq API key is not configured or the API call fails, `fallbackService.js` kicks in:
- **Roadmap**: Returns a pre-defined rule-based roadmap based on goal keywords
- **Projects**: Returns a hardcoded curated list of projects by difficulty level
- This ensures the app **never crashes** for users even without an API key

---

## 8. API Endpoints Reference

All endpoints are prefixed with `/api`.

### Auth Routes (`/api/auth`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/register` | Public | Create new user account |
| `POST` | `/login` | Public | Login and set JWT cookie |
| `POST` | `/logout` | Public | Clear auth cookie |
| `GET`  | `/me` | 🔒 Protected | Get current logged-in user |

### User Routes (`/api/users`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/` | 🔑 Admin | Get all users |
| `DELETE` | `/:id` | 🔑 Admin | Delete a user |

### Profile Routes (`/api/profiles`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/me` | 🔒 Protected | Get user profile |
| `PUT` | `/me` | 🔒 Protected | Update user profile |

### Roadmap Routes (`/api/roadmaps`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/generate` | 🔒 Protected | Generate AI roadmap |
| `GET` | `/me` | 🔒 Protected | Get saved roadmap |

### Progress Routes (`/api/progress`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/me` | 🔒 Protected | Get user progress |
| `PUT` | `/me` | 🔒 Protected | Update step completion |

### Chat Routes (`/api/chat`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/` | 🔒 Protected | Send message to AI |
| `GET` | `/history` | 🔒 Protected | Get chat history |

### Project Routes (`/api/projects`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/suggestions` | 🔒 Protected | Get AI project ideas |
| `POST` | `/save` | 🔒 Protected | Save a project |
| `GET` | `/saved` | 🔒 Protected | Get saved projects |

### Resource Routes (`/api/resources`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/` | 🔒 Protected | Get all resources |
| `POST` | `/` | 🔑 Admin | Add a resource |
| `DELETE` | `/:id` | 🔑 Admin | Delete a resource |

### Learning Routes (`/api/learning`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/lesson` | 🔒 Protected | Generate AI mini-lesson |
| `POST` | `/quiz` | 🔒 Protected | Generate AI quiz |

### Admin Routes (`/api/admin`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/stats` | 🔑 Admin | Platform-wide analytics |
| `GET` | `/users` | 🔑 Admin | All users with details |

### Health Check
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/health` | Public | API status check |

---

## 9. Authentication & Security Workflow

### Registration Flow

```
User fills Register Form
        │
        ▼
POST /api/auth/register
        │
        ▼
Validate input (email unique, password length)
        │
        ▼
Hash password with bcryptjs (salt rounds: 10)
        │
        ▼
Save new User document to MongoDB
        │
        ▼
Generate JWT token (signed with JWT_SECRET)
        │
        ▼
Set JWT as HttpOnly Cookie (expires: 30 days)
        │
        ▼
Return { user: { id, name, email, isAdmin } }
        │
        ▼
Frontend → AuthContext updates user state
        │
        ▼
Redirect to /onboarding
```

### Login Flow

```
User fills Login Form
        │
        ▼
POST /api/auth/login
        │
        ▼
Find user by email in MongoDB
        │
        ├── Not found → 401 Unauthorized
        │
        ▼
Compare password hash (bcryptjs.compare)
        │
        ├── Mismatch → 401 Unauthorized
        │
        ▼
Generate new JWT token
        │
        ▼
Set HttpOnly Cookie
        │
        ▼
Return user data → Frontend updates AuthContext
        │
        ▼
Redirect to /dashboard
```

### Protected Route Guard

```
User navigates to /dashboard
        │
        ▼
ProtectedRoute checks AuthContext
        │
        ├── No user in context → Redirect to /login
        │
        ▼
Page renders normally
        │
        ▼
Page makes API call → authMiddleware.js intercepts
        │
        ▼
JWT extracted from cookie
        │
        ├── Invalid/expired → 401 → Frontend logout
        │
        ▼
req.user set → Controller executes
```

### Security Measures Summary

| Layer | Measure | Implementation |
|-------|---------|---------------|
| **Transport** | HTTPS only | Enforced by Vercel/Render |
| **Headers** | Security headers | `helmet()` middleware |
| **Auth** | JWT in HttpOnly Cookie | Prevents XSS token theft |
| **Password** | Hashed storage | `bcryptjs` (never stored plain) |
| **CORS** | Whitelist origins | Only frontend URL allowed |
| **Rate Limit** | API throttling | `express-rate-limit` on sensitive routes |
| **Admin Guard** | Role-based access | `isAdmin` check in `AdminRoute` + backend |

---

## 10. End-to-End User Workflow

Here is the complete journey of a new user through the platform:

```
STEP 1: Discovery
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
User visits the Landing Page (/)
  → Views features, hero section, SDG 4 mission
  → Clicks "Get Started" or "Sign Up"

STEP 2: Registration
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
User fills RegisterPage (/register)
  → Enters name, email, password
  → POST /api/auth/register
  → JWT cookie set → AuthContext updated
  → Redirected to /onboarding

STEP 3: Onboarding
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
User fills OnboardingPage (/onboarding)
  → Selects learning goal (e.g., "Learn React")
  → Selects skill level (beginner / intermediate / advanced)
  → Inputs weekly hours available
  → PUT /api/profiles/me → profile saved
  → POST /api/roadmaps/generate → AI roadmap generated
  → Redirected to /dashboard

STEP 4: Dashboard
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DashboardPage (/dashboard) loads:
  → GET /api/profiles/me  → displays goal, level
  → GET /api/roadmaps/me  → shows roadmap summary
  → GET /api/progress/me  → renders progress bar & charts
  → Overview of completed steps, streaks, next step

STEP 5: Learning via Roadmap
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RoadmapPage (/roadmap):
  → GET /api/roadmaps/me → displays full step-by-step plan
  → User clicks a step → POST /api/learning/lesson (AI mini-lesson)
  → User takes quiz → POST /api/learning/quiz (AI quiz)
  → User marks step done → PUT /api/progress/me

STEP 6: AI Chat Support
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ChatPage (/chat):
  → User types a question
  → POST /api/chat → AI assistant responds
  → Chat history saved to MongoDB
  → GET /api/chat/history → loads previous session

STEP 7: Project Discovery
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ProjectsPage (/projects):
  → GET /api/projects/suggestions → AI recommends projects by level
  → User saves a project → POST /api/projects/save
  → GET /api/projects/saved → view saved projects

STEP 8: Resources
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ResourcesPage (/resources):
  → GET /api/resources → lists admin-curated learning resources
  → User browses and opens links

STEP 9: Profile Management
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ProfilePage (/profile):
  → GET /api/profiles/me → view profile
  → PUT /api/profiles/me → update goal, bio, avatar
  → Theme toggle → ThemeContext updates UI

STEP 10: Admin Management (if isAdmin)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Admin navigates to /admin:
  → GET /api/admin/stats → platform analytics
  → GET /api/admin/users → manage all users
  → POST /api/resources → add curated resources
  → DELETE /api/resources/:id → remove resources
```

---

## 11. Data Flow Diagrams

### Roadmap Generation Flow (AI Core Feature)

```
OnboardingPage
     │
     │  { goal, level, weeklyHours }
     ▼
POST /api/roadmaps/generate
     │
     ▼
authMiddleware.js (verify JWT)
     │
     ▼
roadmapController.js
     │
     ├──► aiService.generateRoadmapWithAI(goal, level, weeklyHours)
     │         │
     │         ▼
     │    Groq API (llama-3.3-70b-versatile)
     │    prompt: "Generate a roadmap for goal X, level Y, Z hours/week"
     │         │
     │         ▼ JSON response
     │    Parse + validate JSON
     │         │
     │         ├── ✅ Valid → Return structured roadmap steps
     │         └── ❌ Error → fallbackService.generateFallbackRoadmap()
     │
     ▼
Save to MongoDB (Roadmap collection)
     │
     ▼
Return roadmap JSON to frontend
     │
     ▼
RoadmapPage renders step-by-step learning plan
```

### AI Chat Flow

```
ChatPage (User types message)
     │
     │  { messages: [...chatHistory, newMessage] }
     ▼
POST /api/chat
     │
     ▼
chatController.js
     │
     ├──► Save user message to MongoDB (ChatHistory)
     │
     ├──► aiService.chatWithAI(messages)
     │         │
     │         ▼
     │    Groq API with system prompt:
     │    "You are SkillPath AI, a friendly technical mentor..."
     │         │
     │         ▼ AI response text
     │
     ├──► Save AI response to MongoDB
     │
     ▼
Return { response: "AI answer text" }
     │
     ▼
ChatPage renders AI response via react-markdown
```

---

## 12. Deployment Architecture

### Production Setup

```
┌─────────────────────────────────────────────────────────────┐
│  INTERNET (Users worldwide)                                  │
└───────────────┬─────────────────────────────────────────────┘
                │
    ┌───────────┴───────────┐
    │                       │
    ▼                       ▼
┌────────────┐       ┌──────────────┐
│  Vercel    │       │  Render /    │
│  (Frontend)│       │  Railway     │
│            │       │  (Backend)   │
│  React app │       │              │
│  + CDN     │  ───► │  Node.js     │
│  HTTPS/SSL │       │  Express     │
│  auto      │       │  Port 5000   │
└────────────┘       └──────┬───────┘
                            │
              ┌─────────────┴──────────────┐
              │                            │
              ▼                            ▼
    ┌─────────────────┐        ┌──────────────────────┐
    │  MongoDB Atlas  │        │  Groq Cloud API      │
    │  (Cloud DB)     │        │  (AI Inference)      │
    │  Auto-scaling   │        │  llama-3.3-70b       │
    │  Backup + SSL   │        │  GROQ_API_KEY        │
    └─────────────────┘        └──────────────────────┘
```

### Environment Variables

**Backend (`.env`)**
```
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/skillpath
JWT_SECRET=<your_secure_random_secret>
GROQ_API_KEY=<your_groq_api_key>
CLIENT_URL=https://your-app.vercel.app
```

**Frontend (`.env`)**
```
VITE_API_URL=https://your-backend.render.com
```

### Deployment Checklist

| Step | Platform | Action |
|------|----------|--------|
| 1. DB | MongoDB Atlas | Create cluster, get `MONGO_URI` |
| 2. AI | Groq Console | Get `GROQ_API_KEY` |
| 3. Backend | Render/Railway | Connect GitHub repo, set env vars, deploy `backend/` |
| 4. Frontend | Vercel | Connect GitHub repo, set `VITE_API_URL`, deploy `frontend/` |
| 5. CORS | Backend | Update `CLIENT_URL` to Vercel URL |
| 6. Test | Browser | Visit Vercel URL, register, test all features |

---

## 📌 Quick Reference Summary

| Aspect | Detail |
|--------|--------|
| **Architecture Pattern** | 3-Tier MERN (Client → API Server → Database) + External AI |
| **Frontend Framework** | React 19 + Vite 8 |
| **Backend Framework** | Node.js ≥18 + Express 4 |
| **Database** | MongoDB Atlas (7 collections via Mongoose) |
| **AI Model** | Groq — `llama-3.3-70b-versatile` |
| **Auth Strategy** | JWT stored in HttpOnly Cookie (30-day expiry) |
| **State Management** | React Context API (Auth + Theme) |
| **Routing** | React Router DOM v7 (client-side SPA routing) |
| **Styling** | Vanilla CSS with custom design system (`index.css`) |
| **Animations** | Framer Motion |
| **Charts** | Recharts |
| **API Style** | RESTful JSON API |
| **Security** | Helmet, CORS, bcryptjs, Rate Limiting, JWT |
| **Frontend Deploy** | Vercel (with `vercel.json` SPA config) |
| **Backend Deploy** | Render / Railway |
| **AI Fallback** | Rule-based offline generator (no API key needed) |
| **SDG Alignment** | SDG 4 — Quality Education (Targets 4.4 & 4.b) |

---

*Document created as part of the SkillPath AI — SDG 4 Quality Education Project.*
*Part of the 7-Masterclass MERN Full-Stack Teaching Blueprint.*
