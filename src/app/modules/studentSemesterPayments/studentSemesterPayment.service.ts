import { PrismaClient } from '@prisma/client';
import {
  DefaultArgs,
  PrismaClientOptions,
} from '@prisma/client/runtime/library';
import { IStudentSemesterPaymentService } from '../semesterRegistration/semesterRegistration.interface';
const createSemesterPayment = async (
  prismaClient: Omit<
    PrismaClient<PrismaClientOptions, never, DefaultArgs>,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
  >,
  payload: IStudentSemesterPaymentService,
) => {
  const isExist = await prismaClient.studentSemesterPayment.findFirst({
    where: {
      studentId: payload.studentId,
      academicSemesterId: payload.academicSemesterId,
    },
  });

  if (!isExist) {
    const dataToInsert = {
      studentId: payload.studentId,
      academicSemesterId: payload.academicSemesterId,
      fullPaymentAmount: payload.totalPaymentAmount,
      partialPaymentAmount: payload.totalPaymentAmount * 0.5,
      totalDueAmount: payload.totalPaymentAmount,
    };

    await prismaClient.studentSemesterPayment.create({
      data: dataToInsert,
    });
  }
};

export const studentSemesterPaymentService = {
  createSemesterPayment,
};
