import { UUIDTypes } from "uuid";
import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { Tent } from "./tent.model";
import { Umbrella } from "./umbrella.model";
import { Address } from "./address.model";

@Table({ tableName: 'users', timestamps: true }) 
export class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4
  })
  id: UUIDTypes

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string
  
  @Column({
    type: DataType.STRING,
    defaultValue: false,
  })
  isDeleted: boolean
  
  @Column({
    type: DataType.STRING,
    defaultValue: true,
  })
  isAvailable: boolean
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  dni: string
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string
  
  @Column({
    type: DataType.STRING,
  })
  email: string
  
  @Column({
    type: DataType.STRING,
  })
  userName: string
  
  @ForeignKey(() => Tent)
  @Column({
    type: DataType.UUID,
  })
  tentId!: UUIDTypes

  @ForeignKey(() => Umbrella)
  @Column({
    type: DataType.UUID,
  })
  umbrellaId!: UUIDTypes

  @BelongsTo(() => Tent)
  tent!: Tent

  @BelongsTo(() => Umbrella)
  umbrella!: Umbrella

  @HasOne(() => Address)
  address!: Address

}