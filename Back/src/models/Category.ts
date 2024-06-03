import {
  Table,
  Column,
  Model,
  HasMany,
  DataType,
  DefaultScope,
} from "sequelize-typescript";
import { Product } from "./Product";

@DefaultScope(() => ({
  where: { deletedAt: null },
}))
@Table({
  paranoid: true, // Habilita el borrado lógico
  timestamps: true, // Habilita createdAt y updatedAt
})
export class Category extends Model<Category> {
  @Column
  name!: string;

  @Column({ type: DataType.DATE })
  deletedAt!: Date | null; // Añade la columna deletedAt para el borrado lógico

  @HasMany(() => Product)
  products!: Product[];
}

//import { sequelize } from '../config/database';
// import { Product } from './Product';
// import { Category } from './Category';
// import { User } from './User';
// import { Address } from './Address';

// const init = async () => {
//   try {
//     await sequelize.sync({ force: false });
//     console.log('Database & tables created!');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// };

// init();

// export { Product, Category, User, Address };
