import { Table, Column, Model, BelongsTo, DataType } from 'sequelize-typescript';
import { User } from './User';

@Table({ modelName: 'Reputation' })
export class Reputation extends Model<Reputation> {
  @Column({ 
  type: DataType.NUMBER,
  primaryKey: true, 
  autoIncrement: true })
  id!: number;

  @Column({ 
  type: DataType.NUMBER,
  allowNull: false })
  userId!: number;

  @Column({ 
  type: DataType.NUMBER,
  allowNull: false })
  score!: number;

  @Column ({ 
  type: DataType.STRING,
  allowNull: false })
  comments!: string;

  @BelongsTo(() => User)
  user?: User;
}
