import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { PasswordList } from 'src/password-list/password-list.model';
import { OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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
  @PrimaryGeneratedColumn()
  @ForeignKey(() => PasswordList)
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

  @HasMany(() => PasswordList)
  passwordList: PasswordList[];
}
