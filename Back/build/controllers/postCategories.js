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
exports.postCategories = void 0;
const Category_1 = require("../models/Category");
const postCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ error: 'Name is required' });
        return;
    }
    try {
        const newCategory = yield Category_1.Category.create({ name });
        res.status(201).json(newCategory);
    }
    catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.postCategories = postCategories;
// import { Request, Response } from 'express';
// import { Category } from '../models/Category';
// const postCategories = async (req: Request, res: Response): Promise<void> => {
//   const { name } = req.body as { name: string };
//   if (!name) {
//     res.status(400).json({ error: 'Name is required' });
//     return;
//   }
//   try {
//     const newCategory = await Category.create({ name });
//     res.status(201).json(newCategory);
//   } catch (error) {
//     console.error('Error creating category:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
// export { postCategories };
