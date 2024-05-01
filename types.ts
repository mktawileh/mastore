import { RequestHandler } from "express";

export type Method = "post" | "get" | "put" | "delete"

export type Handler = ((...args: any) => any)
export type RouteDef = [string, Method, Handler, (Handler | Handler[])?];
