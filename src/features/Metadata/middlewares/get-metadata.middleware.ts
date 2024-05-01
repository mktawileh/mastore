import { Response, Request, NextFunction } from "express";
import Metadata from "../models/Metadata.model";

export interface MetadataRequest extends Request {
  metadata: Metadata;
}

export default async function GetMetadataMiddleware(req: MetadataRequest, res: Response, next: NextFunction) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.statusCode = 400;
    return next("Id must be a number");
  }
  const metadata = await Metadata.findByPk(id);
  if (metadata === null) {
    res.statusCode = 404;
    return next("Not found");
  }
  req.metadata = metadata;
  next();
}