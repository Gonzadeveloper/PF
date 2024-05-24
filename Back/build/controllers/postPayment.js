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
exports.postPayment = void 0;
const Payment_1 = require("../models/Payment");
const postPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentData = req.body;
    try {
        // Validar los datos de entrada
        if (!paymentData.orderId || !paymentData.paymentDate || !paymentData.amount || !paymentData.paymentMethod) {
            res.status(400).json({ message: 'Todos los campos son obligatorios' });
            return;
        }
        // Crear un nuevo pago
        const newPayment = yield Payment_1.Payment.create(paymentData);
        res.status(201).json(newPayment);
    }
    catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.postPayment = postPayment;
