import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IUserCreation {
  first_name: string;
  last_name: string;
  login: string;
  password: string;
}
@Table({ tableName: 'users' })
export class User extends Model<User, IUserCreation> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  first_name: string;

  @Column({ type: DataType.STRING })
  last_name: string;

  @Column({ type: DataType.INTEGER, unique: true })
  file_id: number;

  @Column({ type: DataType.STRING, unique: true })
  login: string;

  @Column({ type: DataType.STRING })
  password: string;
}
