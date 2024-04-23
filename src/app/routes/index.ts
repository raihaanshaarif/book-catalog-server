import express from 'express';
import { UserRouter } from '../modules/user/user.route';

import { BookRoutes } from '../modules/book/book.route';
import { AuthRoutes } from '../modules/auth/auth.route';
// import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRouter,
  },

  {
    path: '/book',
    route: BookRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
