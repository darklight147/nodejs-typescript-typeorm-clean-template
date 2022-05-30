import helmet from 'helmet';

export const securityMiddleware = [
	helmet.hidePoweredBy(),
	helmet.noSniff(),
	helmet.xssFilter(),
	helmet.frameguard(),
	helmet.ieNoOpen(),
	helmet.hsts(),
];
