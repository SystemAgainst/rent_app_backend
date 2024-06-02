// upload.js
const multer = require('multer');
const path = require('path');
const uuid = require('uuid');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '..', 'static')); // Директория для сохранения файлов
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = uuid.v4() + path.extname(file.originalname); // Генерация уникального имени файла
        cb(null, uniqueSuffix);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
