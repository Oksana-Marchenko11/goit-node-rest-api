import express from "express";
import authControllers from "../controllers/authControllers.js";
import validateBody from "../decorators/validateBody.js";
import { userSignupSchema, userSigninSchema, verifySchema } from "../schemas/usersSchemas.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(userSignupSchema), authControllers.signup);
authRouter.post("/login", validateBody(userSigninSchema), authControllers.signin);
authRouter.get("/current", authenticate, authControllers.getCurrent);
authRouter.post("/logout", authenticate, authControllers.logOut);
authRouter.get("/verify/:verificationToken", authControllers.verify);
authRouter.post("/verify", validateBody(verifySchema), authControllers.repeatVerify);

export default authRouter;