const express = require('express');
const authController = require('./verificacionToken');
import {checkJwt} from './verificacionToken';

const router = express.Router();

router.post('/', checkJwt, authController.authenticateUser);

module.exports = router;