import Contact from "../models/Contact.js";

export const listContacts = () => Contact.find();
