import { RouteDef } from "../../../types";
import JwtGuardMiddleware from "../../server/middlewares/jwt-guard.middleware";
import FileController from "./file.controller";
import UploadFileMiddleware from "./upload-file.middleware";

const FileRoutes: RouteDef[] = [
  ["/image", "get", FileController.getAll, JwtGuardMiddleware],
  ["/image", "post", FileController.addImage, [JwtGuardMiddleware, UploadFileMiddleware.array('images[]', 10)]],
  ["/image/:filename", "get", FileController.getImage]
]

export default FileRoutes;