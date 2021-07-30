import * as express from "express";
import * as asyncHandler from "express-async-handler";
import { ErrorCode } from "../../../constants/errorCode";
import HttpException from "../../../exceptions/httpException";
import PostService from "../services/postService";
import BaseController from "./baseController";

class PostController extends BaseController {
  getAll = asyncHandler(async (req: express.Request, res: express.Response) => {
    const { authorId, page } = req.query;
    if (authorId && typeof authorId !== "string") {
      throw new HttpException(400, ErrorCode.E0001);
    }
    if (page && (typeof page !== "string" || !isNormalInteger(page))) {
      throw new HttpException(400, ErrorCode.E0001);
    }
    const postList = await PostService.getAll({
      authorId: authorId,
      page: page ? Number(page) : undefined,
    });
    res.status(200).json(postList);
  });

  create = asyncHandler(async (req: express.Request, res: express.Response) => {
    const user = this.getReqUser(res);
    const { photoUrl, caption } = req.body;
    if (!photoUrl || !caption) {
      throw new HttpException(400, ErrorCode.E0001);
    }
    const post = await PostService.create({
      photoUrl: photoUrl,
      caption: caption,
      authorName: user.name,
      authorId: user.id,
    });
    res.status(200).json(post);
  });
}

const postController = new PostController();
export default postController;

function isNormalInteger(str: string) {
  return /^\+?(0|[1-9]\d*)$/.test(str);
}
