"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signupController_1 = require("./signupController");
const signupValidator_1 = require("../../../middleware/validator/auth/signupValidator");
const handleErrorExpressValidator_1 = require("../../../middleware/validator/handleErrorExpressValidator");
const router = (0, express_1.Router)();
router.post('/user', signupValidator_1.SignupValidator, handleErrorExpressValidator_1.handleErrorValidator, signupController_1.newUser);
exports.default = router;
