import express, { Express, Request, Response, RequestHandler, ErrorRequestHandler } from "express";
import ErrorHandlerMiddleware from "./middlewares/error-handler.middleware";
import NotFoundMiddleware from "./middlewares/not-found.middlware";
import AuthRoutes from "../features/User/routes/auth.routes";
import { RouteMap } from "../../types";
import path from "path";
import ProductRoutes from "../features/Product/routes/product.routes";
import JwtGuardMiddleware from "./middlewares/jwt-guard.middleware";

export default class ServerService {
  app: Express = express();
  port: number = parseInt(process.env.PORT ?? "3000");

  run() {
    this.app.listen(this.port, () => {
      console.log("Started Server at port:", this.port);
    })
  }

  init() {
    this.use(express.json());
    this.useRoutes("/auth/", AuthRoutes);
    this.useRoutes("/product/", ProductRoutes, JwtGuardMiddleware);
    this.use(NotFoundMiddleware)
    this.use(ErrorHandlerMiddleware);
  }

  useRoutes(rootPath: string, Routes: RouteMap, middlewares?: RequestHandler | RequestHandler[]) {
    for (const route in Routes) {
      const [method, handler] = Routes[route];
      const r = path.join(rootPath, route).replace(/\\/g, '/');
      if (process.env.DEV) {
        console.log("LOG:", "✅ Registered route [", method.toUpperCase(), r, "]");
      }
      if (middlewares) {
        this.app[method](r, middlewares, handler);
      } else {
        this.app[method](r, handler);
      }
      
    }
  }

  use(...handlers: (RequestHandler | ErrorRequestHandler)[]) {
    this.app.use(...handlers);
  }
}