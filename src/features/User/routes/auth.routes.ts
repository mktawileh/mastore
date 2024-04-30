import { RouteMap } from "../../../../types";
import AuthController from "../controllers/auth.controller";

const AuthRoutes: RouteMap = {
  "/register": ["post", AuthController.register],
  "/login": ["post", AuthController.login]
}

export default AuthRoutes;