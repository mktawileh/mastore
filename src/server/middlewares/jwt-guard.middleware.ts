import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../../features/User/models/User.model";

export interface AuthRequest extends Request {
 user: User;
}


export default async function JwtGuardMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const token = (req.headers.authorization as string ?? "").split(' ')[1];
  if (typeof token !== "string") {
    res.statusCode = 403;
    return next("Unauthorized");
  }
  try {
    const data = jwt.verify(token, process.env.SECRET || 'secret');
    if (!data) {
      res.statusCode = 403;
      return next("Unauthorized");
    }
    const { id } = (data as any);
    if (isNaN(id)) {
      res.statusCode = 403;
      return next("Unauthorized");
    }
    const user = await User.findByPk(id);
    if (user === null) {
      res.statusCode = 403;
      return next("Unauthorized");
    }
    req.user = user;
    return next();
  } catch(err) {
    res.statusCode = 403;
    return next(err);
  }
  
}