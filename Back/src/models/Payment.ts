import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Order } from './Order';

@Table
export class Payment extends Model<Payment> {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @ForeignKey(() => Order)
  @Column
  orderId!: number;

  @BelongsTo(() => Order)
  order!: Order;

  @Column
  paymentDate!: Date;

  @Column
  amount!: number;

  @Column
  paymentMethod!: string;
}