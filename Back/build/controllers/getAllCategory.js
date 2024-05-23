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
exports.getAllCategory = void 0;
//import { getUser } from '../services/getUser';
const getCategory_1 = require("../services/getCategory");
const getAllCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.query.name) {
            const users = yield (0, getCategory_1.getCategory)();
            res.status(200).json(users);
        }
        else {
            // Puedes manejar la lógica cuando `name` está presente, por ejemplo, filtrando usuarios por nombre
            // const usersByName = await getUserByName(req.query.name as string);
            // res.status(200).json(usersByName);
            res.status(400).json({ message: "Query parameter 'name' is not supported in this endpoint" });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Ocurrió un error', details: error.message });
    }
});
exports.getAllCategory = getAllCategory;
