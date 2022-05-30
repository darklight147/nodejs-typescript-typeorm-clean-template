import { CustomError } from './CustomError.abstract';

export class UnauthorizedError extends CustomError {
	public statusCode = 401;

	constructor(public message = 'Unauthorized') {
		super(message);
		Object.setPrototypeOf(this, UnauthorizedError.prototype);
	}

	public serializeErrors(): { message: string; field?: string }[] {
		return [{ message: this.message }];
	}
}
