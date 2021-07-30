import * as express from "express";
import { User } from "../../../models/user";

export default class BaseController {
  getReqUser(res: express.Response): User {
    return res.locals.user;
  }
}
