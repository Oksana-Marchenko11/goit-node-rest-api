import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import * as authServices from "../services/authServices.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();


const { JWT_SECRET } = process.env;
console.log('ENV.JWT_SECRET:', JWT_SECRET);

const signup = async (req, res) => {
    const { email } = req.body;
    const user = await authServices.findUser({ email });
    if (user) {
        throw HttpError(409, "Email in use")
    }
    const newUser = await authServices.signup(req.body);
    res.status(201).json({
        username: newUser.username,
        password: newUser.password,
    })
};

const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await authServices.findUser({ email });
    if (!user) {
        throw HttpError(401, "Email or password is wrong")
    }
    const comparePassword = await authServices.validatePassword(password, user.password);
    if (!comparePassword) {
        throw HttpError(401, "Email or password is wrong");
    }
    const { _id: id } = user;
    console.log(id);

    const payload = {
        id,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

    console.log(token);
    res.json({ token })

}

export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin)
}
