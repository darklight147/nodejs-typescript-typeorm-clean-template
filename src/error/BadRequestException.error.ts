import { CustomError } from './CustomError.abstract';

export class BadRequestException extends CustomError {
	public statusCode = 401;

	constructor(public message = 'Bad Request') {
		super(message);
		Object.setPrototypeOf(this, BadRequestException.prototype);
	}

	public serializeErrors(): { message: string; field?: string }[] {
		return [{ message: this.message }];
	}
}
