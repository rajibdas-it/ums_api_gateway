/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from 'express';
import { fileUploadHelper } from '../../../helper/fileUploaderHelper';
import { userController } from './user.cotroller';
import { userValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-student',
  fileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createStudentZodSchema.parse(
      JSON.parse(req.body.data),
    );
    return userController.createStudent(req, res, next);
  },
);

export const userRoutes = router;
