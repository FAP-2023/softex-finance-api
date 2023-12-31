import { Request, Response, NextFunction } from "express";
import { toDtoContainer } from "../middlewares/toDTO.middleware";
import { UserCreateOrUpdateDTO } from "../controllers/user/dto/UserCreateOrUpdateDTO";

describe("toDtoContainer middleware", () => {
  it("should transform and validate the request body", async () => {
    const req: Partial<Request> = { body: { name: "John", email: "john@example.com", password: "password123" } };
    const res: Partial<Response> = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const next: NextFunction = jest.fn();

    const middleware = toDtoContainer(UserCreateOrUpdateDTO);
    await middleware(req as Request, res as Response, next);

    expect(req.body).toBeInstanceOf(UserCreateOrUpdateDTO);
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it("should handle validation errors", async () => {
    const req: Partial<Request> = { body: { name: "John", email: "invalid-email" } };
    const res: Partial<Response> = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next: NextFunction = jest.fn();

    const middleware = toDtoContainer(UserCreateOrUpdateDTO);
    await middleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Something went wrong",
      error: "Object not meeting requirements",
    });
    expect(next).not.toHaveBeenCalled();
  });
});
