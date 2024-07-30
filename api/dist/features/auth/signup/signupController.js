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
exports.newUser = void 0;
const signupService_1 = require("./signupService");
const Hashing_1 = require("../../../helpers/Hashing");
const newUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const hashedPassword = yield (0, Hashing_1.HashPassword)({ password });
        const createdUser = yield (0, signupService_1.createUser)({ email, password: hashedPassword });
        return res.status(201).send({
            error: false,
            message: 'Account Created!',
            data: createdUser
        });
    }
    catch (error) {
        next(error);
    }
});
exports.newUser = newUser;
