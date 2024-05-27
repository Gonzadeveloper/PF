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
exports.checkJwt = void 0;
// const express = require('express');
const { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require('jwks-rsa');
// const passport = require('./config/auth');
const User = require('../../models/User');
// const authRoutes = require('./routes/auth');
require('dotenv').config();
// const app = express();
// const port = 3000;
// Middleware para verificar el token
const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
});
exports.checkJwt = checkJwt;
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// Middleware de sesión
// app.use(require('./config/session'));
// Inicializar Passport y gestionar la sesión de Passport
// app.use(passport.initialize());
// app.use(passport.session());
// Rutas de autenticación
// app.use(authRoutes);
// Ruta para manejar la autenticación
exports.authenticateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sub, email, name } = req.user;
        let existingUser = yield User.findOne({ where: { auth0Id: sub } });
        if (!existingUser) {
            existingUser = yield User.create({
                email,
                name,
                auth0Id: sub
            });
        }
        res.status(200).send({ message: 'User authenticated and stored in the database' });
    }
    catch (error) {
        res.status(500).send({ message: 'Error authenticating user', error });
    }
});
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
