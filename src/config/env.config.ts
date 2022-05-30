import dotenv from 'dotenv';

dotenv.config();

export const config = {
	port: process.env.PORT || 3000,
	NODE_ENV: process.env.NODE_ENV || 'development',
	JWT_SECRET: process.env.JWT_SECRET || '',
	CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:' + (process.env.PORT || 3000),
	COOKIE_DOMAIN: process.env.COOKIE_DOMAIN || 'localhost',
	DB_HOST: process.env.DB_HOST || 'localhost',
	DB_PASSWORD: process.env.DB_PASSWORD || '',
};
