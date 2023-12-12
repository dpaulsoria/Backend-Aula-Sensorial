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

router.get("/list", async (req, res) => {
  try {
    // Auth logic

    const uploadsDir = path.join(__dirname, "..", "uploads");
    const files = await fs.promises.readdir(uploadsDir);
    const count = files.length;
    res.json({ files, count });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error reading uploads directory");
  }
});

router.get("/byName/:filename", async (req, res) => {
  try {
    // Auth logic

    const filename = req.params.filename;
    // Validación adicional aquí para la seguridad del nombre del archivo
    const filePath = path.join(__dirname, "..", "uploads", filename);

    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).send("File not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving file");
  }
});

router.post("/", upload.single("file"), async (req, res) => {
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

router.delete("/", (req, res) => {
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
