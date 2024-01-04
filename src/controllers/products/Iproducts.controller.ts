import { Request, Response } from 'express';

export interface IProductsController {
    getAllProducts(req: Request, res: Response): void;
    getProductById(req: Request, res: Response): void;
    createProduct(req: Request, res: Response): void;
    updateProduct(req: Request, res: Response): void;
    deleteProduct(req: Request, res: Response): void;
}
