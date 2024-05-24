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
exports.Order = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = require("./User");
const ProductOrder_1 = require("./ProductOrder");
const Payment_1 = require("./Payment");
let Order = class Order extends sequelize_typescript_1.Model {
};
exports.Order = Order;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Order.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => User_1.User),
    __metadata("design:type", User_1.User)
], Order.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    __metadata("design:type", Date)
], Order.prototype, "orderDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM,
        values: ['Pendiente', 'Enviado', 'Entregado'],
        allowNull: false,
        defaultValue: 'Pendiente'
    }),
    __metadata("design:type", String)
], Order.prototype, "orderStatus", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => ProductOrder_1.ProductOrder),
    __metadata("design:type", Array)
], Order.prototype, "productOrder", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Payment_1.Payment),
    __metadata("design:type", Payment_1.Payment)
], Order.prototype, "payment", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE }),
    __metadata("design:type", Object)
], Order.prototype, "deletedAt", void 0);
exports.Order = Order = __decorate([
    (0, sequelize_typescript_1.DefaultScope)(() => ({
        where: { deletedAt: null },
    })),
    (0, sequelize_typescript_1.Table)({
        timestamps: true, // Habilita createdAt y updatedAt
        paranoid: true, // Habilita el borrado lógico
    })
], Order);
