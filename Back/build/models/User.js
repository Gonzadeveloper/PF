"use strict";
// import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
// import { Address } from './Address';
// import { Product } from './Product';
// import { IsEmail } from 'class-validator';
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
// @Table
// export class User extends Model<User> {
//   @Column({ 
//     type: DataType.STRING,
//     allowNull: false,
//     validate: {
//       notEmpty: true, // No permite valores vacíos
//       len: [3, 50],   // Longitud entre 3 y 50 caracteres
//     }
//   })
//   name!: string;
//   @IsEmail({}, { message: 'Invalid email address' })
//   @Column({ 
//     type: DataType.STRING,
//     allowNull: false,
//     unique: true, // No permite valores duplicados
//     validate: {
//       notEmpty: true, // No permite valores vacíos
//       len: [3, 50],
//       isEmail: true   // Longitud entre 3 y 50 caracteres y debe ser un email válido
//     }
//   }) 
//   email!: string;
//   @Column({         
//     type: DataType.STRING,
//     allowNull: false,
//     validate: {
//       notEmpty: true, // No permite valores vacíos
//       len: [6, 20],  // Longitud entre 6 y 20 caracteres
//     }
//   })
//   password!: string;  
//   @Column({         
//     type: DataType.STRING,
//     allowNull: false,
//     validate: {
//       notEmpty: true,            // No permite valores vacíos
//       isIn: [['ADMIN', 'USER']] // Debe ser 'ADMIN' o 'USER'
//     }
//   })
//   typeuser!: string; 
//   @HasMany(() => Address)
//   address!: Address[];
//   @HasMany(() => Product)
//   products!: Product[];
// }
//////////////////////////////////////////////
const sequelize_typescript_1 = require("sequelize-typescript");
const Address_1 = require("./Address");
const Product_1 = require("./Product");
let User = class User extends sequelize_typescript_1.Model {
};
exports.User = User;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 50],
        }
    }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            len: [3, 50],
            isEmail: true
        }
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [6, 20],
        }
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isIn: [['ADMIN', 'USER']]
        }
    }),
    __metadata("design:type", String)
], User.prototype, "typeuser", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Address_1.Address),
    __metadata("design:type", Array)
], User.prototype, "address", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Product_1.Product),
    __metadata("design:type", Array)
], User.prototype, "products", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE }),
    __metadata("design:type", Object)
], User.prototype, "deletedAt", void 0);
exports.User = User = __decorate([
    (0, sequelize_typescript_1.DefaultScope)(() => ({
        where: { deletedAt: null },
    })),
    (0, sequelize_typescript_1.Table)({
        paranoid: true, // Habilita el borrado lógico
        timestamps: true, // Habilita createdAt y updatedAt
    })
], User);
