import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { Category } from './Category';
import { User } from './User';

@Table
export class Product extends Model<Product> {
  @Column({ 
    type: DataType.STRING,
    allowNull: false
  })
  name!: string;

  @Column({ 
    type: DataType.STRING,
    allowNull: false
  })
  description!: string;
    
  @Column({ 
    type: DataType.FLOAT, // Usamos FLOAT para representar precios
    allowNull: false
  })
  price!: number;
    
  @Column({ 
    type: DataType.INTEGER, // Usamos INTEGER para representar cantidades de stock
    allowNull: false
  })
  stock!: number;

  @Column({         
    type: DataType.STRING,
    allowNull: false
  })
  condition!: string;  

  @Column({         
    type: DataType.STRING,
    allowNull: false
  })
  image!: string; 

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
    
  @ForeignKey(() => Category)
  @Column
  categoryId!: number;

  @BelongsTo(() => Category)
  category!: Category;
}

// @Table
// export class Product extends Model<Product> {
//   @Column({ 
//     type: DataType.STRING,
//     allowNull: false })
//     name!: string;

//   @Column ({ 
//     type: DataType.STRING,
//     allowNull: false })
//     description!: string;
    
//   @Column({ 
//     type: DataType.INTEGER,
//     allowNull: false })
//     price!: number;
    
//   @Column({ 
//     type: DataType.INTEGER,
//     allowNull: false })
//     stock!: number;

//   @Column ({         
//     type: DataType.STRING,
//     allowNull: false })
//     condition!: string;  

//   @ForeignKey(() => Category)
//   @Column
//   categoryId!: number;

//   @BelongsTo(() => Category)
//   category!: Category;
// }
