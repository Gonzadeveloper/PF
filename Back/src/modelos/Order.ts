import { Table, Column, Model, DataType, HasOne, HasMany, BelongsTo} from 'sequelize-typescript';
import { User } from './User';
import { Product } from './Product';
import { Payment } from './Payment';
import { Dispute } from './Dispute';
import { DataTypes } from 'sequelize';



@Table({ modelName: 'Order' })

export class Order extends Model<Order> {
  @Column({ 
  type: DataType.NUMBER,
  primaryKey: true, 
  autoIncrement: true })
  id!: number;

  @Column({ 
  type: DataType.NUMBER,
  allowNull: false })
  userId!: number;

  @Column({ 
  type: DataType.DATE,
  allowNull: false  })
  orderDate!: Date;

  @Column({ 
  type: DataTypes.STRING,
  allowNull: false })
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
