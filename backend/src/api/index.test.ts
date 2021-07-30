import * as supertest from "supertest";
import { ErrorCode } from "../constants/errorCode";
import router from "./index";

describe("Router", () => {
  test("should auth for get post", async () => {
    return supertest(router)
      .get("/v1/post")
      .then((res) => {
        expect(res.body.message).toBe(ErrorCode.A0000);
      });
  });

  test("should auth for create post", async () => {
    return supertest(router)
      .post("/v1/post")
      .then((res) => {
        expect(res.body.message).toBe(ErrorCode.A0000);
      });
  });

  test("should auth for get user", async () => {
    return supertest(router)
      .get("/v1/user/123")
      .then((res) => {
        expect(res.body.message).toBe(ErrorCode.A0000);
      });
  });
});
