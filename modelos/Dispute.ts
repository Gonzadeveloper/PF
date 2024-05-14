import { Table, Column, Model, DataType, HasOne, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Sequelize } from 'sequelize-typescript';
import { User } from './User';
import { Order } from './Order';

@Table({ modelName: 'Dispute' })
export class Dispute extends Model<Dispute> {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @Column({ allowNull: false })
  orderId!: number;

  @Column({ allowNull: false })
  userId!: number;

  @Column({ allowNull: false })
  description!: string;

  @Column({ allowNull: false })
  disputeStatus!: string;

  @BelongsTo(() => Order)
  order?: Order;

  @BelongsTo(() => User)
  user?: User;

}