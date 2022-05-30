import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../error/UnauthorizedError.error';

export const ensureAuthenticated = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.currentUser?.userId) {
		return next();
	}

	throw new UnauthorizedError('Not Logged In');
};
