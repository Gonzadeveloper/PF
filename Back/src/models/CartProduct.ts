import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  DefaultScope,
} from "sequelize-typescript";
import { Cart } from "./Cart";
import { Product } from "./Product";

@DefaultScope(() => ({
  where: { deletedAt: null },
}))
@Table({
  timestamps: false, // Deshabilita createdAt y updatedAt
  paranoid: true, // Habilita el borrado lógico
})
export class CartProduct extends Model<CartProduct> {
  @ForeignKey(() => Cart)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  cartId!: number;

  @BelongsTo(() => Cart)
  cart!: Cart;

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

  @Column({ type: DataType.DATE })
  deletedAt!: Date | null; // Añade la columna deletedAt para el borrado lógico
}
