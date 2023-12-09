const express = require("express");
const router = express.Router();
const upload = require("../config/file-upload-config");
const path = require("path");
const fs = require("fs");
const fileSchema = require("../schemas/file"); // Asegúrate de poner la ruta correcta
const {
  saveFileDetails,
  cleanDirectory,
} = require("../repositories/fileRepository");

router.get("/", async (req, res) => {
  res.send("Hello File");
});

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // Auth logic
    if (!req.file) {
      return res.status(400).send("No file provided");
    }

    const validationResult = fileSchema.validate({
      name: req.file.originalname,
      size: req.file.size,
      mimeType: req.file.mimetype,
      //   userId: req.userId, // Asegúrate de que este valor esté disponible
    });

    console.log("file", req.file);

    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
    }

    const destPath = path.join(
      __dirname,
      "..",
      "uploads",
      req.file.originalname
    );
    await fs.promises.rename(req.file.path, destPath);

    const fileDetails = {
      name: req.file.originalname,
      path: destPath,
      size: req.file.size,
      //   userId: req.userId,
    };

    saveFileDetails(fileDetails)
      .then(() => {
        res.send("File uploaded and saved successfully");
      })

      .catch((saveError) => {
        console.error("Error saving the file details");
        res.status(500).send("Error saving file details");
      });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing file");
  }
});

router.delete("/clean-uploads", (req, res) => {
  try {
    // Auth logic

    const uploadsDir = path.join(__dirname, "..", "uploads");
    cleanDirectory(uploadsDir);

    res.send("Directory cleaned");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error cleaning uploads directory");
  }
});

module.exports = router;
