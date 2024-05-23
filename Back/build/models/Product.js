"use strict";
// import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
// import { Category } from './Category';
// import { User } from './User';
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
exports.Product = void 0;
// @Table
// export class Product extends Model<Product> {
//   @Column({ 
//     type: DataType.STRING,
//     allowNull: false
//   })
//   name!: string;
//   @Column({ 
//     type: DataType.STRING,
//     allowNull: false
//   })
//   description!: string;
//   @Column({ 
//     type: DataType.FLOAT, // Usamos FLOAT para representar precios
//     allowNull: false
//   })
//   price!: number;
//   @Column({ 
//     type: DataType.INTEGER, // Usamos INTEGER para representar cantidades de stock
//     allowNull: false
//   })
//   stock!: number;
//   @Column({         
//     type: DataType.STRING,
//     allowNull: false
//   })
//   condition!: string;  
//   @Column({         
//     type: DataType.STRING,
//     allowNull: false
//   })
//   image!: string; 
//   @ForeignKey(() => User)
//   @Column
//   userId!: number;
//   @BelongsTo(() => User)
//   user!: User;
//   @ForeignKey(() => Category)
//   @Column
//   categoryId!: number;
//   @BelongsTo(() => Category)
//   category!: Category;
// }
///////////////////////////////////////
const sequelize_typescript_1 = require("sequelize-typescript");
const Category_1 = require("./Category");
const User_1 = require("./User");
let Product = class Product extends sequelize_typescript_1.Model {
};
exports.Product = Product;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.FLOAT, // Usamos FLOAT para representar precios
        allowNull: false
    }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER, // Usamos INTEGER para representar cantidades de stock
        allowNull: false
    }),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], Product.prototype, "condition", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], Product.prototype, "image", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Product.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => User_1.User),
    __metadata("design:type", User_1.User)
], Product.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Category_1.Category),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Product.prototype, "categoryId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Category_1.Category),
    __metadata("design:type", Category_1.Category)
], Product.prototype, "category", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE }),
    __metadata("design:type", Object)
], Product.prototype, "deletedAt", void 0);
exports.Product = Product = __decorate([
    (0, sequelize_typescript_1.DefaultScope)(() => ({
        where: { deletedAt: null },
    })),
    (0, sequelize_typescript_1.Table)({
        paranoid: true, // Habilita el borrado lógico
        timestamps: true, // Habilita createdAt y updatedAt
    })
], Product);
