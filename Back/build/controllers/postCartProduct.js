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
exports.postCartProduct = void 0;
const CartProduct_1 = require("../models/CartProduct");
const postCartProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cartProductData = req.body;
    try {
        // Validar los datos de entrada
        if (!cartProductData.cartId || !cartProductData.productId || !cartProductData.quantity) {
            res.status(400).json({ message: 'Todos los campos son obligatorios' });
            return;
        }
        // Crear un nuevo producto en el carrito
        const newCartProduct = yield CartProduct_1.CartProduct.create(cartProductData);
        res.status(201).json(newCartProduct);
    }
    catch (error) {
        console.error('Error creating cart product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.postCartProduct = postCartProduct;
