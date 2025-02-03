import { UUIDTypes } from "uuid";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'contacts', timestamps: true }) 
export class Contact extends Model<Contact> {
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
  name: string
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string
  
  @Column({
    type: DataType.STRING,
  })
  message: string
  
  @Column({
    type: DataType.STRING,
    defaultValue: false,
  })
  isDeleted: boolean
  
  @Column({
    type: DataType.STRING,
    defaultValue: false,
  })
  isReaded: boolean
  
}