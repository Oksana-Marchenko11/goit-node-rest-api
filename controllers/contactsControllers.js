import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

// Виклик функцій до бази і віравлення відповіді на frontend;

const getAllContacts = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const result = await contactsService.listContacts({ owner }, { skip, limit });
    res.status(200).json(result)
};

const getOneContact = async (req, res) => {
    const { id } = req.params;
    const { _id: owner } = req.user;
    // const result = await contactsService.getContactById(id);
    const result = await contactsService.getOneContact({ _id: id, owner });
    if (!result) {
        throw HttpError(404, "Not found")
    }
    res.status(200).json(result)
};


const deleteContact = async (req, res) => {
    const { id } = req.params;
    const result = await contactsService.removeContact(id);
    if (!result) {
        throw HttpError(404, "Not found")
    }
    res.status(200).json(result)
};

const createContact = async (req, res) => {
    const { _id: owner } = req.user;
    console.log(reg.body);
    console.log(req.file);
    // const result = await contactsService.addContact({ ...req.body, owner });
    // res.status(201).json(result)
};

const updateContact = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        throw HttpError(400, "Body must have at least one field");
    }
    const { id } = req.params;
    const { _id: owner } = req.user;
    // const result = await contactsService.updateContactById(id, req.body);
    const result = await contactsService.updateOneContact({ _id: id, owner }, req.body);
    if (!result) {
        throw HttpError(404, `Contact with id ${id} not found`);
    }
    res.status(200).json(result)
};
const updateStatusContact = async (req, res) => {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const result = await contactsService.updateContactById(contactId, { favorite });
    if (!result) {
        throw HttpError(404, `Not found`);
    }
    res.status(200).json(result);


};

// Експортуємо для передачі в роутери
export default {
    getAllContacts: ctrlWrapper(getAllContacts),
    getOneContact: ctrlWrapper(getOneContact),
    deleteContact: ctrlWrapper(deleteContact),
    createContact: ctrlWrapper(createContact),
    updateContact: ctrlWrapper(updateContact),
    updateStatusContact: ctrlWrapper(updateStatusContact),
}
