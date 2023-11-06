/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma, Student } from '@prisma/client';
import calculatePagination from '../../../helper/calculatePagination';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { generateId } from '../../../utils/generateUserId';
import { studentSearchableFields } from './student.constant';
import { IStudentFilters } from './student.interface';

const createStudent = async (data: Student): Promise<Student> => {
  const academicSemester = await prisma.academicSemester.findFirst({
    where: { id: data.academicSemesterId },
  });
  const newId = await generateId.generateStudentId(academicSemester);

  data.studentId = newId;

  const newStudent = await prisma.student.create({
    data,
  });
  return newStudent;
};

const getAllStudents = async (
  options: IPaginationOptions,
  filters: IStudentFilters,
): Promise<IGenericResponse<Student[]>> => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);
  const { searchTerm, ...fitersData } = filters;
  const andCondtions = [];
  const sortCondition: { [key: string]: string } = {};

  if (searchTerm) {
    andCondtions.push({
      OR: studentSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (fitersData && Object.keys(fitersData).length > 0) {
    andCondtions.push({
      AND: Object.entries(fitersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const whereCondition: Prisma.StudentWhereInput =
    andCondtions.length > 0 ? { AND: andCondtions } : {};
  sortCondition[sortBy] = sortOrder;
  const result = await prisma.student.findMany({
    skip,
    take: limit,
    where: whereCondition,
    orderBy: sortCondition,
  });
  const total = await prisma.student.count({ where: whereCondition });
  return {
    meta: { page, limit, total },
    data: result,
  };
};

const getSingleStudent = async (id: string): Promise<Student | null> => {
  const result = await prisma.student.findUnique({
    where: { studentId: id },
  });
  return result;
};

export const studentService = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
