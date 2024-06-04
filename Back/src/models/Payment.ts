import { Table, Column, Model, DataType, ForeignKey, BelongsTo, DefaultScope } from 'sequelize-typescript';
import { Order } from './Order';

@DefaultScope(() => ({
  where: { deletedAt: null },
}))

@Table({
  timestamps: true, // Habilita createdAt y updatedAt
  paranoid: true,
})
export class Payment extends Model<Payment> {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,

  })
  id!: number;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  orderId!: number;

  @BelongsTo(() => Order)
  order!: Order;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  paymentDate!: Date;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  amount!: number;

  @Column({
    type: DataType.ENUM,
    values: ['Tarjeta de crédito', 'Mercadopago', 'Transferencia bancaria'],
    allowNull: false,
  })
  paymentMethod!: string;

  @Column({ type: DataType.DATE })
  deletedAt!: Date | null; // Añade la columna deletedAt para el borrado lógico
}

