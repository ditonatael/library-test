import express, { Router } from 'express';
import cors from 'cors';
import SignupRouter from '../features/auth/signup/signupRouter'
import SigninRouter from '../features/auth/signin/signinRouter'
import BookRouter from '../features/books/booksRouter'

const router = Router();
router.use(cors());
router.use(express.json());

router.use('/signup', SignupRouter)
router.use('/signin', SigninRouter)
router.use('/books', BookRouter)

export default router