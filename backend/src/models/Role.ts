import { Model, Table, Column, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'Roles',
  timestamps: false,
})
export class Role extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;
}

export default Role;
