import { NextFunction, Response, Request } from 'express';
import { getAllBooks, borrowingBook, getMyBook, updateReturnedBookStatus, getBorrowedBook } from './booksServices';


export const showAllBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const books = await getAllBooks()
        res.status(200).send({
            error: false,
            message: "success",
            data: books
        })
    } catch (error) {
        next(error)
    }
}

export const borrowABook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, book_title } = req.body

        const borrowingABook = await borrowingBook({ email, book_title })
        res.status(201).send({
            error: false,
            message: "You borrowed a book",
            data: borrowingABook
        })
    } catch (error) {
        next(error)
    }
}

export const myBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body
        const userBorrowedBook = await getMyBook({ email })

        res.status(201).send({
            error: false,
            message: "success",
            data: userBorrowedBook
        })
    } catch (error) {
        next(error)
    }
}

export const returnBorrowedBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, book_title } = req.body

        await updateReturnedBookStatus({ email, book_title })

        res.status(201).send({
            error: false,
            message: "Book Returned!",
        })
    } catch (error) {
        next(error)
    }
}

export const allBorrowedBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const borrowedBook = await getBorrowedBook()
        res.status(200).send({
            error: false,
            message: "success",
            data: borrowedBook
        })
    } catch (error) {
        next(error)
    }
}