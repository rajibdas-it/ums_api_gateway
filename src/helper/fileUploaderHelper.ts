/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';
import multer from 'multer';
import { IUploadCloudinaryResponse, IUploadFile } from '../interfaces/file';

cloudinary.config({
  cloud_name: 'dmryq2roc',
  api_key: '626847582776351',
  api_secret: '0jiO526VaH10NxOn1PF1HECwIIE',
});

const uploadToCloudinary = async (
  file: IUploadFile,
): Promise<IUploadCloudinaryResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      (error: Error, result: IUploadCloudinaryResponse) => {
        fs.unlinkSync(file.path);
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

export const fileUploadHelper = {
  uploadToCloudinary,
  upload,
};
