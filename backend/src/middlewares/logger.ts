import { NextFunction, Request, Response } from "express";
import * as functions from "firebase-functions";

const logger = (req: Request, res: Response, next: NextFunction): void => {
  functions.logger.log(`[${req.url}]`);
  next();
};

export default logger;
