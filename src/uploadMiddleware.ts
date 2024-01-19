require("dotenv").config();

import * as aws from "aws-sdk";
import { Request } from "express";
import * as multer from "multer";
import * as multerS3 from "multer-s3";

export const uploadMiddleware = multer({
  fileFilter: (req: Request, file, cb) => {
    // validate file
    console.log("file data", file);
    const isValid = true;
    cb(null, isValid);
    // cb(new Error("I don't have a clue!")); can also throw errors
  },
  storage: multerS3({
    s3: new aws.S3({
      accessKeyId: "DO004ACRW6PDYDKVFDGY" || null,
      secretAccessKey: "awkT9sJW7hdaBtjk11NqeN0xIHLMAWNhkVnr9HQPePY" || null,
      endpoint: "https://sgp1.digitaloceanspaces.com" || null,
      signatureVersion: "v4"
    }),
    bucket: "dbflix" || null,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req: Request, file, cb): any => {
      // save file to Spaces, you can use / to add folders directory
      const fileName = Date.now().toString(); //file.originalname;
      cb(null, `videos/${fileName}`);
    }
  })
}).array("upload", 1);
