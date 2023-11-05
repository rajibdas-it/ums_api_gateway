import { z } from 'zod';

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'semester title is required' }),
    year: z.string({ required_error: 'semester year is required' }),
    code: z.string({ required_error: 'semester code is required' }),
    startMonth: z.string({
      required_error: 'semester start month is required',
    }),
    endMonth: z.string({ required_error: 'semester end month is required' }),
  }),
});

export const academicSemesterValidation = {
  createAcademicSemesterZodSchema,
};
