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
const router = express.Router();
router.get('/registrar', auth_1.passport.authenticate('auth0', {
    scope: 'openid email profile'
}), (_req, res) => {
    res.redirect('/');
});
router.get('/callback', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    auth_1.passport.authenticate('auth0', (err, user, _info) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/registrar');
        }
        req.logIn(user, (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return next(err);
            }
            // Verificar si el usuario existe en la base de datos
            const existingUser = yield user.findOne({ where: { email: user.emails[0].value } });
            if (!existingUser) {
                // Crear un nuevo usuario en la base de datos
                yield user.create({ email: user.emails[0].value });
            }
            res.redirect('/');
        }));
    }))(req, res, next);
}));
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
