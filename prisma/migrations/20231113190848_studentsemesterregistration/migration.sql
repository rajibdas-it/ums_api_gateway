-- CreateTable
CREATE TABLE "student_semesterer_registrations" (
    "semesterRegistrationId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "offeredCourseId" TEXT NOT NULL,
    "offeredCourseSectionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_semesterer_registrations_pkey" PRIMARY KEY ("semesterRegistrationId","studentId","offeredCourseId")
);

-- AddForeignKey
ALTER TABLE "student_semesterer_registrations" ADD CONSTRAINT "student_semesterer_registrations_semesterRegistrationId_fkey" FOREIGN KEY ("semesterRegistrationId") REFERENCES "semester_registration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_semesterer_registrations" ADD CONSTRAINT "student_semesterer_registrations_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_semesterer_registrations" ADD CONSTRAINT "student_semesterer_registrations_offeredCourseId_fkey" FOREIGN KEY ("offeredCourseId") REFERENCES "OfferedCourse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_semesterer_registrations" ADD CONSTRAINT "student_semesterer_registrations_offeredCourseSectionId_fkey" FOREIGN KEY ("offeredCourseSectionId") REFERENCES "offered_course_section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
