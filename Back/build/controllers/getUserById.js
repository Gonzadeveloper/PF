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
exports.getUserById = void 0;
const database_1 = require("../config/database");
const User_1 = require("../models/User");
const Address_1 = require("../models/Address");
// interface UserData {
//   name?: string;
//   email?: string;
//   password?: string;
//   typeuser?: string;
//   address?: string;
//   city?: string;
//   state?: string;
//   postalcode?: string;
//   country?: string;
// }
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    //const updatedData = req.body;
    try {
        // Validar la entrada
        if (!userId) {
            res.status(400).json({ message: 'ID del usuario es obligatorio' });
            return;
        }
        // Conectar a la base de datos
        yield database_1.sequelize.authenticate();
        console.log('Connection has been established successfully.');
        const user = yield User_1.User.findByPk(userId, {
            attributes: ['id', 'name', 'email', 'password', 'typeuser'],
            include: [
                {
                    model: Address_1.Address,
                    as: 'address',
                    attributes: ['address', 'country']
                }
            ]
        });
        if (!user) {
            //await transaction.rollback();
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        res.status(200).json({ user });
    }
    catch (error) {
        // Manejo del error
        if (error instanceof Error) {
            console.error('Database connection error:', error);
            res.status(500).json({ message: 'Error de conexión a la base de datos', error: error.message });
        }
        else {
            console.error('Unknown error:', error);
            res.status(500).json({ message: 'Error de conexión a la base de datos', error: 'Error desconocido' });
        }
    }
});
exports.getUserById = getUserById;
