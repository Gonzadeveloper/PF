import { Table, Column, Model, BelongsTo, DataType } from 'sequelize-typescript';
import { Product } from './Product';
import { User } from './User';

@Table({ modelName: 'Review' })
export class Review extends Model<Review> {
  @Column({ 
  type: DataType.NUMBER,
  primaryKey: true, 
  autoIncrement: true })
  id!: number;

  @Column({ 
  type: DataType.NUMBER,
  allowNull: false })
  productId!: number;

  @Column({ 
  type: DataType.NUMBER,
  allowNull: false })
  userId!: number;

  @Column({ 
  type: DataType.NUMBER,
  allowNull: false })
  rating!: number;

  @Column ({ 
  type: DataType.STRING,
  allowNull: false })
  comment!: string;

  @BelongsTo(() => Product)
  product?: Product;

  @BelongsTo(() => User)
  user?: User;
}
