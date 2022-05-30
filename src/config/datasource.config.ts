import { DataSource } from 'typeorm';
import { User } from '../model/user';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { config } from './env.config';
import { Admin } from '../model/admin';


const PostgresDataSource = new DataSource({
	name: 'default',
	type: 'postgres',
	host: config.DB_HOST,
	port: 5432,
	username: 'postgres',
	password: config.DB_PASSWORD,
	database: 'DB_NAME',
	entities: [User, Admin],
	synchronize: true,
	namingStrategy: new SnakeNamingStrategy(),
});

export { PostgresDataSource };
