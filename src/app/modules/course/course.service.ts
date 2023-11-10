/* eslint-disable @typescript-eslint/no-explicit-any */

import prisma from '../../../shared/prisma';

const createCourse = async (data: any): Promise<any> => {
  const { preRequisiteCourses, ...courseData } = data;
  console.log(preRequisiteCourses);
  console.log(courseData);
  const result = await prisma.course.create({
    data: courseData,
  });

  if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    for (let index = 0; index < preRequisiteCourses.length; index++) {
      const createPreRequisiteCourse = await prisma.courseToPreRequisite.create(
        {
          data: {
            courseId: result.id,
            prequisiteId: preRequisiteCourses[index].courseId,
          },
        },
      );
      console.log(createPreRequisiteCourse);
    }
  }
  return result;
};

export const courseService = {
  createCourse,
};
