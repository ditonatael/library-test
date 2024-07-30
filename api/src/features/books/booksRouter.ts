import { Router } from "express";
import { showAllBooks, borrowABook, myBook, returnBorrowedBook, allBorrowedBook } from "./booksController";
import { tokenVerify } from "../../helpers/Token";

const router = Router()
router.get('/', showAllBooks)
router.post('/borrow-a-book', tokenVerify, borrowABook)
router.post('/my-book', tokenVerify, myBook)
router.put('/return-borrowed-book', tokenVerify, returnBorrowedBook)
router.get('/borrowed-book', tokenVerify, allBorrowedBook)

export default router
