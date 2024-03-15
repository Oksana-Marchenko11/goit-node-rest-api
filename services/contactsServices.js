// Функції-запити до бази даних MONGODB

import Contact from "../models/Contact.js";

export const listContacts = (filter = {}) => Contact.find(filter);

export const addContact = data => Contact.create(data);

export const getContactById = id => Contact.findById(id);

//{new: true --> якщо не передати, то дані в базі оновляться, але у відповіді прийдуть старі дані, runValidators: true -->бо при update автоматично не спрацьовує валідація}
export const updateContactById = (id, data) => Contact.findByIdAndUpdate(id, data, { new: true, runValidators: true });

export const removeContact = id => Contact.findByIdAndDelete(id);
