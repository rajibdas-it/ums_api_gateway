import { z } from 'zod';

const createAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'academic faculty title is required' }),
  }),
});

export const academicFacultyValidation = {
  createAcademicFacultyZodSchema,
};
