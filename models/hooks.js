//{new: true --> якщо не передати, то дані в базі оновляться, але у відповіді прийдуть старі дані, runValidators: true --> бо при update автоматично не спрацьовує валідація}
//Цю ф-цію треба передати в Сервіси при update даних

export const setUpdateSettings = function(next) {
    this.options.new = true;
    this.options.runValidators = true;
    next()
};