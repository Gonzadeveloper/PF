// Modelos con sequelize puro corregidos. inicialización redundante de Reputation, Organización de las asociaciones estáticas dentro de las clases de modelo, Eliminación del uso de ModelName.init() y definición directa de opciones de configuración en la clase del modelo, Definición del modelo Cart_Product para la relación muchos a muchos entre User y Product

import { Model, DataTypes, Association } from 'sequelize';
import { Sequelize } from 'sequelize';
const { DATABASE_URL } = process.env;

const sequelize = new Sequelize(DATABASE_URL, {
  logging: false,
  native: false,
});

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: string;

  // Relaciones
  public readonly cart?: Cart;
  public readonly orders?: Order[];
  public readonly addresses?: Address[];
  public readonly reviews?: Review[];
  public readonly productsAsSeller?: Product[];
  public readonly productsAsBuyer?: Product[];
  public readonly reputation?: Reputation;

  public static associations: {
    cart: Association<User, Cart>;
    orders: Association<User, Order>;
    addresses: Association<User, Address>;
    reviews: Association<User, Review>;
    productsAsSeller: Association<User, Product>;
    productsAsBuyer: Association<User, Product>;
    reputation: Association<User, Reputation>;
  };
}

class Reputation extends Model {
  public id!: number;
  public userId!: number;
  public score!: number;
  public comments!: string;

  // Relación con User (1 a 1)
  public readonly user?: User;

  public static associations: {
    user: Association<Reputation, User>;
  };
}

Reputation.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comments: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Reputation',
});

class Product extends Model {
  public id!: number;
  public categoryId!: number;
  public userId!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public stockQuantity!: number;
  public condition!: string;

  // Relaciones
  public readonly category?: Category;
  public readonly user?: User;
  public readonly reviews?: Review[];
}

class Category extends Model {
  public id!: number;
  public name!: string;

  // Relaciones
  public readonly products?: Product[];
}

class Review extends Model {
  public id!: number;
  public productId!: number;
  public userId!: number;
  public rating!: number;
  public comment!: string;

  // Relaciones
  public readonly product?: Product;
  public readonly user?: User;
}

class Cart extends Model {
  public id!: number;
  public userId!: number;

  // Relaciones
  public readonly user?: User;
  public readonly products?: Product[];
}

class Order extends Model {
  public id!: number;
  public userId!: number;
  public orderDate!: Date;
  public orderStatus!: string;

  // Relaciones
  public readonly user?: User;
  public readonly products?: Product[];
  public readonly payment?: Payment;
  public readonly dispute?: Dispute;
}

class Address extends Model {
  public id!: number;
  public userId!: number;
  public address!: string;
}

class Payment extends Model {
  public id!: number;
  public orderId!: number;
  public paymentDate!: Date;
  public amount!: number;
  public paymentMethod!: string;

  // Relación con Order (1 a 1)
  public readonly order?: Order;

  public static associations: {
    order: Association<Payment, Order>;
  };
}

Payment.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  paymentDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Payment',
});

class Dispute extends Model {
  public id!: number;
  public orderId!: number;
  public userId!: number;
  public description!: string;
  public disputeStatus!: string;

  // Relación con Order (1 a 1)
  public readonly order?: Order;

  // Relación con User (1 a 1)
  public readonly user?: User;

  public static associations: {
    order: Association<Dispute, Order>;
    user: Association<Dispute, User>;
  };
}

Dispute.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  disputeStatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Dispute',
});

User.hasOne(Cart, { foreignKey: 'userId' });
User.hasMany(Order, { foreignKey: 'userId' });
User.hasMany(Address, { foreignKey: 'userId' });
User.hasMany(Review, { foreignKey: 'userId' });
User.hasMany(Product, { foreignKey: 'userId', as: 'productsAsSeller' });
User.belongsToMany(Product, { through: 'Cart_Product', foreignKey: 'userId', otherKey: 'productId' });
User.hasOne(Reputation, { foreignKey: 'userId' });

Product.belongsTo(Category, { foreignKey: 'categoryId' });
Product.belongsTo(User, { foreignKey: 'userId' });
Product.hasMany(Review, { foreignKey: 'productId' });

Order.belongsTo(User, { foreignKey: 'userId' });
Order.hasMany(Product, { foreignKey: 'orderId' });
Order.hasOne(Payment, { foreignKey: 'orderId' });
Order.hasOne(Dispute, { foreignKey: 'orderId' });

Address.belongsTo(User, { foreignKey: 'userId' });

Payment.belongsTo(Order, { foreignKey: 'orderId' });

Dispute.belongsTo(Order, { foreignKey: 'orderId' });
Dispute.belongsTo(User, { foreignKey: 'userId' });

Reputation.belongsTo(User, { foreignKey: 'userId' });

export {
  User,
  Product,
  Category,
  Review,
  Cart,
  Order,
  Address,
  Payment,
  Dispute,
  Reputation,
};
