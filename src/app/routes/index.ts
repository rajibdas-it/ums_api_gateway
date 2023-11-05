import express from 'express';

const router = express.Router();

const routes = [{ pathName: '/user/', routeName: '' }];

routes.forEach(route => {
  router.use(route.pathName, route.routeName);
});

export const ums_routes = router;
