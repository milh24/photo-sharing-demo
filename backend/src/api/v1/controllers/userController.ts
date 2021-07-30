import * as express from "express";
import * as asyncHandler from "express-async-handler";
import { ErrorCode } from "../../../constants/errorCode";
import HttpException from "../../../exceptions/httpException";
import UserService from "../services/userService";
import BaseController from "./baseController";

class UserController extends BaseController {
  get = asyncHandler(async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    if (!id) {
      throw new HttpException(400, ErrorCode.E0001);
    }
    res.status(200).json(await UserService.get({ id: id }));
  });

  register = asyncHandler(
    async (req: express.Request, res: express.Response) => {
      const { name, password } = req.body;
      if (!name || !password) {
        throw new HttpException(400, ErrorCode.E0001);
      }
      const user = await UserService.register({
        name,
        password,
      });
      res.status(200).json(user);
    }
  );
}

const userController = new UserController();
export default userController;
