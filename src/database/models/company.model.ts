import { UUIDTypes } from "uuid";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
// import { Owner } from "./owner.model";
// import { Employed } from "./employed.model";

@Table({ tableName: 'companies', timestamps: true }) 
export class Company extends Model<Company> {
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
    defaultValue: false,
  })
  isDeleted: boolean
  
  // @HasMany(() => Owner)
  // owners!: Owner

  // @HasMany(() => Employed)
  // employees!: Employed

}