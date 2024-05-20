import { Table, Column, Model, BelongsTo} from 'sequelize-typescript';
import { User} from './User';
import { DataTypes } from 'sequelize';


@Table({ modelName: 'Address' })
export class Address extends Model<Address> {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @Column({ 
  type: DataTypes.NUMBER,
  allowNull: false })
  userId!: number;

  @Column({
  type: DataTypes.STRING,
  allowNull: false })
  address!: string;

  @BelongsTo(() => User)
  user?: User;
}