import * as express from "express";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import UserService from "../api/v1/services/userService";
import { ErrorCode } from "../constants/errorCode";
import HttpException from "../exceptions/httpException";

export default class Auth {
  static async softAuth(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      const token = Auth.getToken(req);
      if (token) {
        const auth = await admin.auth().verifyIdToken(token);
        const user = await UserService.get({ id: auth.uid });
        res.locals.auth = auth;
        res.locals.user = user;
      }
      next();
    } catch (err) {
      next(new HttpException(400, ErrorCode.A0000));
    }
  }

  static async auth(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      const token = Auth.getToken(req);
      if (!token) {
        throw new HttpException(400, ErrorCode.A0000);
      }
      const auth = await admin.auth().verifyIdToken(token);
      const user = await UserService.get({ id: auth.uid });
      res.locals.auth = auth;
      res.locals.user = user;
      next();
    } catch (err) {
      next(new HttpException(400, ErrorCode.A0000));
    }
  }

  static getToken(request: functions.Request): string | undefined {
    if (!request.headers.authorization) return undefined;
    const token: string = request.headers.authorization.replace(
      /^Bearer\s/,
      ""
    );
    return token;
  }
}
