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
exports.putProductOrder = void 0;
const database_1 = require("../config/database");
const ProductOrder_1 = require("../models/ProductOrder");
const putProductOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productOrderId = req.params.id;
    const updatedData = req.body;
    try {
        // Validar la entrada
        if (!productOrderId || !updatedData) {
            res.status(400).json({ message: 'ID del pedido del producto y los datos de actualización son obligatorios' });
            return;
        }
        // Conectar a la base de datos
        yield database_1.sequelize.authenticate();
        console.log('Connection has been established successfully.');
        // Iniciar una transacción
        const transaction = yield database_1.sequelize.transaction();
        try {
            // Buscar el pedido del producto por ID
            const productOrder = yield ProductOrder_1.ProductOrder.findByPk(productOrderId);
            if (!productOrder) {
                res.status(404).json({ message: 'Pedido del producto no encontrado' });
                return;
            }
            // Actualizar el pedido del producto con los datos proporcionados
            yield productOrder.update(updatedData, { transaction });
            // Confirmar la transacción
            yield transaction.commit();
            console.log('Pedido del producto actualizado exitosamente:', productOrder);
            res.status(200).json(productOrder); // Responder con el pedido del producto actualizado
        }
        catch (error) {
            // Revertir la transacción en caso de error
            yield transaction.rollback();
            // Manejo del error
            if (error instanceof Error) {
                console.error('Unable to perform CRUD operations:', error);
                res.status(500).json({ message: 'Error al actualizar el pedido del producto', error: error.message });
            }
            else {
                console.error('Unknown error:', error);
                res.status(500).json({ message: 'Error al actualizar el pedido del producto', error: 'Error desconocido' });
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
exports.putProductOrder = putProductOrder;
