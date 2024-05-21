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
exports.postUser = void 0;
const database_1 = require("../config/database");
const User_1 = require("../models/User");
const Address_1 = require("../models/Address");
const sequelize_1 = require("sequelize");
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userdata = req.body;
    try {
        console.log(userdata);
        // Conectar a la base de datos
        yield database_1.sequelize.authenticate();
        console.log('Connection has been established successfully.');
        //     // Crear un nuevo Users
        const newUser = yield User_1.User.create({
            name: userdata.name,
            email: userdata.email,
            password: userdata.password,
            typeuser: userdata.typeuser,
        });
        // Crear una nueva Adress
        const newAddress = yield Address_1.Address.create({
            address: userdata.address,
            city: userdata.city,
            state: userdata.state,
            postalcode: userdata.postalcode,
            country: userdata.country,
            userId: newUser.id
        });
        console.log(newUser);
        console.log(newAddress);
        console.log('Usuarios y Direccio creado exitozamente.');
        res.status(200).json(userdata);
    }
    catch (error) {
        handleCreationError(error, res);
    }
});
exports.postUser = postUser;
function handleCreationError(error, res) {
    if (error instanceof sequelize_1.ValidationError) {
        console.error('Error de validación:', error.errors.map((e) => e.message).join(', '));
        res.status(400).json({ error: 'Error de validación', details: error.errors });
    }
    else if (error instanceof sequelize_1.UniqueConstraintError) {
        console.error('Error de restricción única:', error.errors.map((e) => e.message).join(', '));
        res.status(400).json({ error: 'Error de restricción única', details: error.errors });
    }
    else {
        console.error('Error desconocido al crear usuario y dirección:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
}
//run();
