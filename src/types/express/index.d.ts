declare namespace Express {
	export interface Request {
		currentUser?: {
			userId: string;
			role: number;
		};
		session: {
			access_token?: string;
		};
	}
}
