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
exports.deleteOrder = void 0;
const Order_1 = require("../models/Order");
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    try {
        const order = yield Order_1.Order.findByPk(orderId);
        if (!order) {
            res.status(404).json({ error: 'Order not found' });
            return;
        }
        yield order.destroy(); // Realiza un borrado lógico
        res.status(200).json({ message: 'Order deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.deleteOrder = deleteOrder;
