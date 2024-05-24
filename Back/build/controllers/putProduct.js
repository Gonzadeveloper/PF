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
exports.putProduct = void 0;
const database_1 = require("../config/database");
const Product_1 = require("../models/Product");
const putProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    const updatedData = req.body;
    try {
        // Validar la entrada
        if (!productId || !updatedData) {
            res.status(400).json({ message: 'ID del producto y datos de actualización son obligatorios' });
            return;
        }
        // Conectar a la base de datos
        yield database_1.sequelize.authenticate();
        console.log('Connection has been established successfully.');
        // Iniciar una transacción
        const transaction = yield database_1.sequelize.transaction();
        try {
            // Buscar el producto por ID
            const product = yield Product_1.Product.findByPk(productId);
            if (!product) {
                res.status(404).json({ message: 'Producto no encontrado' });
                return;
            }
            // Actualizar el producto con los datos proporcionados
            yield product.update(updatedData, { transaction });
            // Confirmar la transacción
            yield transaction.commit();
            console.log('Producto actualizado exitosamente:', product);
            res.status(200).json(product); // Responder con el producto actualizado
        }
        catch (error) {
            // Revertir la transacción en caso de error
            yield transaction.rollback();
            // Manejo del error
            if (error instanceof Error) {
                console.error('Unable to perform CRUD operations:', error);
                res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
            }
            else {
                console.error('Unknown error:', error);
                res.status(500).json({ message: 'Error al actualizar el producto', error: 'Error desconocido' });
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
exports.putProduct = putProduct;
