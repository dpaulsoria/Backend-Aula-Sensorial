const express = require("express");
const router = express.Router();
const upload = require("../config/file-upload-config");
const path = require("path")

router.post("/upload", upload.single("file"), (req, res) => {
    // Logic to manage the uploaded file
    if (!req.file) {
        return res.status(400).send("Theres no file");
    }

    const destPath = path.join(__dirname, "..", "uploads", req.file.originalname);
    fs.rename(req.file.path, destPath, (err) => {
        if (err) {
            return res.status(500).send("Error saving the file");
        }

        res.send("File Uploaded and Saved successfully")
    })
})

module.exports = router;