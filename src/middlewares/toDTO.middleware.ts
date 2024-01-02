import { plainToInstance } from "class-transformer";
import { NextFunction, Response, Request } from "express";
import { validate } from "class-validator";

export function toDtoContainer(dtoType:any) {
  return async function toDTOMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const dtoInstance = plainToInstance(dtoType, req.body);
      const errors = await validate(dtoInstance as any, {
        skipMissingProperties: true,
      });

      if (errors.length > 0) {
        throw new Error("Object not meeting requirements");
      }

      req.body = dtoInstance;
      next();
    } catch (error: any) {
      return res.status(400).json({
        message: "Something went wrong",
        error: error.message,
      });
    }
  };
}
