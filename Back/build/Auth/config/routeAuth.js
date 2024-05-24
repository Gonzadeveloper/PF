"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const authController = require('./verificacionToken');
const verificacionToken_1 = require("./verificacionToken");
const router = express.Router();
router.post('/authenticate', verificacionToken_1.checkJwt, authController.authenticateUser);
module.exports = router;
