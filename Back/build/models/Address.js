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
exports.Address = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = require("./User");
let Address = class Address extends sequelize_typescript_1.Model {
};
exports.Address = Address;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        validate: {
            notEmpty: true, // No permite valores vacíos
            len: [3, 50], // Longitud entre 3 y 50 caracteres
        }
    }),
    __metadata("design:type", String)
], Address.prototype, "address", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        validate: {
            notEmpty: true, // No permite valores vacíos
            len: [3, 50], // Longitud entre 3 y 50 caracteres
        }
    }),
    __metadata("design:type", String)
], Address.prototype, "city", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        validate: {
            notEmpty: true, // No permite valores vacíos
            len: [3, 50], // Longitud entre 3 y 50 caracteres
        }
    }),
    __metadata("design:type", String)
], Address.prototype, "state", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        validate: {
            notEmpty: true, // No permite valores vacíos
            len: [3, 10], // Longitud entre 3 y 10 caracteres
        }
    }),
    __metadata("design:type", String)
], Address.prototype, "postalcode", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        validate: {
            notEmpty: true, // No permite valores vacíos
            len: [3, 50], // Longitud entre 3 y 50 caracteres
        }
    }),
    __metadata("design:type", String)
], Address.prototype, "country", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER, // Usamos INTEGER para representar cantidades de stock
        allowNull: false
    }),
    __metadata("design:type", Number)
], Address.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => User_1.User),
    __metadata("design:type", User_1.User)
], Address.prototype, "user", void 0);
exports.Address = Address = __decorate([
    sequelize_typescript_1.Table
], Address);
