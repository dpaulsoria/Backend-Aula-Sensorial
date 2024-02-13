/**
 * @swagger
 * tags:
 *   name: File Management
 *   description: API endpoints for managing file uploads and retrieval
 */
const express = require("express");
const upload = require("../config/file-upload-config"); // Importa la configuración de multer
const path = require("path");
const fs = require("fs");

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json({ message: "Hola" });
});
/**
 * @swagger
 * /file/uploadFile:
 *   post:
 *     summary: Subir archivos multimedia
 *     description: Sube hasta 20 archivos multimedia al servidor.
 *     tags:
 *       - File Management
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: header
 *         name: Content-Type
 *         type: string
 *         required: true
 *         default: multipart/form-data
 *         description: Tipo de contenido requerido para la carga de archivos.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Archivos multimedia a subir. Máximo 20 archivos.
 *             required:
 *               - file
 *     responses:
 *       '200':
 *         description: Archivos cargados con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *       '400':
 *         description: Archivo(s) no permitido(s) o tamaño no permitido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *       '500':
 *         description: Error interno del servidor al intentar cargar los archivos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 */

router.post("/uploadFile", upload.array("file", 20), (req, res) => {
  if (req.files) {
    req.files.forEach(file => {
      const sourcePath = file.path;
      const destinationPath = path.join(
        __dirname,
        "../public/media",
        file.filename
      );

      fs.rename(sourcePath, destinationPath, err => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ message: "Error al guardar el archivo" });
        }
      });
    });

    return res.status(200).json({ message: "Files uploaded successfully" });
  } else {
    return res.status(400).json({ message: "No files were uploaded." });
  }
});

/**
 * @swagger
 * /file/listMedia:
 *   get:
 *     summary: Listar archivos multimedia con paginación
 *     description: Lista archivos multimedia de la carpeta 'public/media' con paginación.
 *     tags:
 *       - File Management
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página a consultar (por defecto 1).
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           description: Tamaño de página (por defecto 10).
 *     responses:
 *       '200':
 *         description: Lista de archivos multimedia paginada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                   description: Número de página actual.
 *                 pageSize:
 *                   type: integer
 *                   description: Tamaño de página.
 *                 totalPages:
 *                   type: integer
 *                   description: Total de páginas disponibles.
 *                 totalFiles:
 *                   type: integer
 *                   description: Total de archivos multimedia.
 *                 files:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: Lista de nombres de archivos multimedia en la página actual.
 *       '500':
 *         description: Error interno del servidor al intentar listar archivos.
 */

router.get("/listMedia", (req, res) => {
  const mediaPath = path.join(__dirname, "../public/media"); // Ruta a la carpeta de archivos multimedia
  const page = parseInt(req.query.page) || 1; // Página actual (por defecto 1)
  const pageSize = parseInt(req.query.pageSize) || 10; // Tamaño de página (por defecto 10)

  fs.readdir(mediaPath, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error al listar archivos" });
    }

    const totalFiles = files.length;
    const totalPages = Math.ceil(totalFiles / pageSize);

    // Calcula el rango de archivos para la página actual
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Obtiene los archivos para la página actual
    const filesForPage = files.slice(startIndex, endIndex);

    res.status(200).json({
      page,
      pageSize,
      totalPages,
      totalFiles,
      files: filesForPage,
    });
  });
});

/**
 * @swagger
 * /file/deleteAllFiles:
 *   delete:
 *     summary: Eliminar todos los archivos multimedia
 *     description: Elimina todos los archivos multimedia de la carpeta 'public/media'.
 *     tags:
 *       - File Management
 *     responses:
 *       '200':
 *         description: Todos los archivos multimedia se eliminaron con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *       '500':
 *         description: Error interno del servidor al intentar eliminar archivos.
 */

router.delete('/deleteAllFiles', (req, res) => {
  const mediaPath = path.join(__dirname, '../public/media');

  fs.readdir(mediaPath, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error al listar archivos' });
    }

    // Elimina cada archivo encontrado
    files.forEach((file) => {
      const filePath = path.join(mediaPath, file);
      fs.unlinkSync(filePath);
    });

    res.status(200).json({ message: 'Todos los archivos eliminados con éxito' });
  });
});

/**
 * @swagger
 * /file/getFileByName/{filename}:
 *   get:
 *     summary: Obtener un archivo multimedia por nombre
 *     description: Obtiene un archivo multimedia de la carpeta 'public/media' por su nombre.
 *     tags:
 *       - File Management
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del archivo multimedia a obtener.
 *     responses:
 *       '200':
 *         description: Archivo multimedia obtenido con éxito.
 *       '404':
 *         description: Archivo no encontrado.
 */

router.get("/getFileByName/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "../public/media", filename);

  // Verifica si el archivo existe y lo envía como respuesta
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ message: "Archivo no encontrado" });
  }
});


module.exports = router;
