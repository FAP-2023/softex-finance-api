import { Request, Response, NextFunction } from 'express';

const isRequestedUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authenticatedUserId = Number(req.locals.userId);
    const requestedUserId = Number(req.params.id) || Number(req.body.id);
    console.log(authenticatedUserId)
    console.log(requestedUserId)
    if (authenticatedUserId !== requestedUserId) {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    next();
};

export default isRequestedUserMiddleware;
