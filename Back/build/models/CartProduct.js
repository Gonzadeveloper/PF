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
exports.CartProduct = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Cart_1 = require("./Cart");
const Product_1 = require("./Product");
let CartProduct = class CartProduct extends sequelize_typescript_1.Model {
};
exports.CartProduct = CartProduct;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Cart_1.Cart),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], CartProduct.prototype, "cartId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Cart_1.Cart),
    __metadata("design:type", Cart_1.Cart)
], CartProduct.prototype, "cart", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Product_1.Product),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], CartProduct.prototype, "productId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Product_1.Product),
    __metadata("design:type", Product_1.Product)
], CartProduct.prototype, "product", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], CartProduct.prototype, "quantity", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE }),
    __metadata("design:type", Object)
], CartProduct.prototype, "deletedAt", void 0);
exports.CartProduct = CartProduct = __decorate([
    (0, sequelize_typescript_1.DefaultScope)(() => ({
        where: { deletedAt: null },
    })),
    (0, sequelize_typescript_1.Table)({
        timestamps: false, // Deshabilita createdAt y updatedAt
        paranoid: true, // Habilita el borrado lógico
    })
], CartProduct);
