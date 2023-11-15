-- CreateEnum
CREATE TYPE "ExamType" AS ENUM ('MIDTERM', 'FINAL');

-- CreateTable
CREATE TABLE "StudentEnrolledCourseMark" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "studentEnrolledCourseId" TEXT NOT NULL,
    "academicSemesterId" TEXT NOT NULL,
    "grade" TEXT,
    "marks" INTEGER,
    "examType" "ExamType" NOT NULL DEFAULT 'MIDTERM',

    CONSTRAINT "StudentEnrolledCourseMark_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StudentEnrolledCourseMark" ADD CONSTRAINT "StudentEnrolledCourseMark_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentEnrolledCourseMark" ADD CONSTRAINT "StudentEnrolledCourseMark_studentEnrolledCourseId_fkey" FOREIGN KEY ("studentEnrolledCourseId") REFERENCES "StudentEnrollCourse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentEnrolledCourseMark" ADD CONSTRAINT "StudentEnrolledCourseMark_academicSemesterId_fkey" FOREIGN KEY ("academicSemesterId") REFERENCES "academic_semesters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
