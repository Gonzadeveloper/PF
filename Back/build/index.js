"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = exports.User = exports.Category = exports.Product = void 0;
const express_1 = __importDefault(require("express"));
const getAllProducts_1 = __importDefault(require("./routes/getAllProducts"));
const getProductByName_1 = __importDefault(require("./routes/getProductByName"));
const getProductById_1 = __importDefault(require("./routes/getProductById"));
const postProduct_1 = __importDefault(require("./routes/postProduct"));
//import  {init } from "./db";
const database_1 = require("./config/database");
const Product_1 = require("./models/Product");
Object.defineProperty(exports, "Product", { enumerable: true, get: function () { return Product_1.Product; } });
const Category_1 = require("./models/Category");
Object.defineProperty(exports, "Category", { enumerable: true, get: function () { return Category_1.Category; } });
const User_1 = require("./models/User");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return User_1.User; } });
const Address_1 = require("./models/Address");
Object.defineProperty(exports, "Address", { enumerable: true, get: function () { return Address_1.Address; } });
const postUser_1 = __importDefault(require("./routes/postUser"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // middleware que transforma la req.body a un json
const PORT = 3000;
app.get('/products', getAllProducts_1.default);
app.get('/products/:name', getProductByName_1.default);
app.get('/products/:id', getProductById_1.default);
app.post('/products/product/', postProduct_1.default);
app.post('/user/', postUser_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.sequelize.sync({ force: false });
        console.log('Database & tables created!');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
init();
//   const server = require('./src/app.js');
// const { conn } = require('./src/db.js');
// // Syncing all the models at once.
// conn.sync({ force: false }).then(() => {
//   server.listen(3001, () => {
//     console.log('%s listening at 3001'); // eslint-disable-line no-console
//   });
// });
