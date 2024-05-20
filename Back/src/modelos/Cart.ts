import { Table, Column, Model,BelongsTo } from 'sequelize-typescript';
import { User } from './User';
import { DataTypes } from 'sequelize';


@Table({ modelName: 'Cart' })
export class Cart extends Model<Cart> {
  @Column({ 
  type: DataTypes.NUMBER,
  primaryKey: true, 
  autoIncrement: true })
  id!: number;

  @Column({ 
  type: DataTypes.NUMBER,
  allowNull: false })
  userId!: number;

  @BelongsTo(() => User)
  user?: User;

}