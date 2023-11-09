// router.delete(
//   '/:id',
//   auth(
//     ENUM_USER_ROLE.SUPER_ADMIN,
//     ENUM_USER_ROLE.ADMIN,
//     ENUM_USER_ROLE.FACULTY,
//   ),
//   buildingController.deleteBuliding,
// );

import express from 'express';
import { roomController } from './room.controller';

const router = express.Router();

router.post('/create-room/', roomController.createRooms);
export const roomsRoute = router;
