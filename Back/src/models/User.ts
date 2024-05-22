// import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
// import { Address } from './Address';
// import { Product } from './Product';
// import { IsEmail } from 'class-validator';

// @Table
// export class User extends Model<User> {
//   @Column({ 
//     type: DataType.STRING,
//     allowNull: false,
//     validate: {
//       notEmpty: true, // No permite valores vacíos
//       len: [3, 50],   // Longitud entre 3 y 50 caracteres
//     }
//   })
//   name!: string;

//   @IsEmail({}, { message: 'Invalid email address' })
//   @Column({ 
//     type: DataType.STRING,
//     allowNull: false,
//     unique: true, // No permite valores duplicados
//     validate: {
//       notEmpty: true, // No permite valores vacíos
//       len: [3, 50],
//       isEmail: true   // Longitud entre 3 y 50 caracteres y debe ser un email válido
//     }
//   }) 
//   email!: string;
      
//   @Column({         
//     type: DataType.STRING,
//     allowNull: false,
//     validate: {
//       notEmpty: true, // No permite valores vacíos
//       len: [6, 20],  // Longitud entre 6 y 20 caracteres
//     }
//   })
//   password!: string;  

//   @Column({         
//     type: DataType.STRING,
//     allowNull: false,
//     validate: {
//       notEmpty: true,            // No permite valores vacíos
//       isIn: [['ADMIN', 'USER']] // Debe ser 'ADMIN' o 'USER'
//     }
//   })
//   typeuser!: string; 

//   @HasMany(() => Address)
//   address!: Address[];

//   @HasMany(() => Product)
//   products!: Product[];
// }


//////////////////////////////////////////////

import { Table, Column, Model, DataType, HasMany, DefaultScope } from 'sequelize-typescript';
import { Address } from './Address';
import { Product } from './Product';


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

  @HasMany(() => Address)
  address!: Address[];

  @HasMany(() => Product)
  products!: Product[];

  @Column({ type: DataType.DATE })
  deletedAt!: Date | null; // Añade la columna deletedAt para el borrado lógico
}