import { IProductsService } from "../../services/Iproducts.service";
import { IProductsController } from "./Iproducts.controller";
import { Request, Response } from "express";

export class ProductController implements IProductsController{
    private productService:IProductsService
    constructor(productService:IProductsService){
        this.productService = productService;
    }
    async createProduct(req: Request, res: Response) {
        const productDTO = req.body;
        try {
            const product = await this.productService.createProduct(productDTO);
            if(!product){
                return res.sendStatus(400);
            }
            return res.status(201).json({ ok: true, message: "Produto criado com sucesso" });
        } catch (error:any) {
            console.log(error)
            return res.status(400).json({ message: error.message });
        }
    }

    async deleteProduct(req: Request, res: Response) {
        const id = Number(req.params.id);
        try {
            await this.productService.deleteProduct(id);
            return res.status(200).json({ ok: true, message: "Produto deletado com sucesso" });
        } catch (error) {
            return res.status(400).json({ message: "Erro ao deletar produto" });
        }
    }

    async getAllProducts(req: Request, res: Response) {
        try {
            const products = await this.productService.getAllProducts();
            return res.status(200).json({ ok: true, products });
        } catch (error) {
            return res.status(400).json({ message: "Erro ao buscar produtos" });
        }
    }

    async getProductById(req: Request, res: Response) {
        const id = Number(req.params.id);
        try {
            const product = await this.productService.getProductById(id);
            if(!product){
                return res.sendStatus(400);
            }
            return res.status(200).json({ ok: true, product });
        } catch (error) {
            return res.status(400).json({ message: "Erro ao buscar produto" });
        }
    }

    async updateProduct(req: Request, res: Response) {
        const productDTO = req.body;
        try {
            await this.productService.updateProduct(productDTO);
            return res.status(200).json({ ok: true, message: "Produto atualizado com sucesso" });
        } catch (error) {
            return res.status(400).json({ message: "Erro ao atualizar produto" });
        }
    }

    async findProductByUserId(req: Request, res: Response) {
        const id = Number(req.params.id);
        if(!id){
            return res.status(400).json({ message: "Id não informado" });
        }
        try {
            const products = await this.productService.findProductByUserId(id);
            return res.status(200).json({ ok: true, products });
        } catch (error:any) {
            return res.status(400).json({ message: error.message });
        }
    }
}