import { Schema, model } from "mongoose";
import { setUpdateSettings } from "./hooks.js";

const contactSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  }
);

contactSchema.pre("findOneAndUpdate", setUpdateSettings);

const Contact =  model("contact", contactSchema);

export default Contact;