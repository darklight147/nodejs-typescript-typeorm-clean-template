import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.config';
import { IPayload } from '../types/jwtpayload.interface';

export const decodeUser = (req: Request, res: Response, next: NextFunction) => {
	const token = req.session.access_token;
	if (token) {
		try {
			req.currentUser = jwt.verify(
				token,
				config.JWT_SECRET || ''
			) as IPayload;
		} catch (error: any) {
			next();
		}
	}
	next();
};
