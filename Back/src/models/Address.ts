import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
} from "sequelize-typescript";
import { User } from "./User";

@Table
export class Address extends Model<Address> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, // No permite valores vacíos
      len: [3, 50], // Longitud entre 3 y 50 caracteres
    },
  })
  address!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, // No permite valores vacíos
      len: [3, 50], // Longitud entre 3 y 50 caracteres
    },
  })
  city!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, // No permite valores vacíos
      len: [3, 50], // Longitud entre 3 y 50 caracteres
    },
  })
  state!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, // No permite valores vacíos
      len: [3, 10], // Longitud entre 3 y 10 caracteres
    },
  })
  postalcode!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, // No permite valores vacíos
      len: [3, 50], // Longitud entre 3 y 50 caracteres
    },
  })
  country!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER, // Usamos INTEGER para representar cantidades de stock
    allowNull: false,
  })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}
