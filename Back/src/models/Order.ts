import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany, DefaultScope, HasOne } from 'sequelize-typescript';
import { User } from './User';
import { ProductOrder } from './ProductOrder';
import { Payment } from './Payment';

@DefaultScope(() => ({
  where: { deletedAt: null },
}))

@Table({
  paranoid: true, // Habilita el borrado lógico
  timestamps: true, // Habilita createdAt y updatedAt
})
export class Order extends Model<Order> {
  @Column({ 
    type: DataType.INTEGER,
    primaryKey: true, 
    autoIncrement: true 
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

  @Column({ 
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
   })
  orderDate!: Date;

  @Column({ 
    type: DataType.ENUM,
    values: ['Pendiente', 'Enviado', 'Entregado'],
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

  @HasMany(() => ProductOrder)
  productOrder!: ProductOrder[];

  @HasOne(() => Payment)
  payment!: Payment;

  @Column({ type: DataType.DATE })
       deletedAt!: Date | null; // Añade la columna deletedAt para el borrado lógico        
  }

// lo comentado es para que deje de darme errores typescript. los import y los hasmany y hasone