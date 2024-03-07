import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve("db", "contacts.json")
const updateContact = (contacts) => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));


export async function listContacts() {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(contacts);
};

export async function getContactById(contactId) {
    const contacts = await listContacts();
    return contacts.find(contact => contact.id === contactId) || null;
}

export async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) { return null };
    const [result] = contacts.splice(index, 1);
    await updateContact(contacts);
    return result;
}

export async function addContact(data) {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...data
    };
    contacts.push(newContact);
    await updateContact(contacts);
    return newContact;
}

export async function updateContactById (id, data) {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === id);
    if(index === -1){
        return null;
    }
    contacts[index] = {...contacts[index],...data};
    await updateContact(contacts)
    return contacts[index];
}

export default {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContactById
}