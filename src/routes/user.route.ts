import { Router } from "express";
import UserController from "../controllers/user.controller";


export const UserRoutes = (): Router => {
    const router = Router();

    router.post("/", UserController.createrUser);

    return router;
};