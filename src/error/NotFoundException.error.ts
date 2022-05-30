import { CustomError } from './CustomError.abstract';

export class NotFoundException extends CustomError {
	public statusCode = 404;

	constructor(public message = 'Not Found') {
		super(message);
		Object.setPrototypeOf(this, NotFoundException.prototype);
	}

	public serializeErrors(): { message: string; field?: string }[] {
		return [{ message: this.message }];
	}
}
