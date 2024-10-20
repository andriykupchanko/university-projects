import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Sensor from './Sensor';

@Table({
  tableName: 'Measurements',
  timestamps: false,
})
export class Measurement extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @ForeignKey(() => Sensor)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  sensorId!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  value!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  timestamp!: Date;

  @BelongsTo(() => Sensor)
  sensor!: Sensor;
}

export default Measurement;

