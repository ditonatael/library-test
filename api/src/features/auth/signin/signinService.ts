import { prisma } from '../../../connection'
import { ISigninUser } from './signinType'

export const findUser = async ({ email }: ISigninUser) => {
    const findUserByEmail = await prisma.users.findUnique({
        where: {
            email: email
        }
    })

    if (!findUserByEmail) {
        throw new Error("User not found!")
    }

    return findUserByEmail
}

export const findUserByUid = async ({ uid }: { uid: string }) => {
    return await prisma.users.findUnique({
        where: {
            uid: uid
        }
    })
}
