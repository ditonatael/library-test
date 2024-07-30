import { prisma } from '../../../connection'
import { ISignupUser } from './signupType'

export const createUser = async ({ email, password }: ISignupUser) => {
    const findDuplicateEmail = await prisma.users.findUnique({
        where: {
            email: email
        }
    })
    if (findDuplicateEmail) throw new Error('Email Already Registered!')

    return await prisma.users.create({
        data: {
            email: email,
            password: password
        }
    })

}
