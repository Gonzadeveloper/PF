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
exports.getAllUser = void 0;
const getUser_1 = require("../services/getUser");
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.query.name) {
            const users = yield (0, getUser_1.getUser)();
            res.status(200).json(users);
        }
        else {
            res.status(400).json({ message: "Query parameter 'name' is not supported in this endpoint" });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Ocurrió un error', details: error.message });
    }
});
exports.getAllUser = getAllUser;
