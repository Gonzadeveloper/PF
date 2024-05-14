import { Table, Column, Model, DataType, HasOne, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Sequelize } from 'sequelize-typescript';
import { Order } from './Order';

@Table({ modelName: 'Payment' })
export class Payment extends Model<Payment> {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @Column({ allowNull: false })
  orderId!: number;

  @Column({ allowNull: false, type: DataType.DATE })
  paymentDate!: Date;

  @Column({ allowNull: false })
  amount!: number;

  @Column({ allowNull: false })
  paymentMethod!: string;

  @BelongsTo(() => Order)
  order?: Order;


}
