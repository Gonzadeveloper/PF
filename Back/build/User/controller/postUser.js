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
const database_1 = require("../../config/database");
const User_1 = require("../../models/User");
const Address_1 = require("../../models/Address");
const sequelize_1 = require("sequelize");
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userdata = req.body;
    const transaction = yield database_1.sequelize.transaction();
    try {
        console.log('Received user data:', userdata);
        // Crear un nuevo User dentro de la transacción
        const newUser = yield User_1.User.create({
            name: userdata.name,
            email: userdata.email,
            password: userdata.password,
            typeuser: userdata.typeuser,
        }, { transaction });
        console.log('New user created:', newUser);
        // Crear una nueva Address dentro de la transacción
        const newAddress = yield Address_1.Address.create({
            address: userdata.address,
            city: userdata.city,
            state: userdata.state,
            postalcode: userdata.postalcode,
            country: userdata.country,
            userId: newUser.id,
        }, { transaction });
        console.log('New address created:', newAddress);
        // Si todo va bien, hacemos commit de la transacción
        yield transaction.commit();
        console.log('User and Address created successfully.');
        res.status(201).json({ user: newUser, address: newAddress });
    }
    catch (error) {
        // Si hay algún error, hacemos rollback de la transacción
        yield transaction.rollback();
        console.error('Error during transaction:', error);
        handleCreationError(error, res);
    }
});
exports.postUser = postUser;
function handleCreationError(error, res) {
    if (error instanceof sequelize_1.ValidationError) {
        console.error('Validation error:', error.errors.map((e) => e.message).join(', '));
        res.status(400).json({ error: 'Validation error', details: error.errors });
    }
    else if (error instanceof sequelize_1.UniqueConstraintError) {
        console.error('Unique constraint error:', error.errors.map((e) => e.message).join(', '));
        res.status(400).json({ error: 'Unique constraint error', details: error.errors });
    }
    else {
        console.error('Unknown error when creating user and address:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}
