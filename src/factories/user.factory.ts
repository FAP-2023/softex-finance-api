import { Repository } from "typeorm";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../entites/user.entity";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user/user.controller";
import { AppDataSource } from "../services/database/app-data-source";
import { IUserController } from "../controllers/user/Iuser.controller";
import { IUserService } from "../services/Iuser.service";
import { IUserRepository } from "../repositories/Iuser.repository";

class UserFactory{
    static createUserRepository(userTypeormRepository:Repository<User>){
        const userRepository = new UserRepository(userTypeormRepository);
        return userRepository;
    }
    static createUserService(userRepository:IUserRepository){
        const userService = new UserService(userRepository);
        return userService;
    }
    static createUserController(userService:IUserService){
        const userController:IUserController = new UserController(userService);
        return userController;
    }
}

export const userRepository = UserFactory.createUserRepository(AppDataSource.getRepository(User));
export const userService = UserFactory.createUserService(userRepository);
export const userController = UserFactory.createUserController(userService);