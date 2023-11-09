import httpStatus from 'http-status';
import { paginationsFields } from '../../../constants/paginations';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { buildingFilterableFields } from './building.constant';
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
  const filters = pick(req.query, buildingFilterableFields);
  const options = pick(req.query, paginationsFields);
  const result = await buildingService.getAllBuildings(options, filters);
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

const updateBuilding = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await buildingService.updateBuilding(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building update successfully',
    data: result,
  });
});
const deleteBuliding = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await buildingService.deleteBuliding(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building deleted successfully',
    data: result,
  });
});

export const buildingController = {
  createBuilding,
  getAllBuildings,
  getSingleBuilding,
  updateBuilding,
  deleteBuliding,
};
