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
exports.putUser = void 0;
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
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const updatedData = req.body;
    try {
        // Validar la entrada
        if (!userId || !updatedData) {
            res.status(400).json({ message: 'ID del usuario y datos de actualización son obligatorios' });
            return;
        }
        // Conectar a la base de datos
        yield database_1.sequelize.authenticate();
        console.log('Connection has been established successfully.');
        // Iniciar una transacción
        const transaction = yield database_1.sequelize.transaction();
        try {
            // Buscar el usuario por ID
            const user = yield User_1.User.findByPk(userId, { transaction });
            if (!user) {
                yield transaction.rollback();
                res.status(404).json({ message: 'Usuario no encontrado' });
                return;
            }
            // Actualizar los datos del usuario
            yield user.update(updatedData, { transaction });
            // Buscar la dirección asociada al usuario
            let address = yield Address_1.Address.findOne({ where: { userId: user.id }, transaction });
            if (address) {
                // Actualizar los datos de la dirección
                yield address.update(updatedData, { transaction });
            }
            else if (updatedData.address || updatedData.city || updatedData.state || updatedData.postalcode || updatedData.country) {
                // Crear una nueva dirección si se proporcionan datos de dirección
                address = yield Address_1.Address.create({
                    address: updatedData.address,
                    city: updatedData.city,
                    state: updatedData.state,
                    postalcode: updatedData.postalcode,
                    country: updatedData.country,
                    userId: user.id,
                }, { transaction });
            }
            // Confirmar la transacción
            yield transaction.commit();
            console.log('Usuario y dirección actualizados exitosamente:', user, address);
            res.status(200).json({ user, address }); // Responder con el usuario y la dirección actualizados
        }
        catch (error) {
            // Revertir la transacción en caso de error
            yield transaction.rollback();
            // Manejo del error
            if (error instanceof Error) {
                console.error('Unable to perform CRUD operations:', error);
                res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
            }
            else {
                console.error('Unknown error:', error);
                res.status(500).json({ message: 'Error al actualizar el usuario', error: 'Error desconocido' });
            }
        }
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
exports.putUser = putUser;
// import { Request, Response } from 'express';
// import { User } from '../models/User';
// // Función que actualiza el usuario en la base de datos
// const updateUser = async (id: number, updateData: Partial<User>) => {
//   // Encontrar el usuario por ID
//   const user = await User.findByPk(id);
//   if (!user) {
//     throw new Error('Usuario no encontrado');
//   }
//   // Actualizar el usuario con los nuevos datos
//   return await user.update(updateData);
// };
// // Controlador que maneja la solicitud PUT para actualizar un usuario
// export const putUser = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const updateData: Partial<User> = req.body;
//     const updatedUser = await updateUser(Number(id), updateData);
//     res.json(updatedUser);
//   } catch (error) {
//     if (error instanceof Error) {
//       res.status(400).json({ error: error.message });
//     } else {
//       // Manejo de errores no esperados
//       res.status(500).json({ error: 'Un error desconocido ocurrió' });
//     }
//   }
// };
