import { ProductCreateOrUpdateDTO } from "../controllers/products/dto/ProductCreateOrUpdateDTO";
import { Product } from "../entites/product.entity";
export interface IProductsService {
    getAllProducts(userId:number): Promise<Product[]>;
    getProductById(id: number): Promise<Product | undefined>;
    createProduct(product: ProductCreateOrUpdateDTO): Promise<Product>;
    updateProduct(product: ProductCreateOrUpdateDTO): Promise<Product | undefined>;
    deleteProduct(id: number): Promise<void>;
    findProductByUserId(userId: number): Promise<Product[]>;
}
