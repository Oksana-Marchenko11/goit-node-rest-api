// Функції-запити до бази даних MONGODB

import Contact from "../models/Contact.js";

export const listContacts = (filter = {}, query = {}) => Contact.find(filter, "-createdAt -updatedAt", query);

export const addContact = data => Contact.create(data);

export const getContactById = id => Contact.findById(id);

export const getOneContact = filter => Contact.findOne(filter);

//{new: true --> якщо не передати, то дані в базі оновляться, але у відповіді прийдуть старі дані, runValidators: true -->бо при update автоматично не спрацьовує валідація}
export const updateContactById = (id, data) => Contact.findByIdAndUpdate(id, data, { new: true, runValidators: true });

export const updateOneContact = (filter, data) => Contact.findOneAndUpdate(filter, data, { new: true, runValidators: true });

export const removeContact = id => Contact.findByIdAndDelete(id);

export const removeOneContact = filter => Contact.findBOneAndDelete(filter);