import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import Metadata from "../models/Metadata.model";
import { MetadataRequest } from "../middlewares/get-metadata.middleware";
import { AuthRequest } from "../../../server/middlewares/jwt-guard.middleware";

interface MetadataDto {
  typename: string;
}

const metadataDtoSchema = Joi.object<MetadataDto>({
  typename: Joi.string().min(2).max(30).required(),
})


export default class MetadataController {
  public static async getAll(req: Request, res: Response, next: NextFunction) {
    const metadatas = (await Metadata.findAll()).map(m => m.toJSON());
    res.json({
      data: metadatas
    })
  }

  public static async add(req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    const { error, value } = metadataDtoSchema.validate(data);
    if (error) {
      res.statusCode = 400;
      return next(error.details.map(d => d.message));
    }
    try {
      const typenameExists = await Metadata.findOne({
        where: { typename: value.typename },
        paranoid: false
      })
      if (typenameExists !== null) {
        res.statusCode = 400;
        return next("Typename already exists");
      }
      const metadata = await Metadata.create({
        typename: value.typename
      })
      res.json({
        data: metadata.toJSON()
      })
    } catch (err) {
      res.statusCode = 500;
      return next(err);
    }
  }

  public static async get(req: MetadataRequest, res: Response, next: NextFunction) {
    const { metadata } = req;
    res.json({
      data: metadata.toJSON()
    });
  }

  public static async destroy(req: MetadataRequest, res: Response, next: NextFunction) {
    const { metadata } = req;
    await metadata.destroy();
    res.json({
      data: metadata.toJSON()
    })
  }

  public static async edit(req: MetadataRequest, res: Response, next: NextFunction) {
    const { metadata } = req;
    console.log('Getting here');
    const { error, value } = metadataDtoSchema.validate(req.body);
    if (error) {
      res.statusCode = 400;
      return next(error.details.map(d => d.message));
    }
    try {
      const typenameExists = await Metadata.findOne({
        where: { typename: value.typename }
      })
      if (typenameExists !== null) {
        res.statusCode = 400;
        return next("Typename already exists");
      }
      metadata.typename = value.typename;
      await metadata.save();
      res.json({
        data: metadata.toJSON()
      })
    } catch (err) {
      res.statusCode = 500;
      return next(err);
    }
  }
}