import { Table, Column, Model, BelongsTo } from 'sequelize-typescript';
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
