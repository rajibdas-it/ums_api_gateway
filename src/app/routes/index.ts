import express from 'express';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { academicRoutes } from '../modules/academicSemester/academicSemester.route';

const router = express.Router();

const routes = [
  { pathName: '/academic-semester/', routeName: academicRoutes },
  { pathName: '/academic-faculty/', routeName: academicFacultyRoutes },
];

routes.forEach(route => {
  router.use(route.pathName, route.routeName);
});

export const ums_routes = router;
