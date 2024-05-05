import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import Product from "../models/Product.model";
import File from "../../File/File.model";
import { Op } from "sequelize";

interface CreateProductDto {
  title: string;
  description: string;
  files: number[];
  sizes: string[];
  colors: string[];
  brand: string | null;
  gender: string[] | null;
  categories: string[];
  price: number;
}

const CreateProductDtoSchema = Joi.object<CreateProductDto>({
  title: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(5).max(1000).required(),
  files: Joi.array().items(Joi.number()).required(),
  sizes: Joi.array().items(Joi.string()).required(),
  colors: Joi.array().items(Joi.string()).required(),
  brand: Joi.string().allow(null),
  gender: Joi.array().items(Joi.string().valid("male", "female")),
  categories: Joi.array().items(Joi.string()).required(),
  price: Joi.number().positive().required(),
});

// TODO: pagination
export default class ProductController {
  public static async getAll(req: Request, res: Response, next: NextFunction) {
    const products = await Product.findAll({
      include: File
    });

    const result = products.map(p => {
      const res = p.toJSON();
      res.images = p.Files.map(f => "http://localhost:3383/files/image/" + f.filename);
      delete res.Files;
      delete res.deletedAt;
      delete res.createdAt;
      delete res.updatedAt;
      return res;
    });
      
    res.json({
      data: result
    })
  }

  public static async getByCatgory(req: Request, res: Response, next: NextFunction) {
    const category = req.params.category;
    try {
      const products = await Product.findAll({
        where: {
          categories: {
            [Op.substring]: category
          }
        },
        include: [
          {
            model: File,
          }
        ]
      });

      const result = products.map(p => {
        const res = p.toJSON();
        res.images = p.Files.map(f => "http://localhost:3383/files/image/" + f.filename);
        delete res.Files;
        delete res.deletedAt;
        delete res.createdAt;
        delete res.updatedAt;
        return res;
      });

      res.json({
        data: result
      })
    } catch (err) {
      res.statusCode = 500;
      return next(err);
    }
  }

  public static async getByGender(req: Request, res: Response, next: NextFunction) {
    const gender = req.params.gender;
    try {
      const products = await Product.findAll({
        where: {
          gender: {
            [Op.substring]: gender
          }
        },
        include: [
          {
            model: File,
          }
        ]
      });

      const result = products.map(p => {
        const res = p.toJSON();
        res.images = p.Files.map(f => "http://localhost:3383/files/image/" + f.filename);
        delete res.Files;
        delete res.deletedAt;
        delete res.createdAt;
        delete res.updatedAt;
        return res;
      });

      res.json({
        data: result
      })
    } catch (err) {
      res.statusCode = 500;
      return next(err);
    }
  }

  public static async getBySearch(req: Request, res: Response, next: NextFunction) {
    const query = req.query.q;
    console.log(query);
    try {
      const products = await Product.findAll({
        where: {
          [Op.or]: [
            {
              gender: {
                [Op.substring]: query
              }
            },
            {
              categories: {
                [Op.substring]: query
              }
            },
            {
              title: {
                [Op.substring]: query
              }
            },
            {
              description: {
                [Op.substring]: query
              }
            },
            {
              sizes: {
                [Op.substring]: query
              }
            },
            {
              price: {
                [Op.substring]: query
              }
            },
            {
              brand: {
                [Op.substring]: query
              }
            }
          ]
          
        },
        include: [
          {
            model: File,
          }
        ]
      });

      const result = products.map(p => {
        const res = p.toJSON();
        res.images = p.Files.map(f => "http://localhost:3383/files/image/" + f.filename);
        delete res.Files;
        delete res.deletedAt;
        delete res.createdAt;
        delete res.updatedAt;
        return res;
      });

      res.json({
        data: result
      })
    } catch (err) {
      res.statusCode = 500;
      return next(err);
    }
  }


  public static async add(req: Request, res: Response, next: NextFunction) {
    const { error, value } = CreateProductDtoSchema.validate(req.body);
    if (error) {
      res.statusCode = 400;
      return next(error.details.map(d => d.message))
    }
    try {
      const files = await File.findAll({
        where: { id: value.files.map(i => Number(i)) }
      });
      console.log(files.length, value.files.length);
      if (files.length !== value.files.length) {
        res.statusCode = 400;
        return next("File doesn't exists");
      }
      const product = await Product.create({
        ...value
      });
      await product.setFiles(files);
      const result = product.toJSON();
      result.images = files.map(f => "http://localhost:3383/files/image/" + f.filename);
      res.json({
        data: result
      })
    } catch (err) {
      res.statusCode = 500;
      return next(err);
    }
  }
}