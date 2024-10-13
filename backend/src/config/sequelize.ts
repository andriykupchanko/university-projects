import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.PG_DATABASE,
  dialect: 'postgres',
  host: process.env.PG_HOST,
  password: process.env.PG_PASSWORD,
  port: Number(process.env.PG_PORT),
  username: process.env.PG_USER,
  models: [__dirname + '/models'], // Path to your model files
});

export default sequelize;
