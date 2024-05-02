import multer, { Multer } from "multer";
import Storage from "./storage.service";

const UploadFileMiddleware: Multer = multer({
  storage: Storage,
  fileFilter: function(req, file, next) {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return next(new Error("Only image or PDF files are allowed"));
    }
    next(null, true);
  }
})

export default UploadFileMiddleware;