//////////////////////////////////////////////

import { Table, Column, Model, DataType, HasMany, DefaultScope } from 'sequelize-typescript';
import { Address } from './Address';
import { Product } from './Product';
import { Review } from './Review';


@DefaultScope(() => ({
  where: { deletedAt: null },
}))
@Table({
  paranoid: true, // Habilita el borrado lógico
  timestamps: true, // Habilita createdAt y updatedAt
})
export class User extends Model<User> {
  @Column({ 
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 50],
    }
  })
  name!: string;

  
  @Column({ 
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [3, 50],
      isEmail: true
    }
  }) 
  email!: string;

  @Column({         
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [6, 20],
    }
  })
  password!: string;

  @Column({         
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [['ADMIN', 'USER']]
    }
  })
  typeuser!: string;

  ////////////  Las Relaciones

  @HasMany(() => Address)
  address!: Address[];

  @HasMany(() => Product)
  products!: Product[];

  @HasMany(() => Review)
  review!: Review[];

  @Column({ type: DataType.DATE })
  deletedAt!: Date | null; // Añade la columna deletedAt para el borrado lógico
}