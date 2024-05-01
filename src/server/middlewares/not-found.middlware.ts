import { Response, Request, NextFunction } from "express";

export default function NotFoundMiddleware(req: Request, res: Response, next: NextFunction) {
  if (res.statusCode === 200 || res.statusCode === 404) {
    res.statusCode = 404;
    next("Not Found");
  } else {
    next();
  }
}