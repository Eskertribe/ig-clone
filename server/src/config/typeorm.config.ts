import { registerAs } from "@nestjs/config";
import { DataSource, DataSourceOptions } from 'typeorm';
import { loadEntities } from "../utils/loadEntities";

const entities = loadEntities('src/**/*.entity{.ts,.js}'); // Dynamically load all entitie

const config = {
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'mydatabase',
  entities: entities,
  migrations: ["dist/database/migrations/*{.ts,.js}"],
  autoLoadEntities: true,
  synchronize: false,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);