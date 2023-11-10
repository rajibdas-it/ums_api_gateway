import { Course } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createCourse = async (data: Course): Promise<Course> => {
  console.log(data);
  const result = await prisma.course.create({ data });
  return result;
};

export const courseService = {
  createCourse,
};
