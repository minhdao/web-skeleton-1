import { DataSource } from 'typeorm';
import { UserEntity } from '../../../app/auth/entity/user.entity';
import * as dotenv from 'dotenv';

dotenv.config();

let pgClient: DataSource;

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true, // Create tables inside database
  entities: [UserEntity],
});

export const initPgRepo = async (): Promise<void> => {
  pgClient = await AppDataSource.initialize();
};

export const getPgRepo = async (): Promise<DataSource> => {
  if (!pgClient) {
    await initPgRepo();
  }

  return pgClient;
};
