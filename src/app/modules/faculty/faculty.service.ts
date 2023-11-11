/* eslint-disable @typescript-eslint/no-unused-vars */
import { Faculty } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createFaculty = async (data: Faculty): Promise<Faculty> => {
  const newFaculty = await prisma.faculty.create({
    data,
  });
  return newFaculty;
};

// const getAllStudents = async (
//   options: IPaginationOptions,
//   filters: IStudentFilters,
// ): Promise<IGenericResponse<Student[]>> => {
//   const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);
//   const { searchTerm, ...fitersData } = filters;
//   const andCondtions = [];
//   // const sortCondition: { [key: string]: string } = {};

//   if (searchTerm) {
//     andCondtions.push({
//       OR: studentSearchableFields.map(field => ({
//         [field]: {
//           contains: searchTerm,
//           mode: 'insensitive',
//         },
//       })),
//     });
//   }

//   if (fitersData && Object.keys(fitersData).length > 0) {
//     andCondtions.push({
//       AND: Object.entries(fitersData).map(([field, value]) => ({
//         [field]: value,
//       })),
//     });
//   }
//   const whereCondition: Prisma.StudentWhereInput =
//     andCondtions.length > 0 ? { AND: andCondtions } : {};
//   // sortCondition[sortBy] = sortOrder;
//   const result = await prisma.student.findMany({
//     skip,
//     take: limit,
//     where: whereCondition,
//     orderBy: {
//       [sortBy]: sortOrder,
//     },
//   });
//   const total = await prisma.student.count({ where: whereCondition });
//   return {
//     meta: { page, limit, total },
//     data: result,
//   };
// };

const getSingleFaculty = async (id: string): Promise<Faculty | null> => {
  const result = await prisma.faculty.findUnique({
    where: { id },
  });
  return result;
};

// const updateStudent = async (
//   id: string,
//   data: Partial<Student>,
// ): Promise<Student> => {
//   const result = await prisma.student.update({
//     where: { studentId: id },
//     data,
//   });
//   return result;
// };
// const deleteStudent = async (id: string): Promise<Student> => {
//   const result = await prisma.student.delete({
//     where: { studentId: id },
//   });
//   return result;
// };

export const facultyService = {
  createFaculty,
  getSingleFaculty,
};
