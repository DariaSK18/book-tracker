# Book Tracker

**Book Tracker** is a full-stack web application built with **Node.js**, **Express**, **MySql**, **Sequelize**, **React**, and **Vanilla JavaScript** for managing and tracking books. Users can register, log in, manage their profile, add books to their library, track reading progress, rate books, write reviews, create collections. The platform features a modern UI with search, filters, and progress visualization.

Video: [https://youtu.be/dPN0yDVqWbk](https://youtu.be/dPN0yDVqWbk)
Deployed on Render: [https://book-tracker-front-yb4d.onrender.com](https://book-tracker-front-yb4d.onrender.com)
GitHub: [https://github.com/DariaSK18/book-tracker](https://github.com/DariaSK18/book-tracker)

---

## Features:

- User authentication (register, login, logout), passwords are hashed with bcrypt
- Password change and profile deletion
- **CRUD operations** for books, reading progress, ratings, reviews, and collections
- MySQL database managed through Sequelize ORM.
- Clear client–server architecture (frontend + backend).
- Display recently added books with reading progress
- Filtering by reading status, ratings, favourites, and collections
- Rating system, reviews, and notes for books
- Search books by title, author
- **User session management** with cookies
- Responsive UI
- Progress and statistics visualization

---

## Technologies Used:

**Frontend:**  
- React  
- JavaScript / JSX  
- SCSS / CSS

**Backend:**  
- Node.js
- Express
- Sequelize ORM
- MySQL

**Authentication:** 
- Passport.js
- bcrypt
- Middleware for validation and error handling

**Deployment:**
- Render.com (or local development)

**Other:**  
- Environment variables with `.env`  
- npm scripts for development and production  
- Seed data utilities

---

## Installation & Setup:

1. Clone the repository:

```bash
git clone https://github.com/DariaSK18/book-tracker.git
cd book-tracker
```

2. Install dependencies:

- Backend
```bash
cd server
npm install
```
- Frontend
```bash
cd client
npm install
```

3. Create and configure the database:

```bash
mysql -u root -p
```
- inside MySQL:
```bash
source server/db/schema.sql
quit;
```

4. Create a .env file in the client and server directory and add (use .env.example files to set it up):

- Frontend
```bash
VITE_API_URL=your_localhost_url
```
- Backend
```bash

DATABASE_URL=your_database_url
COOKIE_SECRET==!!!SECRET!!!
FRONTEND_URL=your_localhost
NODE_ENV=development

```

5. (Optional) Seed the database:

```bash
npm run seed
```

6. Start the server and client:

- Frontend
```bash
npm run dev
```
- Backend
```bash
npm run dev
```

7. Open your browser and go to:

- Frontend runs on 
```bash
http://localhost:5173
```
- Backend runs on 
```bash
http://0.0.0.0:3000 
(depending on your .env)
```
---

## Future Improvements

- Add user profiles with avatars and personal pages
- Notifications for new reviews, ratings, and comments
- Tag-based, genre-based, and author-based search
- Unit tests and integration tests 
- Add unit tests, integration tests, and API tests
- Deploy full CI/CD pipeline (GitHub Actions) 

---

## Author

Daria Steblovska – development, design, and project architecture
