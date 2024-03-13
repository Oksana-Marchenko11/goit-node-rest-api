import HttpError from "../helpers/HttpError.js";
  
// Валідація безпосередньо перед БД;
const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

export default validateBody;
