import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { RequestLocals } from '../utils/RequestWithLocals';

const checkAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get the JWT token from the request headers
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Authorization token not found' });
        }

        // Verify the JWT token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

        // Store the user ID in req.locals
        req = req as RequestLocals;
        (req as RequestLocals).locals = { userId: decodedToken.userId };

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid authorization token' });
    }
};

export default checkAuthMiddleware;
