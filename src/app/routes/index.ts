import express from 'express';
import { academicRoutes } from '../modules/academicSemester/academicSemester.route';

const router = express.Router();

const routes = [{ pathName: '/academic-semester/', routeName: academicRoutes }];

routes.forEach(route => {
  router.use(route.pathName, route.routeName);
});

export const ums_routes = router;
