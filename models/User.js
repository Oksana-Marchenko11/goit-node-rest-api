import { Schema, model } from "mongoose";
import { setUpdateSettings, handleSaveError } from "./hooks.js";
import { emailRegexp } from "../constants/user-constants.js"

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: emailRegexp,
    unique: true,// команда до бази створити унікальний індекс по полю email. Якщо індекс не додався, то треба самом у його створити в БД.(index->create index)
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  // Додаємо токен, щоб зберегти його в базі і щоб при logout можна було вийти стерши його.
  token: {
    type: String,
  },
}, { versionKey: false, timestamps: true });// 1-номер зміни значення, 2-час останнього оновлення;

userSchema.pre("findAndUpdate", setUpdateSettings);
userSchema.post("findAndUpdate", handleSaveError);
userSchema.post("save", handleSaveError); // виводить помилку при спробі збепреження даних;

const User = model("user", userSchema);
export default User;

