import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  DefaultScope,
} from "sequelize-typescript";
import { User } from "./User";
//import { CartProduct } from './CartProduct';
import { CartProduct } from "./CartProduct";

@DefaultScope(() => ({
  where: { deletedAt: null },
}))
@Table({
  timestamps: true, // Habilita createdAt y updatedAt
  paranoid: true, // Habilita el borrado lógico
})
export class Cart extends Model<Cart> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => CartProduct)
  cartProducts!: CartProduct[];

  @Column({ type: DataType.DATE })
  deletedAt!: Date | null; // Añade la columna deletedAt para el borrado lógico
}
