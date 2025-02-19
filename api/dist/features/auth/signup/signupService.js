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
exports.createUser = void 0;
const connection_1 = require("../../../connection");
const createUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password }) {
    const findDuplicateEmail = yield connection_1.prisma.users.findUnique({
        where: {
            email: email
        }
    });
    if (findDuplicateEmail)
        throw new Error('Email Already Registered!');
    return yield connection_1.prisma.users.create({
        data: {
            email: email,
            password: password
        }
    });
});
exports.createUser = createUser;
