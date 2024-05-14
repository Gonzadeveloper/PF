import { Table, Column, Model, DataType, HasOne, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Sequelize } from 'sequelize-typescript';
import { User } from './User';
import { Product } from './Product';
import { Payment } from './Payment';
import { Dispute } from './Dispute';



@Table({ modelName: 'Order' })
export class Order extends Model<Order> {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @Column({ allowNull: false })
  userId!: number;

  @Column({ allowNull: false, type: DataType.DATE })
  orderDate!: Date;

  @Column({ allowNull: false })
  orderStatus!: string;

  @BelongsTo(() => User)
  user?: User;

  @HasMany(() => Product)
  products?: Product[];

  @HasOne(() => Payment)
  payment?: Payment;

  @HasOne(() => Dispute)
  dispute?: Dispute;
}
