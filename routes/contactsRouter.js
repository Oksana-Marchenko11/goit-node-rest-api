import express from "express";
import contactsController from "../controllers/contactsControllers.js";
import validateBody from "../decorators/validateBode.js";
import {createContactSchema, updateContactSchema} from "../schemas/contactsSchemas.js";
import { isValidId } from "../middware/isValidId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAllContacts);

contactsRouter.get("/:id", contactsController.getOneContact);

contactsRouter.delete("/:id", isValidId, contactsController.deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), contactsController.createContact);

contactsRouter.put("/:id", isValidId, validateBody(updateContactSchema), contactsController.updateContact);

export default contactsRouter;
