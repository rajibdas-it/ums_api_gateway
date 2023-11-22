import express from 'express';
import { academicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes';
import { authRoutes } from '../modules/auth/auth.routes';
import { userRoutes } from '../modules/user/user.routes';

const router = express.Router();

const routes = [
  {
    pathName: '/academic-semesters',
    routeName: academicSemesterRoutes,
  },
  {
    pathName: '/users',
    routeName: userRoutes,
  },
  {
    pathName: '/auth',
    routeName: authRoutes,
  },
];

routes.forEach(route => {
  router.use(route.pathName, route.routeName);
});

export const ums_routes = router;
