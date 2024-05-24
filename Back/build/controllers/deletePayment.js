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
exports.deletePayment = void 0;
const Payment_1 = require("../models/Payment");
const deletePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentId = req.params.id;
    try {
        const payment = yield Payment_1.Payment.findByPk(paymentId);
        if (!payment) {
            res.status(404).json({ error: 'Payment not found' });
            return;
        }
        yield payment.destroy(); // Realiza un borrado lógico
        res.status(200).json({ message: 'Payment deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting payment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.deletePayment = deletePayment;
