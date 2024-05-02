import express, { Express, Request, Response, RequestHandler, ErrorRequestHandler } from "express";
import ErrorHandlerMiddleware from "./middlewares/error-handler.middleware";
import NotFoundMiddleware from "./middlewares/not-found.middlware";
import AuthRoutes from "../features/User/routes/auth.routes";
import { RouteDef } from "../../types";
import path from "path";
import FileRoutes from "../features/File/file.routes";
import ProductRoutes from "../features/Product/routes/product.routes";

export default class ServerService {
  app: Express = express();
  port: number = parseInt(process.env.PORT ?? "3000");

  run() {
    this.app.listen(this.port, () => {
      console.log("LOG: 🚀 Started Server at port:", this.port);
    })
  }

  init() {
    this.use(express.json());
    this.useRoutes("/auth/", AuthRoutes);
    this.useRoutes("/files/", FileRoutes)
    this.useRoutes("/product/", ProductRoutes);
    this.use(NotFoundMiddleware)
    this.use(ErrorHandlerMiddleware);
  }

  useRoutes(rootPath: string, Routes: RouteDef[], middlewares?: RequestHandler | RequestHandler[]) {
    console.log("LOG:", "✔  Root:", rootPath);
    for (const routeDef of Routes) {
      let [route, method, handler, routeMiddlewares] = routeDef;
      const r = path.join(rootPath, route).replace(/\\/g, '/');
      if (process.env.DEV) {
        console.log("LOG:", "✅ route:", method.toUpperCase().padEnd(7, " "), r);
      }

      if (!(routeMiddlewares instanceof Array)) {
        routeMiddlewares = routeMiddlewares ? [routeMiddlewares] : [];
      }
      if (!(middlewares instanceof Array)) {
        middlewares = middlewares ? [middlewares] : [];
      }
      const allMiddlewares = [...routeMiddlewares, ...middlewares];
      this.app[method](r, allMiddlewares, handler);
    }
  }

  use(...handlers: (RequestHandler | ErrorRequestHandler)[]) {
    this.app.use(...handlers);
  }
}