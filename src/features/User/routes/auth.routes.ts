import { RouteDef } from "../../../../types";
import AuthController from "../controllers/auth.controller";

const AuthRoutes: RouteDef[] = [
  ["/register", "post", AuthController.register],
  ["/login", "post", AuthController.login]
]

export default AuthRoutes;