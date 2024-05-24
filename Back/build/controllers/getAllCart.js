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
exports.getAllCart = void 0;
const Cart_1 = require("../models/Cart");
const getAllCart = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carts = yield Cart_1.Cart.findAll({
            include: [{ all: true }], // Incluye todas las asociaciones
        });
        res.json(carts);
    }
    catch (error) {
        console.error('Error fetching carts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getAllCart = getAllCart;
