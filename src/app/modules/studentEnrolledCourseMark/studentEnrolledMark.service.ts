/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExamType, PrismaClient } from '@prisma/client';
import {
  DefaultArgs,
  PrismaClientOptions,
} from '@prisma/client/runtime/library';

const createStudentEnrolledCourseDefaultMark = async (
  prismaClient: Omit<
    PrismaClient<PrismaClientOptions, never, DefaultArgs>,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
  >,
  payload: {
    studentId: string;
    studentEnrolledCourseId: string;
    academicSemesterId: string;
  },
) => {
  const isExistMidTermData =
    await prismaClient.studentEnrolledCourseMark.findFirst({
      where: {
        studentId: payload.studentId,
        studentEnrolledCourseId: payload.studentEnrolledCourseId,
        academicSemesterId: payload.academicSemesterId,
        examType: ExamType.MIDTERM,
      },
    });

  const isExistFinalData =
    await prismaClient.studentEnrolledCourseMark.findFirst({
      where: {
        studentId: payload.studentId,
        studentEnrolledCourseId: payload.studentEnrolledCourseId,
        academicSemesterId: payload.academicSemesterId,
        examType: ExamType.FINAL,
      },
    });

  if (!isExistMidTermData) {
    await prismaClient.studentEnrolledCourseMark.create({
      data: {
        studentId: payload.studentId,
        studentEnrolledCourseId: payload.studentEnrolledCourseId,
        academicSemesterId: payload.academicSemesterId,
        examType: ExamType.MIDTERM,
      },
    });
  }
  if (!isExistFinalData) {
    await prismaClient.studentEnrolledCourseMark.create({
      data: {
        studentId: payload.studentId,
        studentEnrolledCourseId: payload.studentEnrolledCourseId,
        academicSemesterId: payload.academicSemesterId,
        examType: ExamType.FINAL,
      },
    });
  }
};

export const studentEnrolledCourseMarkService = {
  createStudentEnrolledCourseDefaultMark,
};
