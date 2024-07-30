"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupValidator = void 0;
const express_validator_1 = require("express-validator");
exports.SignupValidator = [
    (0, express_validator_1.body)('email').notEmpty().withMessage('Email is required').isString().isEmail().withMessage('Email Must Valid!'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required')
        .isString()
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .isLength({ min: 8 }).withMessage("Password minimal length is 8")
        .isAlphanumeric().withMessage("Password should not conntains special characters")
];
