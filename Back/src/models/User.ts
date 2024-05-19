// import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
// import { Adress } from './Adress';

// @Table
// export class User extends Model<User> {
//   @Column({ 
//     type: DataType.STRING,
//     allowNull: false
//   })
//   name!: string;

//   @Column({ 
//     type: DataType.STRING,
//     allowNull: false
//   })
//   email!: string;
      
//   @Column({         
//     type: DataType.STRING,
//     allowNull: false
//   })
//   password!: string;  

//   @Column({         
//     type: DataType.STRING,
//     allowNull: false
//   })
//   typeuser!: string; 

//   @Column({ 
//     type: DataType.INTEGER, // Usamos INTEGER para representar cantidades de stock
//     allowNull: false
//   })
//   userId!: number;
    
//   @ForeignKey(() => Adress)
//   @Column
//   categoryId!: number;

//   @BelongsTo(() => Adress)
//   adress!: Adress;
// }