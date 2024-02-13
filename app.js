require("dotenv").config();

const mongoose = require("mongoose");
const createError = require("http-errors");
const express = require("express");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const corsOptions = require("./config/cors");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./config/swagger");

const indexRouter = require("./routes");
const port = process.env.PORT || 3000;

const app = express();

// Verifica y crea la carpeta public/media
const mediaPath = path.join(__dirname, "public", "media");
if (!fs.existsSync(mediaPath)) {
  fs.mkdirSync(mediaPath, { recursive: true });
  console.log("Carpeta public/media creada");
}

// // Función para subir un archivo al servidor
// async function uploadFile(filePath, fileName) {
//   const formData = new FormData();
//   formData.append('file', fs.createReadStream(filePath));

//   try {
//     const response = await axios.post('https://backend-aula-sensorial.onrender.com/file/uploadFile', formData, {
//       headers: {
//         ...formData.getHeaders(),
//       },
//     });
//     console.log(`El archivo ${fileName} fue subido con éxito:`, response.data);
//   } catch (error) {
//     console.error(`Error al subir el archivo ${fileName}:`, error.response?.data || error.message);
//   }
// }


// // Función para recorrer recursivamente los archivos en un directorio y subcarpetas
// async function traverseDirectory(directory) {
//   const filesAndFolders = await fs.promises.readdir(directory, { withFileTypes: true });

//   for (let fileOrFolder of filesAndFolders) {
//     const fullPath = path.join(directory, fileOrFolder.name);
//     if (fileOrFolder.isDirectory()) {
//       await traverseDirectory(fullPath); // Si es una carpeta, llama recursivamente
//     } else {
//       await uploadFile(fullPath, fileOrFolder.name); // Si es un archivo, lo sube
//     }
//   }
// }

// // Inicia la carga de archivos
// traverseDirectory(path.join(__dirname, 'upload'));

app.use(express.static("public/media"));
app.set("port", port);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// CORS
app.use(cors(corsOptions));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).json({ error: err.message });
});

// Iniciar el servidor Express
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Conexion con la BD
db = process.env.DB_CON;
mongoose
  .connect(db)
  .then(() => console.log("Conexión a MongoDB exitosa"))
  .catch(err => console.error("Error al conectar con MongoDB:", err));

module.exports = app;
