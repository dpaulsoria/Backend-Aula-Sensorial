const request = require("supertest");
const express = require("express");
const path = require("path");
const app = express();

// Aquí asumimos que tu router se exporta desde un archivo llamado 'fileRoutes.js'
const fileRouter = require("../routes/fileRoutes"); // Asegúrate de que la ruta sea correcta

app.use("/file", fileRouter);

// Al principio de tu archivo de prueba
jest.mock('../repositories/fileRepository', () => ({
  saveFileDetails: jest.fn().mockResolvedValue({ /* objeto de respuesta simulado */ }),
  cleanDirectory: jest.fn(), // Mockea esta función si también la usas
  // Cualquier otra función que necesites mockear
}));

describe("File Router", () => {
  describe("POST /file/", () => {
    // Para pruebas de carga de archivos, podrías necesitar mockear multer o la lógica de almacenamiento
    it("should upload a file", async () => {
      const res = await request(app)
        .post("/file/")
        .attach("file", path.join(__dirname, "test.png"));

      expect(res.statusCode).toEqual(200);
      expect(res.text).toEqual("File uploaded and saved successfully");
    });
  });

  describe("GET /file/list", () => {
    it("should list all files", async () => {
      const res = await request(app).get("/file/list");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("files");
      expect(res.body).toHaveProperty("count");
    });
  });

  describe("GET /file/byName/:filename", () => {
    it("should return a file by name", async () => {
      const res = await request(app).get("/file/byName/test.png");
      expect(res.statusCode).toEqual(200);
      // Otras aserciones específicas pueden depender del contenido del archivo y del tipo de respuesta
    });

    it("should return 404 if file does not exist", async () => {
      const res = await request(app).get("/file/byName/nonexistentfile.txt");
      expect(res.statusCode).toEqual(404);
    });
  });

  describe("DELETE /file/", () => {
    it("should clean the directory", async () => {
      const res = await request(app).delete("/file/");
      expect(res.statusCode).toEqual(200);
      expect(res.text).toEqual("Directory cleaned");
    });
  });
});
