//{new: true --> якщо не передати, то дані в базі оновляться, але у відповіді прийдуть старі дані, runValidators: true --> бо при update автоматично не спрацьовує валідація}
//Цю ф-цію треба передати в Сервіси при update даних

export const setUpdateSettings = function(next) {
    this.options.new = true;
    this.options.runValidators = true;
    next()
};

export const handleSaveError = (error, data, next)=> {
    const {name, code} = error;
    console.log(error.name);
    console.log(error.code);
    error.status = (name === "MongoServerError" && code === 11000) ? 409 : 400;
    next();
}