import { NextFunction, Response, Request } from 'express';
import { createUser } from './signupService';
import { HashPassword } from '../../../helpers/Hashing';

export const newUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body

        const hashedPassword = await HashPassword({ password })
        const createdUser = await createUser({ email, password: hashedPassword })

        return res.status(201).send({
            error: false,
            message: 'Account Created!',
            data: createdUser
        });

    } catch (error) {
        next(error)
    }
}