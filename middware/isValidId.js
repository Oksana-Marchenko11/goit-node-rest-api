import { isValidObjectId } from "mongoose";
import HttpError from "../helpers/HttpError.js";

export const isValidId = (req, _, next) => {
    const {id} = req.params;
    if(!isValidObjectId){
        return next(HttpError(404, `id ${id} not valid id`))
    }
    next();
}