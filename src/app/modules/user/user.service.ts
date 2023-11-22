import { Request } from 'express';
import { fileUploadHelper } from '../../../helper/fileUploaderHelper';
import { IGenericResponse } from '../../../interfaces/common';
import {
  IUploadCloudinaryResponse,
  IUploadFile,
} from '../../../interfaces/file';
import { authService } from '../../../shared/axios';

const createStudent = async (req: Request): Promise<IGenericResponse> => {
  const file = req.file as IUploadFile;
  const uploadedImage: IUploadCloudinaryResponse =
    await fileUploadHelper.uploadToCloudinary(file);
  if (uploadedImage) {
    req.body.student.profileImage = uploadedImage?.secure_url;
  }

  const response: IGenericResponse = await authService.post(
    '/user/create-student',
    req.body,
    {
      headers: {
        Authorization: req.headers.authorization,
      },
    },
  );

  return response;

  //Jodi ami syncId pathai tahole nicher comment kora code gula diye find kore sekhane mongodb'r id boshate hobe
  //   const { academicSemester, academicFaculty, academicDepartment } =
  //     req.body.student;

  //   const academicSemesterResponse = await authService.get(
  //     `/academic-semester/${academicSemester}`,
  //     {
  //       headers: {
  //         Authorization: req.headers.authorization,
  //       },
  //     },
  //   );
  //   const academicFacultyResponse = await authService.get(
  //     `/academic-faculty/${academicFaculty}`,
  //     {
  //       headers: {
  //         Authorization: req.headers.authorization,
  //       },
  //     },
  //   );
  //   const academicDepartmentResponse = await authService.get(
  //     `/academic-department/${academicDepartment}`,
  //     {
  //       headers: {
  //         Authorization: req.headers.authorization,
  //       },
  //     },
  //   );

  //   if (academicSemesterResponse) {
  //     req.body.student.academicSemester = academicDepartmentResponse.data.id;
  //   }
  //   . console.log(academicSemesterResponse.data.id);
  //   console.log(academicFacultyResponse.data.id);
  //   console.log(academicDepartmentResponse.data.id);
  //   //   console.log(req.body);
};

export const userService = {
  createStudent,
};
