import { RouteDef } from "../../../../types";
import JwtGuardMiddleware from "../../../server/middlewares/jwt-guard.middleware";
import AuthController from "../controllers/metadata.controller";
import GetMetadataMiddleware from "../middlewares/get-metadata.middleware";

const MetadataRoutes: RouteDef[] = [
  ["/", "get", AuthController.getAll, JwtGuardMiddleware],
  ["/", "post", AuthController.add, JwtGuardMiddleware],
  ["/:id", "get", AuthController.get, [GetMetadataMiddleware, JwtGuardMiddleware]],
  ["/:id", "put", AuthController.edit, [GetMetadataMiddleware, JwtGuardMiddleware]],
  ["/:id", "delete", AuthController.destroy, [GetMetadataMiddleware, JwtGuardMiddleware]],
]

export default MetadataRoutes;