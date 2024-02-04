require("dotenv").config();

const request = require("supertest");
const fileRouter = require("../routes/file");
const mongoose = require("mongoose");
const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());
app.use("/file", fileRouter);

let file;

describe("Endpoints de Multimedia", () => {
  it("debe cargar un archivo y devolver un mensaje de éxito", async () => {
    const response = await request(app)
      .post("/file/uploadFile")
      .attach("file", "test-files/test.png"); // Adjunta un archivo de prueba (ajusta la ruta y el nombre del archivo según tu caso)

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("File uploaded successfully");
  });

  it("debe listar archivos multimedia y devolver una lista paginada", async () => {
    const response = await request(app).get(
      "/file/listMedia?page=1&pageSize=10"
    ); // Ajusta los parámetros de consulta según tu caso

    expect(response.status).toBe(200);
    expect(response.body.page).toBeDefined();
    expect(response.body.pageSize).toBeDefined();
    expect(response.body.totalPages).toBeDefined();
    expect(response.body.totalFiles).toBeDefined();
    expect(response.body.files).toBeDefined();
    file = response.body.files[0];
  });

  it("debe obtener un archivo por nombre y devolverlo como respuesta", async () => {
    const response = await request(app).get(`/file/getFileByName/${file}`); // Ajusta el nombre del archivo según tus pruebas

    expect(response.status).toBe(200);
    expect(response.type).toBe("image/png"); // Ajusta el tipo de archivo según tu caso
  });

  it("debe devolver un error 404 si el archivo no existe", async () => {
    const response = await request(app).get(
      "/file/getFileByName/archivo_no_existente.jpg"
    ); // Nombre de archivo que no existe
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Archivo no encontrado");
  });

  it("debe eliminar todos los archivos y devolver un mensaje de éxito", async () => {
    const response = await request(app).delete("/file/deleteAllFiles");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      "Todos los archivos eliminados con éxito"
    );
  });

  // it("debe devolver un error 500 si ocurre un error al eliminar archivos", async () => {
  //   // Simula un error al eliminar archivos (por ejemplo, carpeta inaccesible)
  //   jest.spyOn(fs, "readdir").mockImplementation((path, callback) => {
  //     callback(new Error("Error al eliminar archivos"));
  //   });

  //   const response = await request(app).delete("/file/deleteAllFiles");

  //   expect(response.status).toBe(500);
  //   expect(response.body.message).toBe("Error al listar archivos");
  // });
});
