// Це ф-ція обгортка для функцій безпосерпеднього звернення до БД і відповідей, щоб кожен раз не писати в них try catch;

const ctrlWrapper = ctrl => {
    const func = async (req, res, next) => {
        try {
            await ctrl(req, res, next)
        }
        catch (error) {
            next(error)
        }
    }

    return func;
}

export default ctrlWrapper; 