import { body } from "express-validator";

export const SigninValidator = [
    body('email').notEmpty().withMessage('Email is required').isString().isEmail().withMessage('Email Must Valid!'),
    body('password').notEmpty().withMessage('Password is required').isString()
]