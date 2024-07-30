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
exports.getBorrowedBook = exports.updateReturnedBookStatus = exports.borrowingBook = exports.getMyBook = exports.getAllBooks = void 0;
const connection_1 = require("../../connection");
const getAllBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield connection_1.prisma.books.findMany();
});
exports.getAllBooks = getAllBooks;
const getMyBook = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email }) {
    return yield connection_1.prisma.borrowedBook.findFirst({
        where: {
            user: email,
            status: "Borrowed" || "Past_Date"
        }
    });
});
exports.getMyBook = getMyBook;
const borrowingBook = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, book_title }) {
    var _b;
    const checkUserBook = yield (0, exports.getMyBook)({ email });
    if (checkUserBook)
        throw new Error("You must return your borrowed book to borrow other book");
    const checkBookAvailability = yield connection_1.prisma.books.findFirst({
        where: {
            title: book_title,
            status: "Available"
        },
    });
    if (!checkBookAvailability)
        throw new Error("This book is not available");
    const borrowedBook = yield connection_1.prisma.borrowedBook.create({
        data: {
            book_title: book_title,
            user: email,
            end_date: new Date
        }
    });
    const changeBookStatus = yield connection_1.prisma.books.updateMany({
        where: {
            title: book_title
        },
        data: {
            status: "Borrowed"
        }
    });
    const startBorrowDate = new Date((_b = borrowedBook.start_date) !== null && _b !== void 0 ? _b : new Date());
    const endBorrowDate = new Date(startBorrowDate);
    endBorrowDate.setDate(endBorrowDate.getDate() + 7);
    return yield connection_1.prisma.borrowedBook.update({
        where: {
            id: borrowedBook.id
        },
        data: {
            end_date: endBorrowDate
        }
    });
});
exports.borrowingBook = borrowingBook;
const updateReturnedBookStatus = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, book_title }) {
    const findBook = yield connection_1.prisma.books.findUnique({
        where: {
            title: book_title
        }
    });
    const borrowedBook = yield connection_1.prisma.borrowedBook.findFirst({
        where: {
            user: email,
            book_title: book_title,
            status: "Borrowed" || "Past_Date"
        }
    });
    const updateUserBorrowedBookStatus = yield connection_1.prisma.borrowedBook.update({
        where: {
            id: borrowedBook === null || borrowedBook === void 0 ? void 0 : borrowedBook.id
        },
        data: {
            status: "Returned"
        }
    });
    const updateBorrowedBookStatus = yield connection_1.prisma.books.update({
        where: {
            title: findBook === null || findBook === void 0 ? void 0 : findBook.title
        },
        data: {
            status: "Available"
        }
    });
});
exports.updateReturnedBookStatus = updateReturnedBookStatus;
const getBorrowedBook = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield connection_1.prisma.borrowedBook.findMany();
});
exports.getBorrowedBook = getBorrowedBook;
