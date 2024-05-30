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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payment = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mercadopago_1 = require("mercadopago");
const mercadopago_2 = require("mercadopago");
dotenv_1.default.config();
const client = new mercadopago_1.MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN || '' });
const app = (0, express_1.default)();
// const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const payment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = {
        items: [
            {
                id: req.body.id, // Add a unique identifier for each item
                title: req.body.name,
                description: req.body.description,
                quantity: req.body.quantity,
                unit_price: Number(req.body.price),
                currency_id: "ARS",
                image: req.body.image,
            },
        ],
        back_urls: {
            success: "http://localhost:3000/",
            failure: "http://localhost:5173/",
            pending: "http://localhost:5173/",
        },
        auto_return: "approved",
        binary_mode: true,
    };
    res.json(body);
    try {
        const preference = yield new mercadopago_2.Preference(client).create({ body });
        res.json({ redirectUrl: preference.init_point });
    }
    catch (error) {
        res.json(error);
    }
});
exports.payment = payment;
// app.post("/create_preference", async (_req, res) => {
//     const body = {
//     //...
//     };
// });
// app.listen(port, () => {
//     console.log("Servidor corriendo en el puerto:", port);
// });
