import { UUIDTypes } from 'uuid';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table({ tableName: 'addresses', timestamps: true })
export class Address extends Model<Address> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: UUIDTypes;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nameStreet: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  numberStreet: string;

  @Column({
    type: DataType.STRING,
    defaultValue: false,
  })
  isDeleted: boolean;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  userId: UUIDTypes;

  @BelongsTo(() => User)
  user!: User;

}
