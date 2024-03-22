import express from "express";
import contactsController from "../controllers/contactsControllers.js";
import validateBody from "../decorators/validateBody.js";
import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";
import { isValidId } from "../middlewares/isValidId.js";
import authenticate from "../middlewares/authenticate.js";

const contactsRouter = express.Router();
contactsRouter.use(authenticate);

contactsRouter.get("/", contactsController.getAllContacts);

contactsRouter.get("/:id", isValidId, contactsController.getOneContact);

contactsRouter.delete("/:id", isValidId, contactsController.deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), contactsController.createContact);

contactsRouter.put("/:id", isValidId, validateBody(updateContactSchema), contactsController.updateContact);

contactsRouter.patch("/:contactId/favorite", isValidId, contactsController.updateStatusContact);

export default contactsRouter;
