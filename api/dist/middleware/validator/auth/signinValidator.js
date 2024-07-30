"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigninValidator = void 0;
const express_validator_1 = require("express-validator");
exports.SigninValidator = [
    (0, express_validator_1.body)('email').notEmpty().withMessage('Email is required').isString().isEmail().withMessage('Email Must Valid!'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required').isString()
];
