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
exports.getAllProductOrder = void 0;
const ProductOrder_1 = require("../models/ProductOrder");
const getAllProductOrder = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productOrders = yield ProductOrder_1.ProductOrder.findAll();
        res.json(productOrders);
    }
    catch (error) {
        console.error('Error fetching product orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getAllProductOrder = getAllProductOrder;
