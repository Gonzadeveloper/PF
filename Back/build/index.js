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
exports.Payment = exports.ProductOrder = exports.Order = exports.Review = exports.Address = exports.User = exports.Category = exports.Product = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const Product_1 = require("./models/Product");
Object.defineProperty(exports, "Product", { enumerable: true, get: function () { return Product_1.Product; } });
const Category_1 = require("./models/Category");
Object.defineProperty(exports, "Category", { enumerable: true, get: function () { return Category_1.Category; } });
const User_1 = require("./models/User");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return User_1.User; } });
const Address_1 = require("./models/Address");
Object.defineProperty(exports, "Address", { enumerable: true, get: function () { return Address_1.Address; } });
const index_1 = __importDefault(require("./routes/index"));
const Review_1 = require("./models/Review");
Object.defineProperty(exports, "Review", { enumerable: true, get: function () { return Review_1.Review; } });
const Order_1 = require("./models/Order");
Object.defineProperty(exports, "Order", { enumerable: true, get: function () { return Order_1.Order; } });
const ProductOrder_1 = require("./models/ProductOrder");
Object.defineProperty(exports, "ProductOrder", { enumerable: true, get: function () { return ProductOrder_1.ProductOrder; } });
const Payment_1 = require("./models/Payment");
Object.defineProperty(exports, "Payment", { enumerable: true, get: function () { return Payment_1.Payment; } });
//import { getUser } from "./services/getUser";
// const session = require('./Auth/config/session');
// import {passport} from './Auth/config/auth';
// const authRoutes = require('./Auth/config/routeAuth');
const app = (0, express_1.default)();
app.use(express_1.default.json()); // middleware que transforma la req.body a un json
app.use((0, cors_1.default)());
app.use('/', index_1.default);
const PORT = 3000;
// app.use(session);
// app.use(passport.initialize());
// app.use(passport.session());
// app.use('/', authRoutes);
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
