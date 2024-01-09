import { Router } from "express";
import { productsController } from "../factories/products.factory";
import checkAuthMiddleware from "../middlewares/checkAuth.middleware";
import { toDtoContainer } from "../middlewares/toDTO.middleware";
import { ProductCreateOrUpdateDTO } from "../controllers/products/dto/ProductCreateOrUpdateDTO";

export function ProductsRoutes() {
	const router = Router();
	router.post(
		"/",
		(req, res, next) => checkAuthMiddleware(req, res, next),
		(req, res) => productsController.createProduct(req, res)
	);
	router.get(
		"/",
		(req, res, next) => checkAuthMiddleware(req, res, next),
		(req, res) => productsController.getAllProducts(req, res)
	);
	router.get(
		"/getOne/:id",
		(req, res, next) => checkAuthMiddleware(req, res, next),
		(req, res) => productsController.getProductById(req, res)
	);
	router.put(
		"/:id",
		(req, res, next) => checkAuthMiddleware(req, res, next),
		(req, res, next) => toDtoContainer(ProductCreateOrUpdateDTO)(req, res, next),
		(req, res) => productsController.updateProduct(req, res)
	);
	router.delete(
		"/:id",
		(req, res, next) => checkAuthMiddleware(req, res, next),
		(req, res) => productsController.deleteProduct(req, res)
	);
	return router;
}
