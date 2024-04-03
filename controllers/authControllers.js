import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import * as authServices from "../services/authServices.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js"
import dotenv from 'dotenv';
dotenv.config();
import { nanoid } from "nanoid";
import sendEmail from "../helpers/sendEmail.js";

const { JWT_SECRET, BASE_URL } = process.env;

const signup = async (req, res) => {
    const { email } = req.body;
    const user = await authServices.findUser({ email });
    if (user) {
        throw HttpError(409, "Email in use")
    }
    const verificationToken = nanoid();
    const newUser = await authServices.signup({ ...req.body, verificationToken });
    sendEmail({
        to: email,
        subject: "Varification",
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Verify your email</a>`,
    })
    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        }
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
    if (!user.verify) {
        throw HttpError(401, "Please verify your email")
    }

    const { _id: id } = user;

    const payload = {
        id
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await authServices.updateUser({ _id: id }, { token });

    res.status(200).json({
        "token:": token,
        "user": { "email": user.email, "subscription": user.subscription }
    })
}
const getCurrent = async (req, res) => {
    const { subscription, email } = req.user;
    res.status(200).json({
        "email": email,
        "subscription": subscription
    })
};
const logOut = async (req, res) => {
    const { _id } = req.user;
    await authServices.updateUser(_id, { token: "" });
    res.status(204).json();
}

const verify = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) { throw HttpError(404, "User not found") };
    await User.findByIdAndUpdate(user._id, {
        verify: true,
        verificationToken: null,
    });

    res.status(200).json({ message: "Verification successful" })
}

const repeatVerify = async (req, res) => {
    const { email } = req.body;
    if (!email) { res.status(400).json({ message: "missing required field email" }) }
    const user = await User.findOne({ email });
    if (!user.verify) {
        sendEmail({
            to: email,
            subject: "Repeating Varification",
            html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Verify your email</a>`,
        })
    } else { res.status(400).json({ message: "Verification has already been passed" }) }
    res.status(200).json({ message: "Verification email sent" })
}

export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    logOut: ctrlWrapper(logOut),
    getCurrent: ctrlWrapper(getCurrent),
    verify: ctrlWrapper(verify),
    repeatVerify: ctrlWrapper(repeatVerify),
}
