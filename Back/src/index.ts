import express from "express";
import getAllProducts from "./routes/getAllProducts";
import getProductByName from "./routes/getProductByName";
import getProductById from "./routes/getProductById";
import postProduct from "./routes/postProduct";
//import  {init } from "./db";
import putProduct from "./routes/putProduct";
const { auth } = require("express-openid-connect");
const { requiresAuth } = require("express-openid-connect");

import { sequelize } from "./config/database";
import { Product } from "./models/Product";
import { Category } from "./models/Category";
import { User } from "./models/User";
import { Address } from "./models/Address";
import postUser from "./routes/postUser";

const app = express();
app.use(express.json()); // middleware que transforma la req.body a un json

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: "auG6_Kf52jXOk8dSNcEtDifshjHgVDm4D7y8DH8wQqOvIjpNuzT1Vm8JpdnS4BhX",
  baseURL: "http://localhost:3000",
  clientID: "Xqv1NfgoqHqhwJjYdMASLNl4lPIjOawK",
  issuerBaseURL: "https://dev-pywymllismpo3klw.us.auth0.com",
};

const PORT = 3000;

app.get("/products", getAllProducts);
app.get("/products/:name", getProductByName);
app.get("/products/:id", getProductById);
app.post("/products/product/", postProduct);
app.post("/user/", postUser);

app.put("/products/:id", putProduct);

app.use(auth(config));

app.get("/", (req: any, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

app.get("/Miperfil", requiresAuth(), (req: any, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

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

export { Product, Category, User, Address };

//   const server = require('./src/app.js');
// const { conn } = require('./src/db.js');

// // Syncing all the models at once.
// conn.sync({ force: false }).then(() => {
//   server.listen(3001, () => {
//     console.log('%s listening at 3001'); // eslint-disable-line no-console
//   });
// });
