import express  from "express";
import authControllers from "../controllers/authControllers.js";
import validateBody from "../decorators/validateBody.js";
import {userSignupSchema, userSigninSchema} from "../schemas/usersSchemas.js"



const authRouter = express.Router();

authRouter.post("/register", validateBody(userSignupSchema), authControllers.signup);
authRouter.post("/login", validateBody(userSigninSchema), authControllers.signin);


export default authRouter;