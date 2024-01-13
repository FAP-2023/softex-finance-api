import { Product } from "../entites/product.entity";
export interface IProductsRepository {
    findAll(userId:number): Promise<Product[]>;
    findById(id: number): Promise<Product | undefined | null>;
    create(product: Product): Promise<Product>;
    update(product: Product): Promise<Product>;
    delete(id: number): Promise<boolean>;
    findProductByUserId(userId: number): Promise<Product[]>;
}
