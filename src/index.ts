import 'express-async-errors';
import { PostgresDataSource } from './config/datasource.config';
import { App } from './server';
import { config } from './config/env.config';

/**
 * Check environment variables
 */

if (Object.values(config).some(value => value === '')) {
	throw new Error(
		`Missing environment variables ${Object.entries(config).find(
			([key, value]) => value === ''
		)}`
	);
}

async function main() {
	try {
		await PostgresDataSource.initialize();

		console.log('Connected to DB');

		const app = new App();
		const server = app.listen(() => {
			console.log(`App at: http://localhost:${config.port}`);
		});

		process.on('SIGTERM', () => {
			console.log('SIGTERM signal received.');
			server.close(() => {
				console.log('Process terminated.');
				PostgresDataSource.destroy().then(res => {
					console.log('Database destroyed');
					process.exit(0);
				})
			});

		});

		process.on('SIGINT', () => {
			console.log('SIGINT signal received.');
			server.close(() => {
				console.log('Process terminated.');
				PostgresDataSource.destroy().then(res => {
					console.log('Database destroyed');
					process.exit(0);
				})
			});

		});

	} catch (error: any) {
		console.error(error.message);
	}
}

main();
