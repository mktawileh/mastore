import { RequestHandler } from "express";

export type Method = "post" | "get" | "put" | "delete"

export interface RouteMap {
  [key: string]: [Method, RequestHandler];
}