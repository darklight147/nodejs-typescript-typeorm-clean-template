import bcrypt from 'bcrypt';
import { config } from '../config/env.config';

class PasswordService {
	private saltRounds;

	constructor() {
		this.saltRounds = config.NODE_ENV === 'dev' ? 10 : 12;
	}

	public async hashPassword(password: string): Promise<string> {
		return bcrypt.hash(password, this.saltRounds);
	}

	public async comparePassword(
		password: string,
		hash: string
	): Promise<boolean> {
		return bcrypt.compare(password, hash);
	}
}

export default new PasswordService();
