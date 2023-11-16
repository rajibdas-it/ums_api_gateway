const getGradeFromMarks = (marks: number) => {
  let result: { grade: string; point?: number } = {
    grade: '',
    point: 0,
  };
  if (marks >= 0 && marks <= 39) {
    result = {
      grade: 'F',
      point: 0,
    };
  } else if (marks >= 40 && marks <= 50) {
    result = {
      grade: 'D',
      point: 2.0,
    };
  } else if (marks >= 51 && marks <= 59) {
    result = {
      grade: 'C',
      point: 2.5,
    };
  } else if (marks >= 60 && marks <= 69) {
    result = {
      grade: 'B',
      point: 3.0,
    };
  } else if (marks >= 71 && marks <= 79) {
    result = {
      grade: 'A',
      point: 3.5,
    };
  } else if (marks >= 80 && marks <= 100) {
    result = {
      grade: 'A+',
      point: 4.0,
    };
  }
  return result;
};

const calculateCGPAandGrade = (payload: any) => {};

export const studentEnrollCourseMarkUtils = {
  getGradeFromMarks,
};
