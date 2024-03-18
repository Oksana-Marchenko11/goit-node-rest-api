import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
const { JWT_SECRET } = process.env;
import HttpError from "../helpers/HttpError.js";

import { findUser } from "../services/authServices.js";


const authenticate = async (req, _, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return next(HttpError(401, "Authorization header not found "))// якщо в next передати помилку, то одрозу переходимо в обробник помилок(app.use(err, req,...))Не забути поставити return, бо next сам по собі не перериває виконання функцій
    }
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        return next(HttpError(401, "Authorization header not found "));
    }
    try {
        const { id } = jwt.verify(token, JWT_SECRET);
        const user = await findUser({ _id: id });
        if (!user) {
            return next(HttpError(401, "Not authorized"));
        };
        if (!user.token) {
            return next(HttpError(401, "Not authorized"));
        }
        req.user = user;
        next();
    } catch (error) {
        next(HttpError(404, error.message));
    }
};
export default authenticate;
