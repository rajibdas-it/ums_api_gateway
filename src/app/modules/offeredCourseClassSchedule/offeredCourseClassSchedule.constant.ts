export const offeredCourseClassScheduleFilterableFields = [
  'searchTerm',
  'offeredCourseSectionId',
  'semesterRegistrationId',
  'roomId',
  'facultyId',
];

export const offeredCourseClassScheduleFilterMapper: { [key: string]: string } =
  {
    offeredCourseSectionId: 'offeredCourseSection',
    semesterRegistrationId: 'semesterRegistration',
    roomId: 'room',
    facultyId: 'faculty',
  };

export const offeredCourseClassScheduleSearchableFields = ['dayOfWeek'];
