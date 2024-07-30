import { Router } from "express";
import { signin, persistSignin } from "./signinController";
import { SigninValidator } from "../../../middleware/validator/auth/signinValidator";
import { handleErrorValidator } from "../../../middleware/validator/handleErrorExpressValidator";
import { tokenVerify } from "../../../helpers/Token";

const router = Router()
router.post('/', SigninValidator, handleErrorValidator, signin)
router.post('/persist', tokenVerify, persistSignin)

export default router

