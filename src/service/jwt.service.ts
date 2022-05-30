import jwt, { SignOptions } from 'jsonwebtoken';
import { config } from '../config/env.config';
import { IPayload } from '../types/jwtpayload.interface';

class JwtService {
	constructor(private readonly options?: SignOptions) {}

	public sign(payload: IPayload): string {
		return jwt.sign(payload, config.JWT_SECRET!, this.options);
	}

	public verify(token: string): IPayload {
		return jwt.verify(token, config.JWT_SECRET!, this.options) as IPayload;
	}

	public signRefreshToken(payload: IPayload): string {
		return jwt.sign(payload, config.JWT_SECRET!, {
			...this.options,
			expiresIn: '90d',
		});
	}
}

export default new JwtService({
	expiresIn: '1d',
});
