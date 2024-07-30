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
exports.allBorrowedBook = exports.returnBorrowedBook = exports.myBook = exports.borrowABook = exports.showAllBooks = void 0;
const booksServices_1 = require("./booksServices");
const showAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield (0, booksServices_1.getAllBooks)();
        res.status(200).send({
            error: false,
            message: "success",
            data: books
        });
    }
    catch (error) {
        next(error);
    }
});
exports.showAllBooks = showAllBooks;
const borrowABook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, book_title } = req.body;
        const borrowingABook = yield (0, booksServices_1.borrowingBook)({ email, book_title });
        res.status(201).send({
            error: false,
            message: "You borrowed a book",
            data: borrowingABook
        });
    }
    catch (error) {
        next(error);
    }
});
exports.borrowABook = borrowABook;
const myBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const userBorrowedBook = yield (0, booksServices_1.getMyBook)({ email });
        res.status(201).send({
            error: false,
            message: "success",
            data: userBorrowedBook
        });
    }
    catch (error) {
        next(error);
    }
});
exports.myBook = myBook;
const returnBorrowedBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, book_title } = req.body;
        yield (0, booksServices_1.updateReturnedBookStatus)({ email, book_title });
        res.status(201).send({
            error: false,
            message: "Book Returned!",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.returnBorrowedBook = returnBorrowedBook;
const allBorrowedBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrowedBook = yield (0, booksServices_1.getBorrowedBook)();
        res.status(200).send({
            error: false,
            message: "success",
            data: borrowedBook
        });
    }
    catch (error) {
        next(error);
    }
});
exports.allBorrowedBook = allBorrowedBook;
