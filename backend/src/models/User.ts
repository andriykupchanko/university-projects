import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Role from './Role';

@Table({
  tableName: 'Users',
  timestamps: false,
})
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  idRole!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fullName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  login!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @BelongsTo(() => Role)
  role!: Role;
}

export default User;
