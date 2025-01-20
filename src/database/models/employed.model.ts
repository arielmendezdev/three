import { UUIDTypes } from "uuid";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Company } from "./company.model";

@Table({ tableName: 'employees', timestamps: true }) 
export class Employed extends Model<Employed> {
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
    defaultValue: false,
  })
  isDeleted: boolean
  
  @Column({
    type: DataType.STRING,
    defaultValue: true,
    
  })
  isAvailable: boolean
  
  @ForeignKey(() => Company)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  companyId: UUIDTypes

  @BelongsTo(() => Company)
  company!: Company

}