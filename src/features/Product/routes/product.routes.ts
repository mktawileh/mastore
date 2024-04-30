import { RouteMap } from "../../../../types";
import AuthController from "../controllers/product.controller";

const ProductRoutes: RouteMap = {
  "/": ["get", AuthController.getAll],
}

export default ProductRoutes;