require("dotenv").config();

const multer = require("multer");
const path = require("path")

const excludedExtensions = process.env.EXCLUDED_EXTENSIONS.split(",");
const maxSize = parseInt(process.env.LIMITED_SIZE);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const fileFilter = (req, file, cb) => {
    const fileExt = path.extname(file.originalname).toLowerCase();
    if (excludedExtensions.includes(fileExt)) {
        return cb(new Error("File not allowed"), false);
    }

    if (file.size > maxSize) {
        return cb(new Error("File Size not allowed"), false)
    }

    cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: maxSize},
});

module.exports = upload;