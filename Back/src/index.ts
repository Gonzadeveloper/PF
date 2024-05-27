import express from "express";
import cors from "cors";
import { sequelize } from "./config/database";
import { Product } from "./models/Product";
import { Category } from "./models/Category";
import { User } from "./models/User";
import { Address } from "./models/Address";
import routessRaiz from "./routes/index";
import { Review } from "./models/Review";
import { Order } from "./models/Order";
import { ProductOrder } from "./models/ProductOrder";
import { Payment } from "./models/Payment";
const { Client } = require('pg');

const client = new Client({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});

client.connect();

const app = express();
app.use(express.json()); // middleware que transforma la req.body a un json
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/", routessRaiz);

const PORT = 3000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const init = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Database & tables created!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

init();

export {
  Product,
  Category,
  User,
  Address,
  Review,
  Order,
  ProductOrder,
  Payment,
};
