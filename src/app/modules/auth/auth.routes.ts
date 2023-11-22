import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { userAuthController } from './auth.controller';
import { authZodSchema } from './auth.validation';

const router = express.Router();

router.post(
  '/login',
  validateRequest(authZodSchema.loginZodSchema),
  userAuthController.login,
);
router.post(
  '/refresh-token',
  validateRequest(authZodSchema.refreshTokenZodSchema),
  userAuthController.refreshToken,
);
router.post(
  '/change-password',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT,
  ),
  validateRequest(authZodSchema.changlePasswordZodSchema),

  userAuthController.changePassword,
);

export const authRoutes = router;
