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
        path: 'books',
        name: 'books',
        component: () => import('pages/books/BooksCollections.vue'),
      },
      {
        path: 'add-book',
        name: 'addBook',
        component: () => import('pages/AddBookPage.vue'),
      },
      {
        path: 'goals',
        name: 'goals',
        component: () => import('pages/goals/GoalsPage.vue'),
      },
      {
        path: 'stats',
        name: 'stats',
        component: () => import('pages/StatisticsPage.vue'),
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
