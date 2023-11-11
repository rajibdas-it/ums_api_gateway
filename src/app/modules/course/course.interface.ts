export type ICourseCreateData = {
  title: string;
  code: string;
  credits: number;
  preRequisiteCourses?: IPrequisiteCourseRequest[];
};

export type IPrequisiteCourseRequest = {
  courseId: string;
  isDeleted?: boolean;
};

export type ICourseFilters = {
  searchTerm?: string;
};
