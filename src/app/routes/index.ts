import express from 'express';
import { academicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes';
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
];

routes.forEach(route => {
  router.use(route.pathName, route.routeName);
});

export const ums_routes = router;
