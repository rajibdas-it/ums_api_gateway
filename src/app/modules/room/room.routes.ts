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
router.get('/', roomController.getAllRooms);
router.get('/:id', roomController.getSingleRoom);
router.patch('/update-room/:id', roomController.updateRoom);
router.delete('/delete-room/:id', roomController.deleteRoom);
export const roomsRoute = router;
