import { NextFunction, Response, Request } from 'express';
import { findUser, findUserByUid } from './signinService';
import { comparePassword } from '../../../helpers/Hashing';
import { createToken, IReqAccessToken } from '../../../helpers/Token';

export const signin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        const findSigninUser = await findUser({ email })

        const comparePasswordResult = await comparePassword({ passwordFromClient: password, passwordFromDb: findSigninUser.password });
        if (!comparePasswordResult) throw new Error('Password is incorrect!');
        const accesstoken = await createToken({ uid: findSigninUser.uid })

        return res.status(200).send({
            error: false,
            message: "Login Success",
            data: {
                accesstoken,
                email: findSigninUser.email,
                role: findSigninUser.role
            }
        })
    } catch (error) {
        next(error)
    }
}

export const persistSignin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqToken = req as IReqAccessToken;
        const { uid } = reqToken.payload

        const user = await findUserByUid({ uid })

        return res.status(200).send({
            error: false,
            message: "success",
            data: user
        })

    } catch (error) {
        next(error)
    }
}