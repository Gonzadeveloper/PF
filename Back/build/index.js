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
exports.Address = exports.User = exports.Category = exports.Product = void 0;
const express_1 = __importDefault(require("express"));
const getAllProducts_1 = __importDefault(require("./routes/getAllProducts"));
const getProductByName_1 = __importDefault(require("./routes/getProductByName"));
const getProductById_1 = __importDefault(require("./routes/getProductById"));
<<<<<<< HEAD
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
require('dotenv').config();
=======
const postProduct_1 = __importDefault(require("./routes/postProduct"));
//import  {init } from "./db";
const putProduct_1 = __importDefault(require("./routes/putProduct"));
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
const database_1 = require("./config/database");
const Product_1 = require("./models/Product");
Object.defineProperty(exports, "Product", { enumerable: true, get: function () { return Product_1.Product; } });
const Category_1 = require("./models/Category");
Object.defineProperty(exports, "Category", { enumerable: true, get: function () { return Category_1.Category; } });
const User_1 = require("./models/User");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return User_1.User; } });
const Address_1 = require("./models/Address");
Object.defineProperty(exports, "Address", { enumerable: true, get: function () { return Address_1.Address; } });
const postUser_1 = __importDefault(require("./routes/postUser"));
>>>>>>> 813319aa93483857abc613aee470c874d90cc2e6
const app = (0, express_1.default)();
// Configuración de la sesión
app.use(session({
    secret: 'your-secret',
    resave: false,
    saveUninitialized: true,
}));
// Inicializar Passport y Auth0
const strategy = new Auth0Strategy({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/MiPerfil'
}, function (profile, done) {
    // accessToken: string, refreshToken: string, extraParams: any,
    return done(null, profile);
});
app.use(passport.initialize());
app.use(passport.session());
// Configurar Passport para usar la estrategia de Auth0
passport.use(strategy);
// Guardar el perfil de usuario en la sesión
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});
// Rutas de inicio de sesión y cierre de sesión
app.get('/login', passport.authenticate('auth0'));
app.get('/callback', passport.authenticate('auth0', { failureRedirect: '/login' }), function (_req, res) {
    // Redirigir al usuario después de iniciar sesión exitosamente
    res.redirect('/');
});
app.use(express_1.default.json()); // middleware que transforma la req.body a un json
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'auG6_Kf52jXOk8dSNcEtDifshjHgVDm4D7y8DH8wQqOvIjpNuzT1Vm8JpdnS4BhX',
    baseURL: 'http://localhost:3000',
    clientID: 'Xqv1NfgoqHqhwJjYdMASLNl4lPIjOawK',
    issuerBaseURL: 'https://dev-pywymllismpo3klw.us.auth0.com'
};
const PORT = 3000;
app.get('/products', getAllProducts_1.default);
app.get('/products/:name', getProductByName_1.default);
app.get('/products/:id', getProductById_1.default);
app.post('/products/product/', postProduct_1.default);
app.post('/user/', postUser_1.default);
app.put('/products/:id', putProduct_1.default);
app.use(auth(config));
app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.sequelize.sync({ force: false });
        console.log('Database & tables created!');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
init();
//   const server = require('./src/app.js');
// const { conn } = require('./src/db.js');
// // Syncing all the models at once.
// conn.sync({ force: false }).then(() => {
//   server.listen(3001, () => {
//     console.log('%s listening at 3001'); // eslint-disable-line no-console
//   });
// });
