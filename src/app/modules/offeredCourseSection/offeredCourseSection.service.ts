import { OfferedCourseSection } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createOfferedCourseSection = async (data: OfferedCourseSection) => {
  const isExist = await prisma.offeredCourse.findFirst({
    where: { id: data.offeredCourseId },
  });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Offered course not found');
  }

  const result = await prisma.offeredCourseSection.create({
    data,
  });
  return result;
};

export const offeredCourseSectionService = {
  createOfferedCourseSection,
};
