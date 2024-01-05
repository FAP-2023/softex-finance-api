import { Repository } from "typeorm";
import { IProductsRepository } from "./Iproducts.repository";
import { Product } from "../entites/product.entity";

export class ProductsRepository implements IProductsRepository {
	private repository: Repository<Product>;
	constructor(repository: Repository<Product>) {
		this.repository = repository;
	}
	async findAll(): Promise<Product[]> {
		try {
			const foundProducts = await this.repository.find();
			if (!foundProducts) {
				throw new Error("Error fetching products");
			}
			return foundProducts;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	async create(product: Product): Promise<Product> {
		try {
			const createdProduct = await this.repository.save(product);
			if (!createdProduct) {
				throw new Error("Error creating product");
			}
			return createdProduct;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	async delete(id: number): Promise<boolean> {
		try {
			const deletedProduct = await this.repository.delete(id);
			if (deletedProduct.affected === 0) {
				throw new Error("Product not found");
			}
			return true;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	async findById(id: number): Promise<Product | undefined | null> {
		try {
			const foundProduct = await this.repository.findOne({
				where: {
					id: id,
				},
			});

			if (!foundProduct) {
				throw new Error("Product not found");
			}

			return foundProduct;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

    async update(product: Product): Promise<Product> {
        try {
            const updatedProduct = await this.repository.save(product);
            if (!updatedProduct) {
                throw new Error("Error updating product");
            }
            return updatedProduct;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
	findProductByUserId(userId: number): Promise<Product[]> {
		try {
			const foundProducts = this.repository.find({
				where: {
					user_id: userId,
				},
			});
			return foundProducts;
		} catch (error:any) {
			throw new Error(error.message)
		}
	}
}
