import User from "../models/User.js";
import bcrypt from "bcrypt";
import gravatar from 'gravatar';

export const findUser = filter => User.findOne(filter);

export const signup = async (data) => {
    const hashPassword = await bcrypt.hash(data.password, 10);
    const avatarUrl = gravatar.url(data.email);
    return User.create({ ...data, password: hashPassword, avatarURL: avatarUrl })
};

export const validatePassword = (password, hashPassword) => bcrypt.compare(password, hashPassword);

export const updateUser = (id, data) => User.findByIdAndUpdate(id, data);

