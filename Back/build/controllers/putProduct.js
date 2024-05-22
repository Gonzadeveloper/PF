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
exports.putProduct = void 0;
const Product_1 = require("../models/Product");
const User_1 = require("../models/User"); // Asegúrate de que la ruta al modelo User sea correcta
const Category_1 = require("../models/Category"); // Asegúrate de que la ruta al modelo Category sea correcta
// Función que actualiza el producto en la base de datos
const updateProduct = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    // Encontrar el producto por ID
    const product = yield Product_1.Product.findByPk(id);
    if (!product) {
        throw new Error("Producto no encontrado");
    }
    // Si hay un user ID, verificar que el usuario exista
    if (updateData.userId) {
        const user = yield User_1.User.findByPk(updateData.userId);
        if (!user) {
            throw new Error("Usuario no encontrado");
        }
    }
    // Si hay una category ID, verificar que la categoría exista
    if (updateData.categoryId) {
        const category = yield Category_1.Category.findByPk(updateData.categoryId);
        if (!category) {
            throw new Error("Categoría no encontrada");
        }
    }
    // Actualizar el producto con los nuevos datos
    return yield product.update(updateData);
});
// Controlador que maneja la solicitud PUT para actualizar un producto
const putProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const updateData = req.body;
        const updatedProduct = yield updateProduct(Number(id), updateData);
        res.json(updatedProduct);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            // Manejo de errores no esperados
            res.status(500).json({ error: 'Un error desconocido ocurrió' });
        }
    }
});
exports.putProduct = putProduct;
