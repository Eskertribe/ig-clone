import * as dotenv from 'dotenv';
import { Client } from 'pg';
import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { loadEntities } from '../utils/loadEntities';

dotenv.config();

const entities = loadEntities('../../**/*.entity{.ts,.js}'); // Dynamically load all entitie

const { DB, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

const client = new Client({
  host: DB,
  port: parseInt(DB_PORT ?? ''),
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

const config = {
  type: 'postgres',
  host: DB,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: entities,
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: false,
};

client.connect();

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
