// const currentId = (0).toString().padStart(5, '0')
// const incrementId = (Number(currentId) + 1).toString().padStart(5, '0')
// console.log(incrementId);



// const myObj = { page: '1', limit: '5', sortBy: 'year', sortOrder: 'desc' }

// // const keys = ['page', 'limit', 'sortBy', 'sortOrder']

// const myOutPut = {}

// for (const key of keys) {
//     if (myObj && Object.hasOwnProperty.call(myObj, key)) {
//         myOutPut[key] = myObj[key]
//     }
// }

// if (myObj.sortBy && myObj.sortOrder) {
//     myOutPut[myObj.sortBy] = myObj.sortOrder
// }
// console.log(myOutPut);

// Academic Faculty
// Academic Department


/* copy from ums server


import { Server } from 'http';
import app from './app';
import config from './config';
import { errorlogger, logger } from './shared/logger';


async function bootstrap() {

  const server: Server = app.listen(config.port, () => {
    logger.info(`Server running on port ${config.port}`);
  });

  const exitHandler = () => {

    if (server) {
      server.close(() => {
        logger.info('Server closed');
      });
    }
    process.exit(1);
  };

  const unexpectedErrorHandler = (error: unknown) => {
    errorlogger.error(error);
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);

  process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
      server.close();
    }
  });
}

bootstrap();
 */


// const { preRequisiteCourses, ...courseData } = data;
// // console.log(preRequisiteCourses);
// // console.log(courseData);
// const result = await prisma.course.create({
//   data: courseData,
// });

// if (preRequisiteCourses && preRequisiteCourses.length > 0) {
//   for (let index = 0; index < preRequisiteCourses.length; index++) {
//     const createPreRequisiteCourse = await prisma.courseToPreRequisite.create(
//       {
//         data: {
//           courseId: result.id,
//           prequisiteId: preRequisiteCourses[index].courseId,
//         },
//       },
//     );
//     // console.log(createPreRequisiteCourse);
//   }
// }
// return result;


// const result = await prisma.course.create({
//   data: courseData,
// });

// One way using map
// if (preRequisiteCourses && preRequisiteCourses.length > 0) {
//   preRequisiteCourses.map(async (course: any) => {
//     await prisma.courseToPreRequisite.create({
//       data: {
//         courseId: newCourse.id,
//         prequisiteId: course.courseId,
//       },
//     });
//   });
// }

// Another way
// if (preRequisiteCourses && preRequisiteCourses.length > 0) {
//   for (let i = 0; i < preRequisiteCourses.length; i++) {
//     const createPreRequisiteCourse = await prisma.courseToPreRequisite.create(
//       {
//         data: {
//           courseId: result.id,
//           prequisiteId: preRequisiteCourses[i].courseId,
//         },
//       },
//     );
//     console.log(createPreRequisiteCourse);
//   }
// }

// const result = await prisma.course.findUnique({
//   where: { id: newCourse.id },
// });