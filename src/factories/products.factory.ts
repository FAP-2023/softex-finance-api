import { Repository } from "typeorm";
import { IProductsRepository } from "../repositories/Iproducts.repository";
import { Product } from "../entites/product.entity";
import { ProductsRepository } from "../repositories/products.repository";
import { IProductsService } from "../services/Iproducts.service";
import { IProductsController } from "../controllers/products/Iproducts.controller";
import { ProductService } from "../services/products.service";
import { IUserRepository } from "../repositories/Iuser.repository";
import { ProductController } from "../controllers/products/products.controller";
import { AppDataSource } from "../database/app-data-source";
import { userRepository } from "./user.factory";

class ProductsFactory{
    public static createProductsRepository(repository:Repository<Product>):IProductsRepository{
        const productsRepository:IProductsRepository = new ProductsRepository(repository);
        return productsRepository;
    }
    public static createProductsService(productsRepository:IProductsRepository, userRepository:IUserRepository):IProductsService{
        const productsService:IProductsService = new ProductService(productsRepository,userRepository);
        return productsService;
    }
    public static createProductsController(productsService:IProductsService):IProductsController{
        const productsController:IProductsController = new ProductController(productsService);
        return productsController;
    }
}

export const productsRepository = ProductsFactory.createProductsRepository(AppDataSource.getRepository(Product));
export const productsService = ProductsFactory.createProductsService(productsRepository,userRepository);
export const productsController = ProductsFactory.createProductsController(productsService);