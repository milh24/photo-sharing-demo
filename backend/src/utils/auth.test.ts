import { NextFunction, Request, Response } from "express";
import { ErrorCode } from "../constants/errorCode";
import HttpException from "../exceptions/httpException";
import Auth from "./auth";

describe("Authorization middleware", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
    };
  });

  test("should throw without header", async () => {
    Auth.auth(mockRequest as Request, mockResponse as Response, nextFunction);
    expect(nextFunction).toBeCalledWith(
      new HttpException(400, ErrorCode.A0000)
    );
  });

  test("should throw with empty header", async () => {
    mockRequest = {
      headers: {},
    };
    Auth.auth(mockRequest as Request, mockResponse as Response, nextFunction);
    expect(nextFunction).toBeCalledWith(
      new HttpException(400, ErrorCode.A0000)
    );
  });

  test("should throw with invalid header", async () => {
    mockRequest = {
      headers: {
        authorization: "Bearer abc",
      },
    };
    Auth.auth(mockRequest as Request, mockResponse as Response, nextFunction);
    expect(nextFunction).toBeCalledWith(
      new HttpException(400, ErrorCode.A0000)
    );
  });
});
