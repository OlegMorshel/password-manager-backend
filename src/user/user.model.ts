import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IUserCreation {
  email: string;
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
  userId: number;

  @Column({ type: DataType.STRING, allowNull: false })
  first_name: string;

  @Column({ type: DataType.STRING })
  middle_name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  last_name: string;

  @Column({ type: DataType.STRING })
  image: string;

  @Column({ type: DataType.STRING, unique: true })
  login: string;

  @Column({ type: DataType.STRING })
  password: string;
}
