import { body } from "express-validator"

export const SignupValidator = [
    body('email').notEmpty().withMessage('Email is required').isString().isEmail().withMessage('Email Must Valid!'),
    body('password').notEmpty().withMessage('Password is required')
        .isString()
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .isLength({ min: 8 }).withMessage("Password minimal length is 8")
        .isAlphanumeric().withMessage("Password should not conntains special characters")
]