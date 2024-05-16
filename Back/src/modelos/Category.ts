import { Table, Column, Model, DataType, HasMany} from 'sequelize-typescript';
import { Product } from './Product';


@Table({ 
  modelName: 'Category', 
  tableName: 'Categorys',
})
export class Category extends Model<Category> {
  @Column({ 
  type: DataType.NUMBER,  
  primaryKey: true, 
  autoIncrement: true 
})
  id!: number;

  @Column({ 
  type: DataType.STRING,
  allowNull: false
})
  name!: string;

  @HasMany(() => Product)
  products?: Product[];
}