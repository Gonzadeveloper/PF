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
exports.deleteCartProduct = void 0;
const CartProduct_1 = require("../models/CartProduct");
const deleteCartProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cartProductId = req.params.id;
    try {
        const cartProduct = yield CartProduct_1.CartProduct.findByPk(cartProductId);
        if (!cartProduct) {
            res.status(404).json({ error: 'Product in cart not found' });
            return;
        }
        yield cartProduct.destroy(); // Realiza un borrado lógico
        res.status(200).json({ message: 'Product in cart deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting product in cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.deleteCartProduct = deleteCartProduct;
