import { Request, Response, NextFunction } from 'express';
import { RequestLocals } from '../utils/RequestWithLocals';

const isRequestedUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authenticatedUserId = req.locals.userId;
    const requestedUserId = req.body.userId;

    if (authenticatedUserId !== requestedUserId) {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    next();
};

export default isRequestedUserMiddleware;
