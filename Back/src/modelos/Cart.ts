import { Table, Column, Model,BelongsTo } from 'sequelize-typescript';
import { User } from './User';


@Table({ modelName: 'Cart' })
export class Cart extends Model<Cart> {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @Column({ allowNull: false })
  userId!: number;

  @BelongsTo(() => User)
  user?: User;

}