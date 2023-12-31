import { Repository } from "typeorm";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../entites/user.entity";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";
import { AppDataSource } from "../services/database/app-data-source";

class UserFactory{
    static createUserRepository(userTypeormRepository:Repository<User>){
        const userRepository = new UserRepository(userTypeormRepository);
        return userRepository;
    }
    static createUserService(userRepository:UserRepository){
        const userService = new UserService(userRepository);
        return userService;
    }
    static createUserController(userService:UserService){
        const userController = new UserController(userService);
        return userController;
    }
}

export const userRepository = UserFactory.createUserRepository(AppDataSource.getRepository(User));
export const userService = UserFactory.createUserService(userRepository);
export const userController = UserFactory.createUserController(userService);