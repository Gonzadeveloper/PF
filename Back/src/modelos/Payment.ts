import { Table, Column, Model, DataType, BelongsTo } from 'sequelize-typescript';
import { Order } from './Order';

@Table({ modelName: 'Payment' })
export class Payment extends Model<Payment> {
  @Column({ 
  type: DataType.NUMBER,
  primaryKey: true, 
  autoIncrement: true })
  id!: number;

  @Column({ 
  type: DataType.NUMBER,
  allowNull: false })
  orderId!: number;

  @Column({ 
  type: DataType.DATE,
  allowNull: false  })
  paymentDate!: Date;

  @Column({ 
  type: DataType.NUMBER,
  allowNull: false })
  amount!: number;

  @Column({ 
  type: DataType.STRING,
  allowNull: false })
  paymentMethod!: string;

  @BelongsTo(() => Order)
  order?: Order;


}
