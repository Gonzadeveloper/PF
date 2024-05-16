import { Table, Column, Model, BelongsTo } from 'sequelize-typescript';
import { Product } from './Product';
import { User } from './User';

@Table({ modelName: 'Review' })
export class Review extends Model<Review> {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @Column({ allowNull: false })
  productId!: number;

  @Column({ allowNull: false })
  userId!: number;

  @Column({ allowNull: false })
  rating!: number;

  @Column ({ allowNull: false })
  comment!: string;

  @BelongsTo(() => Product)
  product?: Product;

  @BelongsTo(() => User)
  user?: User;
}
