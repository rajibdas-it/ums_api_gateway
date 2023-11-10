import { Room } from '@prisma/client';
import httpStatus from 'http-status';
import { paginationsFields } from '../../../constants/paginations';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { roomFilterableFields } from './room.constant';
import { roomService } from './room.service';

const createRooms = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await roomService.createRoom(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New Room Created successfully',
    data: result,
  });
});

const getAllRooms = catchAsync(async (req, res) => {
  const options = pick(req.query, paginationsFields);
  const filters = pick(req.query, roomFilterableFields);
  const result = await roomService.getAllRooms(options, filters);
  sendResponse<Room[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rooms fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleRoom = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await roomService.getSingleRoom(id);
  sendResponse<Room>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room fetched successfully',
    data: result,
  });
});
const updateRoom = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await roomService.updateRoom(id, data);
  sendResponse<Room>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room updated successfully',
    data: result,
  });
});
const deleteRoom = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await roomService.deleteRoom(id);
  sendResponse<Room>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room deleted successfully',
    data: result,
  });
});

export const roomController = {
  createRooms,
  getAllRooms,
  getSingleRoom,
  updateRoom,
  deleteRoom,
};
