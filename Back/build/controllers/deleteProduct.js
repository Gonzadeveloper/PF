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
exports.deleteProduct = void 0;
const Product_1 = require("../models/Product");
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ProductId = req.params.id;
    try {
        const product = yield Product_1.Product.findByPk(ProductId, { paranoid: false });
        if (!product) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        yield product.restore(); // Esto hará un borrado lógico
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.deleteProduct = deleteProduct;
