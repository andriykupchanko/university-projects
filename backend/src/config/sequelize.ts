import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import Role from '../models/Role';
import Sensor from '../models/Sensor';
import Measurement from '../models/Measurement';
import User from '../models/User';

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.PG_DATABASE,
  dialect: 'postgres',
  host: process.env.PG_HOST,
  password: process.env.PG_PASSWORD,
  port: Number(process.env.PG_PORT),
  username: process.env.PG_USER,
  models: [Role,Sensor,Measurement,User] 
});

export default sequelize;
