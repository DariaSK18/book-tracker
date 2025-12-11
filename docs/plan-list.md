# List

## Phase 1 — Project Setup

- [x] **Setup repository**
  - [x] Create GitHub repository
  - [x] Add `.gitignore` (node_modules, .DS_Store, etc.)
  - [x] Add `README.md` and documentation files

- [x] **Setup project structure**
  - [x] Define folder structure for frontend and backend:

```bash
    /client
      /src
        /components
        /pages
        /router
        /assets
        /styles
        /api
        /context
        /layouts
    /server
       /routes
       /controllers
       /models
       /db
       /middleware
       /strategies
       /utils
       /config
    /docs
       plan.md
       plan-list.md
       /wireframes
```

- [x] Initialize npm projects for frontend and backend

- [x] **Setup development tools**
  - [x] Code linter and formatter (ESLint + Prettier)
  - [x] Install dependencies (React, Express, database client, etc.)
  - [x] Setup basic folder scaffolding and placeholder files

---

## Phase 2 — Planning & Design

- [ ] **Define core features**

  - [x] User authentication (signup/login)
  - [ ] Uploading books
  - [ ] Book rating
  - [ ] Notes section
  - [ ] Categories/tags
  - [ ] User profile

- [ ] **Create wireframes**

  - [ ] Draw screens for main pages (using figma): Home, Book Upload, Book Note, Profile, Login, Sign up

- [x] **Design database schema**

  - [x] Define tables/models: User, Book, Rating, Notes, Categories
  - [x] Define relationships (1-to-many, many-to-many)

- [ ] **Define API endpoints**
  - [x] User authentication (login/signup)
  - [x] Book CRUD (create, read, update, delete)
  - [ ] Rating and notes
  - [ ] Categories and filters

---

## Phase 3 — Backend Development

- [x] **Setup backend server**

  - [x] Initialize Express/Node server
  - [x] Setup database connection
  - [x] Setup basic routing

- [ ] **Implement core backend features**

  - [x] User authentication with session
  - [x] CRUD for books
  - [ ] Rating functionality
  - [ ] Notes API
  - [ ] Categories API

---

## Phase 4 — Frontend Development

- [x] **Setup frontend**

  - [x] Initialize React project
  - [x] Install dependencies (React Router, state management)

- [ ] **Implement core pages**

  - [ ] Home page / book page
  - [ ] Upload book page
  - [ ] Book detail page with notes
  - [ ] User profile page

- [ ] **Connect frontend to backend**

  - [x] Fetch for API calls
  - [x] Handle authentication tokens
  - [ ] Display ratings/notes dynamically

- [ ] **Add UI polish**
  - [ ] Responsive design
  - [ ] Loading states, error handling
  - [ ] Basic animations

---

## Phase 5 — Testing & QA

- [ ] **Manual testing**

  - [ ] Test all flows (signup, upload, like, note)
  - [ ] Check responsiveness on different devices

- [ ] **Bug fixing**
  - [ ] Create `fix/*` branches for issues

---

## Phase 6 — Deployment

- [ ] **Setup deployment environment**

  - [ ] Choose hosting for frontend (Render)
  - [ ] Choose hosting for backend (Render)
  - [ ] Setup environment variables

- [ ] **Deploy MVP**

  - [ ] Deploy develop branch to staging/testing
  - [ ] Test deployed version

- [ ] **Release**
  - [ ] Deploy main branch to production
