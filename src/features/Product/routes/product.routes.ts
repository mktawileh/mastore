import { RouteDef } from "../../../../types";
import JwtGuardMiddleware from "../../../server/middlewares/jwt-guard.middleware";
import ProductController from "../controllers/product.controller";

const ProductRoutes: RouteDef[] = [
  ["/", "get", ProductController.getAll],
  ["/", "post", ProductController.add, JwtGuardMiddleware],
  ["/category/:category", "get", ProductController.getByCatgory],
  ["/category/:gender", "get", ProductController.getByGender],
  ["/search/", "get", ProductController.getBySearch]
]

export default ProductRoutes;