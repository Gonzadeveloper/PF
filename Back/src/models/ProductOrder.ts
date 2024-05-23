import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Order } from './Order';
import { Product } from './Product';

@Table
export class ProductOrder extends Model<ProductOrder> {
  @ForeignKey(() => Order)
  @Column
  orderId!: number;

  @BelongsTo(() => Order)
  order!: Order;

  @ForeignKey(() => Product)
  @Column
  productId!: number;

  @BelongsTo(() => Product)
  product!: Product;

  @Column
  stock!: number;

  @Column
  unitPrice!: number;

  @Column
  totalPrice!: number;

  @Column
  image!: string;

  @Column
  category!: string;

  @Column
  name!: string;
}