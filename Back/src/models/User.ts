import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Address } from './Address';
import { Product } from './Product';
import { IsEmail } from 'class-validator';

@Table
export class User extends Model<User> {
  @Column({ 
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, // No permite valores vacíos
      len: [3, 50],   // Longitud entre 3 y 50 caracteres
    }
  })
  name!: string;

  @IsEmail({}, { message: 'Invalid email address' })
  @Column({ 
    type: DataType.STRING,
    allowNull: false,
    unique: true, // No permite valores duplicados
    validate: {
      notEmpty: true, // No permite valores vacíos
      len: [3, 50],
      isEmail: true   // Longitud entre 3 y 50 caracteres y debe ser un email válido
    }
  }) 
  email!: string;
      
  @Column({         
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, // No permite valores vacíos
      len: [6, 20],  // Longitud entre 6 y 20 caracteres
    }
  })
  password!: string;  

  @Column({         
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,            // No permite valores vacíos
      isIn: [['ADMIN', 'USER']] // Debe ser 'ADMIN' o 'USER'
    }
  })
  typeuser!: string; 

  @HasMany(() => Address)
  addresses!: Address[];

  @HasMany(() => Product)
  products!: Product[];
}