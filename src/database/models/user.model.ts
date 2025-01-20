import { UUIDTypes } from "uuid";
import { Column, DataType, Model, Table } from "sequelize-typescript";

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

}