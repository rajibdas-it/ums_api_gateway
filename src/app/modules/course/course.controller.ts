import { Course } from '@prisma/client';
import httpStatus from 'http-status';
import { paginationsFields } from '../../../constants/paginations';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { courseFilterableFields } from './course.constant';
import { courseService } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await courseService.createCourse(data);

  sendResponse<Course>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course created successfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const options = pick(req.query, paginationsFields);
  const filters = pick(req.query, courseFilterableFields);
  const result = await courseService.getAllCourses(options, filters);
  sendResponse<Course[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await courseService.getSingleCourse(id);
  sendResponse<Course>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course fetched successfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await courseService.updateCourse(id, data);
  sendResponse<Course>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course fetched successfully',
    data: result,
  });
});

const assignFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseService.assignFaculty(id, req.body.faculties);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course fetched successfully',
    data: result,
  });
});
const removeFaculties = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseService.removeFaculties(id, req.body.faculties);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course fetched successfully',
    data: result,
  });
});

const assignCourses = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  console.log(req.body.courses);

  const result = await courseService.assignCourses(id, req.body.courses);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course fetched successfully',
    data: result,
  });
});
const removeCourses = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseService.removeCourses(id, req.body.courses);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course fetched successfully',
    data: result,
  });
});

export const courseController = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  assignFaculty,
  removeFaculties,
  assignCourses,
  removeCourses,
};
