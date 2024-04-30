import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function JwtGuardMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.auth;
  if (typeof token !== "string") {
    res.statusCode = 403;
    return next("Unauthorized");
  }
  try {
    if (!jwt.verify(token, process.env.SECRET || 'secret')) {
      res.statusCode = 403;
      return next("Unauthorized");
    }
  } catch(err) {
    res.statusCode = 403;
    return next("Unauthorized");
  }
  next();
}