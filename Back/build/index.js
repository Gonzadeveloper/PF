"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getAllProducts_1 = __importDefault(require("./routes/getAllProducts"));
const getProductByName_1 = __importDefault(require("./routes/getProductByName"));
const getProductById_1 = __importDefault(require("./routes/getProductById"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // middleware que transforma la req.body a un json
<<<<<<< HEAD
=======
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
>>>>>>> 861ec39cdd3f4948a622d76d8ce4fb31ef9b50c7
const PORT = 3000;
app.get('/products', getAllProducts_1.default);
app.get('/products/:name', getProductByName_1.default);
app.get('/products/:id', getProductById_1.default);
app.get('/ping', (_req, res) => {
    console.log('someone pinged here!!');
    res.send('pong');
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
