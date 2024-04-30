import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import User from "../models/User.model";
import { compareSync, hashSync } from "bcrypt";

interface UserPostDto {
  name: string;
  password: string;
  email: string;
}

interface UserLoginDto {
  email: string;
  password: string;
}

const userPostDtoSchema = Joi.object<UserPostDto>({
  name: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(5).max(30).required(),
  email: Joi.string().email().required(),
});

const userLoginDtoSchema = Joi.object<UserLoginDto>({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(30).required(),
})

export default class AuthController {
  public static async register(req: Request, res: Response, next: NextFunction) {
    const data: UserPostDto = req.body;
    const { error, value } = userPostDtoSchema.validate(data);
    if (error) {
      res.statusCode = 400;
      return next(error.details.map(d => d.message))
    }

    try {
      const emailExists = await User.findOne({
        where: { email: value.email }
      })
      if (emailExists !== null) {
        res.statusCode = 400;
        return next("User email already exists");
      }
    } catch (err) {
      res.statusCode = 500;
      return next("Server Error");
    }

    const user = await User.create({
      name: value.name,
      email: value.email,
      password: hashSync(value.password, 10)
    })

    res.json({
      data: {
        name: user.name,
        email: user.email
      }
    })
  }

  public static async login(req: Request, res: Response, next: NextFunction) {
    const data: UserPostDto = req.body;
    const { error, value } = userLoginDtoSchema.validate(data);
    if (error) {
      res.statusCode = 400;
      return next(error.details.map(d => d.message))
    }

    let user: User | null = null;
    try {
      user = await User.findOne({
        where: {
          email: value.email
        }
      })
    } catch (err) {
      res.statusCode = 500;
      return next("Server Error");
    }

    if (user === null) {
      res.statusCode = 403;
      return next("Invalid credintals");
    }

    if (!compareSync(value.password, user.password)) {
      res.statusCode = 403;
      return next("Invalid credintals");
    }

    res.json({
      data: {
        token: user.createToken()
      }
    });
  }
}