import { Table, Column, Model, DataType, HasMany, BelongsTo } from 'sequelize-typescript';
import { User } from './User';
import { Category } from './Category';
import { Review } from './Review';


@Table({ 
  modelName: 'Product',
  tableName: 'Products', 
})
export class Product extends Model<Product> {
  @Column({ 
  type: DataType.NUMBER,
  allowNull: false 
})
  categoryId!: number;

  @Column({ 
  type: DataType.NUMBER,
  allowNull: false })
  userId!: number;

  @Column({ 
  type: DataType.STRING,
  allowNull: false })
  name!: string;

  @Column ({ 
  type: DataType.STRING,
  allowNull: false })
  description!: string;

  @Column({ 
  type: DataType.NUMBER,
  allowNull: false })
  price!: number;

  @Column({ 
  type: DataType.NUMBER,
  allowNull: false })
  stockQuantity!: number;

  @Column ({ 
  type: DataType.STRING,
  allowNull: false })
  condition!: string;

  @BelongsTo(() => Category)
  category?: Category;

  @BelongsTo(() => User)
  user?: User;

  @HasMany(() => Review)
  reviews?: Review[];
}
