import { z } from 'zod';

const assignOrRemoveCourses = z.object({
  body: z.object({
    courses: z.array(z.string(), { required_error: 'Courses is required' }),
  }),
});

export const facultyValidation = {
  assignOrRemoveCourses,
};
