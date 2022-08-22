import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';

interface IPasswordListCreation {
  name: string;
  userId: string;
}
@Table({ tableName: 'password-list' })
export class PasswordList extends Model<PasswordList, IPasswordListCreation> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;
  @ForeignKey(() => User)
  // @BelongsTo(() => User, 'userId')
  @Column
  userId: number;
}