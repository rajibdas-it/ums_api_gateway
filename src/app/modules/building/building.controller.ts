import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { buildingService } from './building.service';

const createBuilding = catchAsync(async (req, res) => {
  const data = req.body;
  console.log(data);
  const result = await buildingService.createBuilding(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building created successfully',
    data: result,
  });
});

export const buildingController = {
  createBuilding,
};
