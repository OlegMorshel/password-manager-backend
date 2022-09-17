import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';
import { PrimaryGeneratedColumn } from 'typeorm';
interface IFileCreation {
    path: string,
    name: string
}
@Table({ tableName: 'file' })
export class File extends Model<File, IFileCreation> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    @PrimaryGeneratedColumn()
    @ForeignKey(() => User)
    id: number;

    @Column({ type: DataType.STRING })
    path: string;

    @Column({ type: DataType.STRING })
    name: string;

}
