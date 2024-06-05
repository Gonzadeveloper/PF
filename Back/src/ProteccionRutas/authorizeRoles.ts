import { Request, Response, NextFunction } from 'express';

const authorizeRoles = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const user = (req as any).user;
        if (!user || !roles.includes(user.role)) {
            res.sendStatus(403); // Forbidden
            return;
        }
        next();
    };
};

export default authorizeRoles;

  