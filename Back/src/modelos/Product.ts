import { Table, Column, Model, DataType, HasOne, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Sequelize } from 'sequelize-typescript';
import { User } from './User';
import { Category } from './Category';
import { Review } from './Review';


@Table({ modelName: 'Product' })
export class Product extends Model<Product> {
  @Column({ allowNull: false })
  categoryId!: number;

  @Column({ allowNull: false })
  userId!: number;

  @Column({ allowNull: false })
  name!: string;

  @Column ({ allowNull: false })
  description!: string;

  @Column({ allowNull: false })
  price!: number;

  @Column({ allowNull: false })
  stockQuantity!: number;

  @Column ({ allowNull: false })
  condition!: string;

  @BelongsTo(() => Category)
  category?: Category;

  @BelongsTo(() => User)
  user?: User;

  @HasMany(() => Review)
  reviews?: Review[];
}
