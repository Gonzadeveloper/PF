import { Table, Column, Model, HasMany} from 'sequelize-typescript';
import { Product } from './Product';


@Table({ modelName: 'Category' })
export class Category extends Model<Category> {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @Column({ allowNull: false })
  name!: string;

  @HasMany(() => Product)
  products?: Product[];
}