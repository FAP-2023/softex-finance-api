import { IProductsService } from "./Iproducts.service";
import { IProductsRepository } from "../repositories/Iproducts.repository";
import { Product } from "../entites/product.entity";
import { ProductCreateOrUpdateDTO } from "../controllers/products/dto/ProductCreateOrUpdateDTO";
import { IUserRepository } from "../repositories/Iuser.repository";

export class ProductService implements IProductsService {
	private productRepository: IProductsRepository;
	private userRepository: IUserRepository;
	constructor(
		productRepository: IProductsRepository,
		userRepository: IUserRepository
	) {
		this.productRepository = productRepository;
		this.userRepository = userRepository;
	}
	async createProduct(product: ProductCreateOrUpdateDTO): Promise<Product> {
		try {
			const foundUser = await this.userRepository.findOneById(product.user_id);
            if(!foundUser){
                throw new Error("User not found");
            }
			const prod = new Product();
			prod.name = product.name;
			prod.description = product.description;
			prod.price = product.price;

			const createdProduct = await this.productRepository.create(prod);
			if (!createdProduct) {
				throw new Error("Error creating product");
			}
			return createdProduct;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	async deleteProduct(id: number): Promise<void> {
		try {
			const didDelete = await this.productRepository.delete(id);
			if (!didDelete) {
				throw new Error("Error deleting product");
			}
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	async getAllProducts(): Promise<Product[]> {
		try {
			const foundProducts = await this.productRepository.findAll();
			if (!foundProducts) {
				throw new Error("Error fetching products");
			}
			return foundProducts;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	async getProductById(id: number): Promise<Product | undefined> {
		try {
			const foundProduct = await this.productRepository.findById(id);
			if (!foundProduct) {
				throw new Error("Error fetching product");
			}
			return foundProduct;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	async updateProduct(
		product: ProductCreateOrUpdateDTO
	): Promise<Product | undefined> {
		try {
			const foundProduct = await this.productRepository.findById(
				product.id
			);
			if (!foundProduct) {
				throw new Error("Product not found");
			}
			Object.assign(foundProduct, product);
			const updatedProduct = await this.productRepository.update(
				foundProduct
			);
			if (!updatedProduct) {
				throw new Error("Error updating product");
			}
			return updatedProduct;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

    async findProductByUserId(userId: number): Promise<Product[]> {
        try {
            const foundProducts = await this.productRepository.findProductByUserId(
                userId
            );
            if (!foundProducts) {
                throw new Error("Error fetching products");
            }
            return foundProducts;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
