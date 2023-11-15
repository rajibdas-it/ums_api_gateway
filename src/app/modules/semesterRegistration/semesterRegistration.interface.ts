export type ISemesterFilters = {
  searchTerm?: string;
};

export type IEnrollCoursePayload = {
  offeredCourseId: string;
  offeredCourseSectionId: string;
};

export type IStudentSemesterPaymentService = {
  studentId: string;
  academicSemesterId: string;
  totalPaymentAmount: number;
};
