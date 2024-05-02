import multer, {StorageEngine} from "multer";
import mime from "mime-types";

const Storage: StorageEngine = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './storage');
  }, 
  filename: function(req, file, cb) {
    cb(null, 'file-' + Date.now() + '.' + mime.extension(file.mimetype));
  }
});

export default Storage;