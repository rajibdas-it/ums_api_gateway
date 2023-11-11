import { AcademicDepartment, Prisma } from '@prisma/client';
import calculatePagination from '../../../helper/calculatePagination';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { academicDeparmentSearchableFields } from './academicDepartment.constant';
import { IAcademicDepartmentFilter } from './academicDepartment.interface';

const createDepartment = async (
  data: AcademicDepartment,
): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.create({
    data,
    include: {
      academicFaculty: true,
    },
  });
  return result;
};

const getAllDepartment = async (
  options: IPaginationOptions,
  filters: IAcademicDepartmentFilter,
): Promise<IGenericResponse<AcademicDepartment[]>> => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      OR: academicDeparmentSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (filtersData && Object.keys(filtersData)) {
    andCondition.push({
      AND: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereCondition: Prisma.AcademicDepartmentWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  // const sortConditions: { [key: string]: string } = {};

  // sortConditions[sortBy] = sortOrder;

  const result = await prisma.academicDepartment.findMany({
    where: whereCondition,
    orderBy: { [sortBy]: sortOrder },
    skip,
    take: limit,
    include: {
      academicFaculty: true,
    },
  });

  const total = await prisma.academicDepartment.count();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleDepartment = async (
  id: string,
): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.findUnique({
    where: { id },
  });

  return result;
};

export const academicDepartmentService = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
};
