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
const express = require('express');
const auth_1 = require("./auth");
const User = require('../../models/User');
const axios = require('axios');
require('dotenv').config();
const router = express.Router();
router.get('/login', auth_1.passport.authenticate('auth0', {
    scope: 'openid email profile'
}), (_req, res) => {
    res.redirect('/');
});
router.get('/callback', (req, res, next) => {
    auth_1.passport.authenticate('auth0', (err, user, _info) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/login');
        }
        req.logIn(user, (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return next(err);
            }
            try {
                // Obtén los datos del usuario desde Auth0 usando el access token
                const { accessToken } = user;
                const auth0UserInfo = yield axios.get(`https://${process.env.AUTH0_DOMAIN}/userinfo`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                const { email, name, sub } = auth0UserInfo.data;
                // Verificar si el usuario existe en la base de datos
                let existingUser = yield User.findOne({ where: { auth0Id: sub } });
                if (!existingUser) {
                    // Crear un nuevo usuario en la base de datos
                    existingUser = yield User.create({
                        email,
                        name,
                        auth0Id: sub
                    });
                }
                res.redirect('/');
            }
            catch (dbError) {
                next(dbError);
            }
        }));
    }))(req, res, next);
});
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});
router.get('/failure', (_req, res) => {
    res.send('Failed to authenticate.');
});
router.get('/profile', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    res.send(`Hello ${req.user.displayName}`);
});
module.exports = router;
