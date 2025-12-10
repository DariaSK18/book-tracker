# List

## Phase 1 — Project Setup

- [x] **Setup repository**
  - [x] Create GitHub repository
  - [x] Add `.gitignore` (node_modules, .DS_Store, etc.)
  - [x] Add `README.md` and documentation files

- [ ] **Setup project structure**
  - [ ] Define folder structure for frontend and backend:

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

- [ ] Initialize npm projects for frontend and backend

- [ ] **Setup development tools**
  - [ ] Code linter and formatter (ESLint + Prettier) (optional)
  - [ ] Install dependencies (React, Express, database client, etc.)
  - [ ] Setup basic folder scaffolding and placeholder files

---

## Phase 2 — Planning & Design

- [ ] **Define core features**

  - [ ] User authentication (signup/login)
  - [ ] Uploading books
  - [ ] Book rating
  - [ ] Notes section
  - [ ] Categories/tags
  - [ ] User profile

- [ ] **Create wireframes**

  - [ ] Draw screens for main pages (using figma): Home, Book Upload, Book Note, Profile, Login, Sign up

- [ ] **Design database schema**

  - [ ] Define tables/models: User, Book, Rating, Notes, Categories
  - [ ] Define relationships (1-to-many, many-to-many)

- [ ] **Define API endpoints**
  - [ ] User authentication (login/signup)
  - [ ] Book CRUD (create, read, update, delete)
  - [ ] Rating and notes
  - [ ] Categories and filters

---

## Phase 3 — Backend Development

- [ ] **Setup backend server**

  - [ ] Initialize Express/Node server
  - [ ] Setup database connection
  - [ ] Setup basic routing

- [ ] **Implement core backend features**

  - [ ] User authentication with session
  - [ ] CRUD for books
  - [ ] Rating functionality
  - [ ] Notes API
  - [ ] Categories API

---

## Phase 4 — Frontend Development

- [ ] **Setup frontend**

  - [ ] Initialize React project
  - [ ] Install dependencies (React Router, state management)

- [ ] **Implement core pages**

  - [ ] Home page / book page
  - [ ] Upload book page
  - [ ] Book detail page with notes
  - [ ] User profile page

- [ ] **Connect frontend to backend**

  - [ ] Fetch for API calls
  - [ ] Handle authentication tokens
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
