import { Table, Column, Model, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { User } from './User';
import { Product } from './Product';
// import { ProductOrder } from './ProductOrder';
// import { Payment } from './Payment';

@Table({
  paranoid: true, // Habilita el borrado lógico
  timestamps: true, // Habilita createdAt y updatedAt
})
export class Order extends Model<Order> {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @Column({ type: DataType.DATE })
  orderDate!: Date;

  @Column({ 
    type: DataType.ENUM('Pendiente', 'Enviado', 'Entregado'),
    allowNull: false,
    defaultValue: 'Pendiente'
  })
  status!: string;

  @Column({ 
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0
  })
  productCount!: number;

  // @HasMany(() => ProductOrder)
  // products!: Product[];

  // @HasOne(() => Payment)
  // payment!: Payment;
}

// lo comentado es para que deje de darme errores typescript. los import y los hasmany y hasone