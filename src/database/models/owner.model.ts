import { UUIDTypes } from "uuid";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Company } from "./company.model";

@Table({ tableName: 'owners', timestamps: true }) 
export class Owner extends Model<Owner> {
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

  @ForeignKey(() => Company)
  @Column({
    type: DataType.UUID,
    defaultValue: true,
  })
  companyId: UUIDTypes
  
  @BelongsTo(() => Company)
  company!: Company

}