import { Table, Column, Model, DataType, HasOne, HasMany } from 'sequelize-typescript';
import { Reputation } from './Reputation';
import { Cart } from './Cart';
import { Order } from './Order';
import { Address } from './Address';
import { Review } from './Review';
import { Product } from './Product';


@Table({ 
  modelName: 'User', 
  tableName: 'Users',
})
export class User extends Model<User> {
  @Column({ 
  type: DataType.STRING,
  allowNull: false 
})
  name!: string;

  @Column({ 
  type: DataType.STRING,
  allowNull: false, 
  unique: true 
})
  email!: string;

  @Column({ 
  type: DataType.STRING,
  allowNull: false 
})
  password!: string;

  @Column({ 
  type: DataType.STRING,
  allowNull: false 
})
  role!: string;

  @HasOne(() => Cart)
  cart?: Cart;

  @HasMany(() => Order)
  orders?: Order[];

  @HasMany(() => Address)
  addresses?: Address[];

  @HasMany(() => Review)
  reviews?: Review[];

  @HasMany(() => Product, { foreignKey: 'userId', as: 'productsAsSeller' })
  productsAsSeller?: Product[];

  @HasMany(() => Product, { foreignKey: 'userId', as: 'productsAsBuyer' })
  productsAsBuyer?: Product[];

  @HasOne(() => Reputation)
  reputation?: Reputation;
}
