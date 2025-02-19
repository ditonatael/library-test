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
exports.findUserByUid = exports.findUser = void 0;
const connection_1 = require("../../../connection");
const findUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email }) {
    const findUserByEmail = yield connection_1.prisma.users.findUnique({
        where: {
            email: email
        }
    });
    if (!findUserByEmail) {
        throw new Error("User not found!");
    }
    return findUserByEmail;
});
exports.findUser = findUser;
const findUserByUid = (_a) => __awaiter(void 0, [_a], void 0, function* ({ uid }) {
    return yield connection_1.prisma.users.findUnique({
        where: {
            uid: uid
        }
    });
});
exports.findUserByUid = findUserByUid;
