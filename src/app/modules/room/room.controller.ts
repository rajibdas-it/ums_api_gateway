import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { roomService } from './room.service';

const createRooms = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await roomService.createRoom(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building fetched successfully',
    data: result,
  });
});

export const roomController = {
  createRooms,
};
