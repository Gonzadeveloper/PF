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
exports.deleteCart = void 0;
const Cart_1 = require("../models/Cart");
const deleteCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cartId = req.params.id;
    try {
        const cart = yield Cart_1.Cart.findByPk(cartId);
        if (!cart) {
            res.status(404).json({ error: 'Carrito no encontrado' });
            return;
        }
        yield cart.destroy(); // Realiza un borrado lógico
        res.status(200).json({ message: 'Carrito eliminado exitosamente' });
    }
    catch (error) {
        console.error('Error al eliminar el carrito:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.deleteCart = deleteCart;
