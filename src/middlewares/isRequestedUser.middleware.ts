import { Request, Response, NextFunction } from 'express';

const isRequestedUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authenticatedUserId = req.locals.userId;
    const requestedUserId = req.params.id;
    if (authenticatedUserId !== requestedUserId) {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    next();
};

export default isRequestedUserMiddleware;
