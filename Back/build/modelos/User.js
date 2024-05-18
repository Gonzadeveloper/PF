"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Reputation_1 = require("./Reputation");
const Cart_1 = require("./Cart");
const Order_1 = require("./Order");
const Address_1 = require("./Address");
const Review_1 = require("./Review");
const Product_1 = require("./Product");
let User = class User extends sequelize_typescript_1.Model {
};
exports.User = User;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: true
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Cart_1.Cart),
    __metadata("design:type", Cart_1.Cart)
], User.prototype, "cart", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Order_1.Order),
    __metadata("design:type", Array)
], User.prototype, "orders", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Address_1.Address),
    __metadata("design:type", Array)
], User.prototype, "addresses", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Review_1.Review),
    __metadata("design:type", Array)
], User.prototype, "reviews", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Product_1.Product, { foreignKey: 'userId', as: 'productsAsSeller' }),
    __metadata("design:type", Array)
], User.prototype, "productsAsSeller", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Product_1.Product, { foreignKey: 'userId', as: 'productsAsBuyer' }),
    __metadata("design:type", Array)
], User.prototype, "productsAsBuyer", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Reputation_1.Reputation),
    __metadata("design:type", Reputation_1.Reputation)
], User.prototype, "reputation", void 0);
exports.User = User = __decorate([
    (0, sequelize_typescript_1.Table)({
        modelName: 'User',
        tableName: 'Users',
    })
], User);
