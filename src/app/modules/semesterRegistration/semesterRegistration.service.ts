import {
  Prisma,
  SemesterRegistration,
  SemesterRegistrationStatus,
} from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import calculatePagination from '../../../helper/calculatePagination';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { semesterRegistrationSearchableFields } from './semesterRegistration.constant';
import { ISemesterFilters } from './semesterRegistration.interface';

const createSemesterRegistration = async (
  data: SemesterRegistration,
): Promise<SemesterRegistration> => {
  const isAnySemesterRegRunning = await prisma.semesterRegistration.findFirst({
    where: {
      OR: [
        {
          status: SemesterRegistrationStatus.UPCOMING,
        },
        {
          status: SemesterRegistrationStatus.ONGOING,
        },
      ],
    },
  });
  if (isAnySemesterRegRunning) {
    throw new ApiError(
      httpStatus.CONFLICT,
      `There is already an ${isAnySemesterRegRunning.status}`,
    );
  }
  const result = await prisma.semesterRegistration.create({ data });
  return result;
};

const getAllSemesterRegistration = async (
  options: IPaginationOptions,
  filter: ISemesterFilters,
) => {
  const { skip, limit, page, sortBy, sortOrder } = calculatePagination(options);
  const { searchTerm, ...filtersData } = filter;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      OR: semesterRegistrationSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (filtersData && Object.keys(filtersData).length > 0) {
    andCondition.push({
      AND: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereCondition: Prisma.SemesterRegistrationWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};
  const result = await prisma.semesterRegistration.findMany({
    skip,
    take: limit,
    where: whereCondition,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });
  const total = await prisma.semesterRegistration.count({
    where: whereCondition,
  });
  return { meta: { page, limit, total }, data: result };
};

const getSingleSemesterRegistration = async (
  id: string,
): Promise<SemesterRegistration | null> => {
  const result = await prisma.semesterRegistration.findUnique({
    where: { id },
  });
  return result;
};

export const SemesterRegistrationService = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
};
