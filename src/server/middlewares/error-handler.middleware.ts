import { Response, Request, NextFunction } from "express";

export default function ErrorHandlerMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  let errors = [];
  if (err instanceof Array) {
    errors = err;
  } else {
    errors = [err];
  }
  res.json({
    errors
  });
}