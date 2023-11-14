import { SemesterRegistrationStatus } from '@prisma/client';
import { z } from 'zod';
const createSemesterRegistrationZodSchema = z.object({
  body: z.object({
    startDate: z.string({ required_error: 'Start Date is required' }),
    endDate: z.string({ required_error: 'End Date is required' }),
    status: z
      .enum([
        ...(Object.values(SemesterRegistrationStatus) as [string, ...string[]]),
      ])
      .optional(),
  }),
  minCredit: z.number({ required_error: 'Min credit is required' }),
  maxCredits: z.number({ required_error: 'Max credit is required' }),
  academicSemesterId: z.string({
    required_error: 'Academic Semester id is required',
  }),
});
const updateSemesterRegistrationZodSchema = z.object({
  body: z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    status: z
      .enum([...Object.values(SemesterRegistrationStatus)] as [
        string,
        ...string[],
      ])
      .optional(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
    academicSemesterId: z.string().optional(),
  }),
});

const enrollAndWithdrawCouse = z.object({
  body: z.object({
    offeredCourseId: z.string({
      required_error: 'Offer course id is required',
    }),
    offeredCourseSectionId: z.string({
      required_error: 'Offer course section id is required',
    }),
  }),
});

export const semesterRegistrationValidation = {
  createSemesterRegistrationZodSchema,
  updateSemesterRegistrationZodSchema,
  enrollAndWithdrawCouse,
};
