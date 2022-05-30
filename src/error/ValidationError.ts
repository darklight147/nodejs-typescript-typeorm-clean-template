import { CustomError } from './CustomError.abstract';
import { ValidationError as VE } from 'class-validator';

export class ValidationError extends CustomError {
	public statusCode: number = 400;

	constructor(protected errors: VE[]) {
		super('Validation failed');
		Object.setPrototypeOf(this, ValidationError.prototype);
	}

	public serializeErrors(): { message: string }[] {
		return this.errors.map(err => {
			return {
				message: err.constraints![Object.keys(err.constraints!)[0]],
			};
		});
	}
}
