import { Table, Column, Model, BelongsTo} from 'sequelize-typescript';
import { User} from './User';


@Table({ modelName: 'Address' })
export class Address extends Model<Address> {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @Column({ allowNull: false })
  userId!: number;

  @Column({ allowNull: false })
  address!: string;

  @BelongsTo(() => User)
  user?: User;
}