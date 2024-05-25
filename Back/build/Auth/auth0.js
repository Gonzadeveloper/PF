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
const express_1 = __importDefault(require("express"));
const express_jwt_1 = require("express-jwt");
const jwks_rsa_1 = __importDefault(require("jwks-rsa"));
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const pool = new pg_1.Pool({
    connectionString: process.env.URL, // Asegúrate de que esta variable de entorno esté configurada
    ssl: {
        rejectUnauthorized: false
    }
});
// Middleware para verificar el token de Auth0
const checkJwt = (0, express_jwt_1.expressjwt)({
    secret: jwks_rsa_1.default.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }), // Añadir tipo `any` temporalmente si TypeScript muestra errores de tipo
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
});
// Ruta para registrar o actualizar el perfil del usuario
app.post('/user', checkJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, typeuser, address, country, city, state, postalcode } = req.body;
    try {
        const client = yield pool.connect();
        const result = yield client.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            // El usuario no existe, insertarlo
            yield client.query('INSERT INTO users (name, email, password, typeuser, address, country, city, state, postalcode) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [name, email, password, typeuser, address, country, city, state, postalcode]);
        }
        else {
            // El usuario existe, actualizar su información
            yield client.query('UPDATE users SET name = $1, password = $2, typeuser = $3, address = $4, country = $5, city = $6, state = $7, postalcode = $8 WHERE email = $9', [name, password, typeuser, address, country, city, state, postalcode, email]);
        }
        client.release();
        res.send({ message: 'Usuario registrado/actualizado correctamente' });
    }
    catch (error) {
        console.error('Error al registrar/actualizar el usuario:', error);
        res.status(500).send({ error: 'Error al registrar/actualizar el usuario' });
    }
}));
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
