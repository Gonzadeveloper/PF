"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const database_1 = require("./config/database");
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
//const app = express();
const port = process.env.PORT || 3000;
database_1.sequelize.sync({ force: false }).then(() => {
    app_1.default.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((err) => {
    console.error('Unable to connect to the database:', err);
});
// const init = async () => {
//     try {
//       await sequelize.sync({ force: false });
//       console.log('Database & tables created!');
//     } catch (error) {
//       console.error('Unable to connect to the database:', error);
//     }
//   };
//   init();
// export { Product, Category, User, Address, Review, Order, ProductOrder, Payment, Cart, CartProduct };
