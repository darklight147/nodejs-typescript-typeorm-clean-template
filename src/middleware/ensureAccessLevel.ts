import { Role } from '../types/role.enum';
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../error/UnauthorizedError.error';

export const ensureAccessLevel = (minRole: Role) => {
	return (req: Request, res: Response, next: NextFunction) => {
		if (req.currentUser && req.currentUser.role <= minRole) {
			return next();
		}

		throw new UnauthorizedError('Not enough privileges');
	};
};
