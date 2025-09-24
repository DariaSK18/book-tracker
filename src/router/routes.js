const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/LoginPage.vue'),
      },
      {
        path: 'books',
        name: 'books',
        component: () => import('pages/books/BooksCollections.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'add-book',
        name: 'addBook',
        component: () => import('pages/AddBookPage.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'goals',
        name: 'goals',
        component: () => import('pages/goals/GoalsPage.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'stats',
        name: 'stats',
        component: () => import('pages/StatisticsPage.vue'),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
