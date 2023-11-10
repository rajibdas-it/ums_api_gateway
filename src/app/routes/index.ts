import express from 'express';
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { academicRoutes } from '../modules/academicSemester/academicSemester.route';
import { buildingRoutes } from '../modules/building/building.routes';
import { courseRoutes } from '../modules/course/course.routes';
import { roomsRoute } from '../modules/room/room.routes';
import { studentRoutes } from '../modules/student/student.routes';

const router = express.Router();

const routes = [
  { pathName: '/academic-semester/', routeName: academicRoutes },
  { pathName: '/academic-faculty/', routeName: academicFacultyRoutes },
  { pathName: '/academic-department/', routeName: academicDepartmentRoutes },
  { pathName: '/students/', routeName: studentRoutes },
  { pathName: '/buildings/', routeName: buildingRoutes },
  { pathName: '/rooms/', routeName: roomsRoute },
  { pathName: '/course/', routeName: courseRoutes },
];

routes.forEach(route => {
  router.use(route.pathName, route.routeName);
});

export const ums_routes = router;
