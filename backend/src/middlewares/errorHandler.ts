import { NextFunction, Request, Response } from "express";
import * as functions from "firebase-functions";
import { ErrorCode } from "../constants/errorCode";
import HttpException from "../exceptions/httpException";

export function httpErrorHandler(
  err: HttpException,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void {
  res.status(err.status).json({
    code: err.code,
    message: err.message,
  });
}

export function errorHandler(
  err: Error,
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  functions.logger.error(`[${req.url}]`, err);
  if (err.constructor.name === "HttpException") {
    next(err);
  } else if (err.constructor.name === "FirebaseAuthError") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    next(new HttpException(400, (err as any).code ?? ErrorCode.A0000));
  } else {
    next(new HttpException(500, ErrorCode.E0000));
  }
}
