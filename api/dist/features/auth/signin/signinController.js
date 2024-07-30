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
exports.persistSignin = exports.signin = void 0;
const signinService_1 = require("./signinService");
const Hashing_1 = require("../../../helpers/Hashing");
const Token_1 = require("../../../helpers/Token");
const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const findSigninUser = yield (0, signinService_1.findUser)({ email });
        const comparePasswordResult = yield (0, Hashing_1.comparePassword)({ passwordFromClient: password, passwordFromDb: findSigninUser.password });
        if (!comparePasswordResult)
            throw new Error('Password is incorrect!');
        const accesstoken = yield (0, Token_1.createToken)({ uid: findSigninUser.uid });
        return res.status(200).send({
            error: false,
            message: "Login Success",
            data: {
                accesstoken,
                email: findSigninUser.email,
                role: findSigninUser.role
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.signin = signin;
const persistSignin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqToken = req;
        const { uid } = reqToken.payload;
        const user = yield (0, signinService_1.findUserByUid)({ uid });
        return res.status(200).send({
            error: false,
            message: "success",
            data: user
        });
    }
    catch (error) {
        next(error);
    }
});
exports.persistSignin = persistSignin;
