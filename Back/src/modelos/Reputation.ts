import { Table, Column, Model, DataType, HasOne, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Sequelize } from 'sequelize-typescript';
import { User } from './User';

@Table({ modelName: 'Reputation' })
export class Reputation extends Model<Reputation> {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @Column({ allowNull: false })
  userId!: number;

  @Column({ allowNull: false })
  score!: number;

  @Column ({ allowNull: false })
  comments!: string;

  @BelongsTo(() => User)
  user?: User;
}
