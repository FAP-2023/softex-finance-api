import { Repository } from "typeorm";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../entites/user.entity";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";
import { AppDataSource } from "../services/database/app-data-source";

function userFactory(appDataUser:Repository<User>){
    const userRepository = new UserRepository(appDataUser);
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);
    return {
        repository: userRepository,
        service: userService,
        controller: userController
    }
}

const userModules = userFactory(AppDataSource.getRepository(User));
export const userRepository = userModules.repository
export const userService = userModules.service;
export const userController = userModules.controller;