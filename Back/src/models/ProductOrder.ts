import { Table, Column, Model, DataType, ForeignKey, BelongsTo, DefaultScope } from 'sequelize-typescript';
import { Order } from './Order';
import { Product } from './Product';

@DefaultScope(() => ({
  where: { deletedAt: null },
}))

@Table({
  timestamps: false,
  paranoid: true,
})
export class ProductOrder extends Model<ProductOrder> {
  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  orderId!: number;

  @BelongsTo(() => Order)
  order!: Order;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productId!: number;

  @BelongsTo(() => Product)
  product!: Product;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  unitPrice!: number;

  @Column({ type: DataType.DATE })
  deletedAt!: Date | null; // Añade la columna deletedAt para el borrado lógico

}