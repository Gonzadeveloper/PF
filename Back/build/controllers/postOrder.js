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
exports.postOrder = void 0;
const Order_1 = require("../models/Order");
const postOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderData = req.body;
    try {
        // Validar los datos de entrada
        if (!orderData.userId || !orderData.orderDate || !orderData.orderStatus) {
            res.status(400).json({ message: 'Todos los campos son obligatorios' });
            return;
        }
        // Crear una nueva orden
        const newOrder = yield Order_1.Order.create(orderData);
        res.status(201).json(newOrder);
    }
    catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.postOrder = postOrder;
