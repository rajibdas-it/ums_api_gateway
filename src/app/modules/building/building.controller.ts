import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { buildingService } from './building.service';

const createBuilding = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await buildingService.createBuilding(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building created successfully',
    data: result,
  });
});

const getAllBuildings = catchAsync(async (req, res) => {
  const result = await buildingService.getAllBuildings();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building fetched successfully',
    data: result,
  });
});
const getSingleBuilding = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await buildingService.getSingleBuilding(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building fetched successfully',
    data: result,
  });
});

export const buildingController = {
  createBuilding,
  getAllBuildings,
  getSingleBuilding,
};
