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
exports.postProductOrder = void 0;
const ProductOrder_1 = require("../models/ProductOrder");
const postProductOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productOrderData = req.body;
    try {
        // Validar los datos de entrada
        if (!productOrderData.orderId || !productOrderData.productId || !productOrderData.quantity || !productOrderData.unitPrice) {
            res.status(400).json({ message: 'Todos los campos son obligatorios' });
            return;
        }
        // Crear un nuevo producto en la orden
        const newProductOrder = yield ProductOrder_1.ProductOrder.create(productOrderData);
        res.status(201).json(newProductOrder);
    }
    catch (error) {
        console.error('Error creating product order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.postProductOrder = postProductOrder;
