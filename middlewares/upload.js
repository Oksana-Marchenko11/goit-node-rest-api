import multer from "multer";
import path from "path";

const destination = path.resolve("tmp")

const storage = multer.diskStorage({
    destination,
    filename: (req, file, callback) => {
        const uniqPrefix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const filename = `${uniqPrefix}_${file.originalname}`;
        callback(null, filename);// null - це помилка. такий синтаксист;
        //callback(null, file.originalname); якщо хочемо зберегти файл під оригінальним ім"ям;
    }
});

// const limits = {
//     fileSize: 1024 * 1024 * 5
// }
// const fileFilter = (req, file, callback) => {
//     const extension = file.originalname.split(".").pop();
//     if (extension === "exe") {
//         return callback(HttpError(400, ".exe not valid extension format"));
//     }
//     callback(null, true);
// };

const upload = multer({
    storage,
    // limits,
    // fileFilter
})
export default upload;