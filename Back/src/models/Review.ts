import { Table, Column, Model, ForeignKey, BelongsTo, DataType, DefaultScope } from 'sequelize-typescript';
import { Product } from './Product';
import { User } from './User';

@DefaultScope(() => ({
  where: { deletedAt: null },
}))
@Table({
  paranoid: true, // Habilita el borrado lógico
  timestamps: true, // Habilita createdAt y updatedAt
})
export class Review extends Model<Review> {
    
    @Column({ 
        type: DataType.INTEGER, // Usamos INTEGER para representar cantidades de stock
        allowNull: false
      })
      rating!: number;

      @Column({ 
        type: DataType.STRING,
        allowNull: false
      })
      comment!: string;

  //////////////// las relaciones   
      @ForeignKey(() => User)
      @Column
      userId!: number;
    
      @BelongsTo(() => User)
      user!: User;
        
      @ForeignKey(() => Product)
      @Column
      productId!: number;
    
      @BelongsTo(() => Product)
      product!: Product;
    
      @Column({ type: DataType.DATE })
      deletedAt!: Date | null; // Añade la columna deletedAt para el borrado lógico

}