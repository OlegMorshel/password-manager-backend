import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { PasswordList } from 'src/password-list/password-list.model';

interface IPasswordItemCreation {
  login: string;
  password: string;
}
@Table({ tableName: 'password-item', createdAt: false, updatedAt: false })
export class PasswordItem extends Model<PasswordItem, IPasswordItemCreation> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  @ForeignKey(() => PasswordList)
  id: number;

  @Column({ type: DataType.STRING })
  login: string;
  @Column({ type: DataType.STRING })
  password: string;
  @ForeignKey(() => PasswordList)
  @Column
  passwordListId: number;
}
