import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export default class ProductController {
  public static async getAll(req: Request, res: Response, next: NextFunction) {
    res.json({
      data: "Yes!!"
    })
  }
}