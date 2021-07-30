import * as express from "express";
import Auth from "../../utils/auth";
import postController from "./controllers/postController";
import userController from "./controllers/userController";

const router = express.Router();

/* Post */
router.get("/post", Auth.auth, postController.getAll);
router.post("/post", Auth.auth, postController.create);

/* User */
router.get("/user/:id", Auth.auth, userController.get);
router.post("/register", userController.register);

export default router;
