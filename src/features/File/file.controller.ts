import { NextFunction, Request, Response } from "express";
import File from "./File.model";
import { AuthRequest } from "../../server/middlewares/jwt-guard.middleware";
import { Optional } from "sequelize";
import path from "path";
import { existsSync } from "fs";

// TODO: pagination
// TODO: images for product
// TODO: delete image
// TODO: modify image

export default class FileController {
  public static async getAll(req: Request, res: Response) {
    const files = await File.findAll();
    res.json({
      data: files
    });
  }

  public static async addImage(req: AuthRequest, res: Response, next: NextFunction) {
    const user = req.user;
    const files: Optional<any, string>[] = [];
    (req.files as Express.Multer.File[]).forEach(reqfile => {
      const file = {
        filename: reqfile.filename,
        path: reqfile.path.replace(/\\/g, '/'),
        size: reqfile.size,
        type: 'image',
        userId: user.id,
      }
      files.push(file);
    });
    try {
      await File.bulkCreate(files)
    } catch (err) {
      res.statusCode = 500;
      return next(err);
    }
    res.json({
      message: "Uploaded successfully"
    })
  }
  
  public static async getImage(req: AuthRequest, res: Response, next: NextFunction) {
    const filename = req.params.filename;
    if (!filename) {
      res.statusCode = 404;
      return next();
    }
    const file = await File.findOne({ where: { filename } });
    if (!file) {
      res.statusCode = 404;
      return next();
    }
    const filepath = path.join(process.cwd(), file.path);
    if (!existsSync(filepath)) {
      res.statusCode = 404;
      return next();
    }
    res.sendFile(filepath);
  }
}