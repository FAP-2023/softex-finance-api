import { Router } from "express";
import { userController } from "../factories/user.factory";


export const UserRoutes = (): Router => {
    const router = Router();

    router.post("/", userController.createrUser);

    return router;
};