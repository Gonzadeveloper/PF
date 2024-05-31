"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MPConfig_1 = require("../Pasarela de Pagos/MPConfig");
const router = express_1.default.Router();
router.post('/', MPConfig_1.payment);
exports.default = router;
