import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { loadEntities } from '../utils/loadEntities';
import { join } from 'path';

dotenv.config();

const entities = loadEntities('src/**/*.entity{.ts,.js}'); // Dynamically load all entities

const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.NODE_ENV === 'development' ? process.env.DB_HOST_DEV : process.env.DB_HOST_PROD,
  port: parseInt(process.env.DB_PORT ?? ''),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: entities,
  migrations: [join(__dirname, '../database/migrations/*{.ts,.js}')],
  synchronize: false,
};

export default new DataSource(config);
