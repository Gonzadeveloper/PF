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
exports.putCart = void 0;
const database_1 = require("../config/database");
const Cart_1 = require("../models/Cart");
const putCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cartId = req.params.id;
    const updatedData = req.body;
    try {
        // Validar la entrada
        if (!cartId || !updatedData) {
            res.status(400).json({ message: 'ID del carrito y datos de actualización son obligatorios' });
            return;
        }
        // Conectar a la base de datos
        yield database_1.sequelize.authenticate();
        console.log('Conexión establecida exitosamente.');
        // Iniciar una transacción
        const transaction = yield database_1.sequelize.transaction();
        try {
            // Buscar el carrito por ID
            const cart = yield Cart_1.Cart.findByPk(cartId);
            if (!cart) {
                res.status(404).json({ message: 'Carrito no encontrado' });
                return;
            }
            // Actualizar el carrito con los datos proporcionados
            yield cart.update(updatedData, { transaction });
            // Confirmar la transacción
            yield transaction.commit();
            console.log('Carrito actualizado exitosamente:', cart);
            res.status(200).json(cart); // Responder con el carrito actualizado
        }
        catch (error) {
            // Revertir la transacción en caso de error
            yield transaction.rollback();
            // Manejo del error
            if (error instanceof Error) {
                console.error('No se pueden realizar operaciones CRUD:', error);
                res.status(500).json({ message: 'Error al actualizar el carrito', error: error.message });
            }
            else {
                console.error('Error desconocido:', error);
                res.status(500).json({ message: 'Error al actualizar el carrito', error: 'Error desconocido' });
            }
        }
    }
    catch (error) {
        // Manejo del error de conexión a la base de datos
        if (error instanceof Error) {
            console.error('Error de conexión a la base de datos:', error);
            res.status(500).json({ message: 'Error de conexión a la base de datos', error: error.message });
        }
        else {
            console.error('Error desconocido:', error);
            res.status(500).json({ message: 'Error de conexión a la base de datos', error: 'Error desconocido' });
        }
    }
});
exports.putCart = putCart;
