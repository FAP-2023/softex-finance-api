import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config'

const checkMagicLinkToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.params.token as string; // Extrai o token da URL

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string ); // Valida o token com JWT

        // Adiciona o email ao corpo da requisição
        req.body.email = (decoded as any)?.email;

        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
};

export default checkMagicLinkToken;
