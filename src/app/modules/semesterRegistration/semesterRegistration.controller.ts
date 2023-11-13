/* eslint-disable @typescript-eslint/no-explicit-any */
import { SemesterRegistration } from '@prisma/client';
import httpStatus from 'http-status';
import { paginationsFields } from '../../../constants/paginations';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { semesterRegistrationFilterableFields } from './semesterRegistration.constant';
import { SemesterRegistrationService } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const data = req.body;
  const result =
    await SemesterRegistrationService.createSemesterRegistration(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester registration successfully',
    data: result,
  });
});
const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const options = pick(req.query, paginationsFields);
  const filters = pick(req.query, semesterRegistrationFilterableFields);
  const result = await SemesterRegistrationService.getAllSemesterRegistration(
    options,
    filters,
  );
  sendResponse<SemesterRegistration[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester registration fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result =
    await SemesterRegistrationService.getSingleSemesterRegistration(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester registration fetched successfully',
    data: result,
  });
});

const updateSemesterRegistration = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await SemesterRegistrationService.updateSemesterRegistration(
    id,
    data,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester registration successfully',
    data: result,
  });
});
const deleteSemesterRegistration = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result =
    await SemesterRegistrationService.deleteSemesterRegistration(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester registration deleted successfully',
    data: result,
  });
});

const startMyRegistration = catchAsync(async (req, res) => {
  const user = (req as any).user;

  const result = await SemesterRegistrationService.startMyRegistration(user.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'registration successfull',
    data: result,
  });
});

const enrollIntoCourse = catchAsync(async (req, res) => {
  const user = (req as any).user;
  const result = await SemesterRegistrationService.enrollIntoCourse(user?.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'enrolled successfull',
    data: result,
  });
});

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  deleteSemesterRegistration,
  startMyRegistration,
  enrollIntoCourse,
};
