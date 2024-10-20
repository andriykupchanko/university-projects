import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'Sensor',
  timestamps: false,
})
export class Sensor extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.FLOAT)
  value!: number;

  // Add other columns as needed
}

export default Sensor;
