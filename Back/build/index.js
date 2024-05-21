"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const getAllProducts_1 = __importDefault(require("./routes/getAllProducts"));
const getProductByName_1 = __importDefault(require("./routes/getProductByName"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // middleware que transforma la req.body a un json
app.use((0, cors_1.default)()); // habilitar CORS
const PORT = 3000;
app.get('/products', getAllProducts_1.default);
app.get('/products/:name', getProductByName_1.default);
app.get('/ping', (_req, res) => {
    console.log('someone pinged here!!');
    res.send('pong');
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
