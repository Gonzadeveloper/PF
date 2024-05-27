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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const Address_1 = require("../models/Address");
const database_1 = require("../config/database");
const User_1 = require("../models/User");
const getUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Conectar a la base de datos
        yield database_1.sequelize.authenticate();
        console.log('Connection has been established successfully.');
        // Leer Usuarios
        const users = yield User_1.User.findAll({
            attributes: ['id', 'name', 'email', 'password', 'typeuser'],
            include: [
                {
                    model: Address_1.Address,
                    attributes: ['id', 'address', 'country'] // Ajusta las propiedades según tu modelo Address
                }
            ]
        });
        console.log('CRUD operations completed successfully.');
        return users;
    }
    catch (error) {
        console.error('Unable to perform CRUD operations:', error);
    }
    return [];
});
exports.getUser = getUser;
