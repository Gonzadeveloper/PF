import { Table, Column, Model, DataType, HasMany, DefaultScope, HasOne } from 'sequelize-typescript';
import { Address } from './Address';
import { Product } from './Product';
import { Review } from './Review';
import { Order } from './Order';
import { Cart } from './Cart';

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

  @Column({
    type: DataType.STRING,
    allowNull: true, // Esta columna puede ser nula
  })
  picture!: string; // Nueva columna picture

  // Relaciones
  @HasMany(() => Address)
  address!: Address[];

  @HasMany(() => Product)
  products!: Product[];

  @HasMany(() => Review)
  review!: Review[];

  @HasMany(() => Order)
  order!: Order[];

  @HasOne(() => Cart)
  cart!: Cart[];

  @Column({ type: DataType.DATE })
  deletedAt!: Date | null; // Añade la columna deletedAt para el borrado lógico
}

//////////////////////////////////////////////

// import { Table, Column, Model, DataType, HasMany, DefaultScope, HasOne} from 'sequelize-typescript'; //importar HasOne
// import { Address } from './Address';
// import { Product } from './Product';
// import { Review } from './Review';
// import { Order } from './Order';
// import { Cart } from './Cart';


// @DefaultScope(() => ({
//   where: { deletedAt: null },
// }))
// @Table({
//   paranoid: true, // Habilita el borrado lógico
//   timestamps: true, // Habilita createdAt y updatedAt
// })
// export class User extends Model<User> {
//   @Column({ 
//     type: DataType.STRING,
//     allowNull: false,
//     validate: {
//       notEmpty: true,
//       len: [3, 50],
//     }
//   })
//   name!: string;

//   @Column({ 
//     type: DataType.STRING,
//     allowNull: false,
//     unique: true,
//     validate: {
//       notEmpty: true,
//       len: [3, 50],
//       isEmail: true
//     }
//   }) 
//   email!: string;

//   @Column({         
//     type: DataType.STRING,
//     allowNull: false,
//     validate: {
//       notEmpty: true,
//       len: [6, 20],
//     }
//   })
//   password!: string;

//   @Column({         
//     type: DataType.STRING,
//     allowNull: false,
//     validate: {
//       notEmpty: true,
//       isIn: [['ADMIN', 'USER']]
//     }
//   })
//   typeuser!: string;

//   ////////////  Las Relaciones

//   @HasMany(() => Address)
//   address!: Address[];

//   @HasMany(() => Product)
//   products!: Product[];

//   @HasMany(() => Review)
//   review!: Review[];

//   @HasMany(() => Order)
//   order!: Order[];

//   @HasOne(() => Cart)
//   cart!: Cart[];

//   @Column({ type: DataType.DATE })
//   deletedAt!: Date | null; // Añade la columna deletedAt para el borrado lógico
// }

 // todo lo comentado es nuevo para relación con órden