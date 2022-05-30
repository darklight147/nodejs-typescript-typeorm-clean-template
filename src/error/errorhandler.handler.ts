import { NextFunction, Request, Response } from 'express';
import { CustomError } from './CustomError.abstract';

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof CustomError) {
		return res.status(err.statusCode).json(err.serializeErrors());
	}

	console.log(err.message);
	res.status(500).json([
		{
			message: 'Something went wrong',
		},
	]);
};
