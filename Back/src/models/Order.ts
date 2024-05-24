import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany, DefaultScope, HasOne } from 'sequelize-typescript';
import { User } from './User';
import { ProductOrder } from './ProductOrder';
import { Payment } from './Payment';

   @DefaultScope(() => ({
     where: { deletedAt: null },
   }))

   @Table({
     timestamps: true, // Habilita createdAt y updatedAt
     paranoid: true, // Habilita el borrado lógico
   })
   export class Order extends Model<Order> {
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
       orderStatus!: string;
     
       @HasMany(() => ProductOrder)
       productOrder!: ProductOrder[];

       @HasOne(() => Payment)
       payment!: Payment;
     
       @Column({ type: DataType.DATE })
       deletedAt!: Date | null; // Añade la columna deletedAt para el borrado lógico        
  }