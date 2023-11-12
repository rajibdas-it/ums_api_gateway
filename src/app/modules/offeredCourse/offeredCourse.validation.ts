import { z } from 'zod';

const createOfferedCourseSchema = z.object({
  body: z.object({
    academicDepartmentId: z.string({
      required_error: 'AcademicDepartment id is required',
    }),
    semesterRegistrationId: z.string({
      required_error: 'AcademicDepartment id is required',
    }),
    courseIds: z.array(z.string(), { required_error: 'course id is required' }),
  }),
});

export const offeredCourseValidation = {
  createOfferedCourseSchema,
};
