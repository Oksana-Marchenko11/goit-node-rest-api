import { isValidObjectId } from "mongoose";
import HttpError from "../helpers/HttpError.js";

// Перевіря чи прийнятий з фронту id є валідним тому, що в базі. Тобто кількість симолів і тд.. Лише чи валідний;
export const isValidId = (req, _, next) => {
    const {id} = req.params;
    if(!isValidObjectId(id)){
        return next(HttpError(404, `Not found. Id ${id} not valid id`))
    }
    next();
}