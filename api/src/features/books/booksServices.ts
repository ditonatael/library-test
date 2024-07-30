import { prisma } from "../../connection";

export const getAllBooks = async () => {
    return await prisma.books.findMany()
}

export const getMyBook = async ({ email }: { email: string }) => {
    return await prisma.borrowedBook.findFirst({
        where: {
            user: email,
            status: "Borrowed" || "Past_Date"
        }
    })
}

export const borrowingBook = async ({ email, book_title }: { email: string, book_title: string }) => {
    const checkUserBook = await getMyBook({ email })
    if (checkUserBook) throw new Error("You must return your borrowed book to borrow other book")

    const checkBookAvailability = await prisma.books.findFirst({
        where: {
            title: book_title,
            status: "Available"
        },
    })

    if (!checkBookAvailability) throw new Error("This book is not available")

    const borrowedBook = await prisma.borrowedBook.create({
        data: {
            book_title: book_title,
            user: email,
            end_date: new Date
        }
    })

    const changeBookStatus = await prisma.books.updateMany({
        where: {
            title: book_title
        },
        data: {
            status: "Borrowed"
        }
    })

    const startBorrowDate = new Date(borrowedBook.start_date ?? new Date());
    const endBorrowDate = new Date(startBorrowDate);
    endBorrowDate.setDate(endBorrowDate.getDate() + 7);

    return await prisma.borrowedBook.update({
        where: {
            id: borrowedBook.id
        },
        data: {
            end_date: endBorrowDate
        }
    })
}

export const updateReturnedBookStatus = async ({ email, book_title }: { email: string, book_title: string }) => {
    const findBook = await prisma.books.findUnique({
        where: {
            title: book_title
        }
    })

    const borrowedBook = await prisma.borrowedBook.findFirst({
        where: {
            user: email,
            book_title: book_title,
            status: "Borrowed" || "Past_Date"
        }
    })

    const updateUserBorrowedBookStatus = await prisma.borrowedBook.update({
        where: {
            id: borrowedBook?.id
        },
        data: {
            status: "Returned"
        }
    })

    const updateBorrowedBookStatus = await prisma.books.update({
        where: {
            title: findBook?.title
        },
        data: {
            status: "Available"
        }
    })
}

export const getBorrowedBook = async () => {
    return await prisma.borrowedBook.findMany()
}

