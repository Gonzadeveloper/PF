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
exports.getAllCartProduct = void 0;
const CartProduct_1 = require("../models/CartProduct");
const getAllCartProduct = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartProducts = yield CartProduct_1.CartProduct.findAll();
        res.json(cartProducts);
    }
    catch (error) {
        console.error('Error fetching cart products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getAllCartProduct = getAllCartProduct;
