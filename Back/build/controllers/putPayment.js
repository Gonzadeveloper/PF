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
exports.putPayment = void 0;
const database_1 = require("../config/database");
const Payment_1 = require("../models/Payment");
const putPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentId = req.params.id;
    const updatedData = req.body;
    try {
        // Validar la entrada
        if (!paymentId || !updatedData) {
            res.status(400).json({ message: 'ID del pago y datos de actualización son obligatorios' });
            return;
        }
        // Conectar a la base de datos
        yield database_1.sequelize.authenticate();
        console.log('Connection has been established successfully.');
        // Iniciar una transacción
        const transaction = yield database_1.sequelize.transaction();
        try {
            // Buscar el pago por ID
            const payment = yield Payment_1.Payment.findByPk(paymentId);
            if (!payment) {
                res.status(404).json({ message: 'Pago no encontrado' });
                return;
            }
            // Actualizar el pago con los datos proporcionados
            yield payment.update(updatedData, { transaction });
            // Confirmar la transacción
            yield transaction.commit();
            console.log('Pago actualizado exitosamente:', payment);
            res.status(200).json(payment); // Responder con el pago actualizado
        }
        catch (error) {
            // Revertir la transacción en caso de error
            yield transaction.rollback();
            // Manejo del error
            if (error instanceof Error) {
                console.error('Unable to perform CRUD operations:', error);
                res.status(500).json({ message: 'Error al actualizar el pago', error: error.message });
            }
            else {
                console.error('Unknown error:', error);
                res.status(500).json({ message: 'Error al actualizar el pago', error: 'Error desconocido' });
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
exports.putPayment = putPayment;
