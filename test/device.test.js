require("dotenv").config();

const request = require("supertest");
const deviceRouter = require("../routes/device");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.use(express.json());
app.use("/device", deviceRouter);

const speakerIdentifier = "speaker01";
const screenIdentifier = "screen01";
const lightIdentifier = "light01";
let speakerId = "";
let screenId = "";
let lightId = "";

beforeAll(async () => {
  // Conexion con la BD
  db = process.env.DB_CON;
  mongoose
    .connect(db)
    .then(() => console.log("Conexión a MongoDB exitosa"))
    .catch(err => console.error("Error al conectar con MongoDB:", err));
});

describe("Device API", () => {
  // Prueba para POST /device
  it("POST /device - should create a new device", async () => {
    // Asegúrate de que este objeto coincida con tu modelo
    const newDevice = {
      type: "speaker",
      isActive: true,
      identifier: speakerIdentifier,
      details: { song: "song.mp3", volumeLevel: 5 },
    };

    const response = await request(app).post("/device").send(newDevice);
    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty("_id");
    speakerId = response.body._id;
    expect(response.body).toHaveProperty("identifier", speakerIdentifier);
  });

  it("should create a new screen device", async () => {
    const newScreen = {
      type: "screen",
      isActive: true,
      identifier: screenIdentifier,
      details: {
        video: "video001.mp4",
      },
    };

    const response = await request(app).post("/device").send(newScreen);
    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty("_id");
    screenId = response.body._id;
    expect(response.body).toHaveProperty("identifier", screenIdentifier);
  });

  it("should create a new light device", async () => {
    const newLight = {
      type: "light",
      isActive: true,
      identifier: lightIdentifier,
      details: {
        color: "red",
        intensity: 50,
      },
    };

    const response = await request(app).post("/device").send(newLight);
    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty("_id");
    lightId = response.body._id;
    expect(response.body).toHaveProperty("identifier", lightIdentifier);
  });

  // Prueba para GIdET /device
  it("GET /device - should return all devices", async () => {
    const response = await request(app).get("/device");
    expect(response.statusCode).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  // Prueba para GET /device/:id
  it("GET /device/:id - should return a device by id", async () => {
    const deviceId = speakerId; // Usa un ID real para la prueba
    const response = await request(app).get(`/device/${deviceId}`);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("_id", deviceId);
    expect(response.body).toHaveProperty("identifier", speakerIdentifier);
  });

  // Prueba para GET /device/identifier/:identifier
  it("GET /device/identifier/:identifier - should return a device by identifier", async () => {
    const identifier = speakerIdentifier; // Usa un identificador real para la prueba
    const response = await request(app).get(`/device/identifier/${identifier}`);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("identifier", identifier);
  });

  // Prueba para PATCH /device/:id/details
  it("PATCH /device/:id/details - should update device details", async () => {
    const deviceId = speakerId; // Usa un ID real para la prueba
    const updates = { song: "newSong.mp3", volumeLevel: 7 };

    const response = await request(app)
      .patch(`/device/${deviceId}/details`)
      .send(updates);
    expect(response.statusCode).toEqual(200);
  });

  // Prueba para PATCH /device/:id/details
  it("PATCH /device/:id/details - should update device details", async () => {
    const deviceId = lightId; // Usa un ID real para la prueba
    const updates = { color: "red", intensity: 50 };

    const response = await request(app)
      .patch(`/device/${deviceId}/details`)
      .send(updates);
    expect(response.statusCode).toEqual(200);
  });

  // Prueba para PATCH /device/:id/details
  it("PATCH /device/:id/details - should update device details", async () => {
    const deviceId = screenId; // Usa un ID real para la prueba
    const updates = { video: "newVideo.mp4" };

    const response = await request(app)
      .patch(`/device/${deviceId}/details`)
      .send(updates);
    expect(response.statusCode).toEqual(200);
  });

  // Prueba para PATCH /device/:id/details
  it("PATCH /device/identifier/:id/details - should update device details", async () => {
    const deviceId = speakerIdentifier; // Usa un ID real para la prueba
    const updates = { song: "newSong.mp3", volumeLevel: 7 };

    const response = await request(app)
      .patch(`/device/identifier/${deviceId}/details`)
      .send(updates);
    expect(response.statusCode).toEqual(200);
  });

  // Prueba para PATCH /device/:id/details
  it("PATCH /device/identifier/:id/details - should update device details", async () => {
    const deviceId = lightIdentifier; // Usa un ID real para la prueba
    const updates = { color: "red", intensity: 50 };

    const response = await request(app)
      .patch(`/device/identifier/${deviceId}/details`)
      .send(updates);
    expect(response.statusCode).toEqual(200);
  });

  // Prueba para PATCH /device/:id/details
  it("PATCH /device/identifier/:id/details - should update device details", async () => {
    const deviceId = screenIdentifier; // Usa un ID real para la prueba
    const updates = { video: "newVideo.mp4" };

    const response = await request(app)
      .patch(`/device/identifier/${deviceId}/details`)
      .send(updates);
    expect(response.statusCode).toEqual(200);
  });

  // Prueba para DELETE /device/:id
  it("DELETE /device/:id - should delete a device by id", async () => {
    const deviceId = speakerId; // Usa un ID real para la prueba
    const response = await request(app).delete(`/device/${deviceId}`);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty(
      "message",
      "Device deleted successfully"
    );
  });

  it("POST /device - should create a new device AGAIN", async () => {
    // Asegúrate de que este objeto coincida con tu modelo
    const newDevice = {
      type: "speaker",
      isActive: true,
      identifier: speakerIdentifier,
      details: { song: "song.mp3", volumeLevel: 5 },
    };

    const response = await request(app).post("/device").send(newDevice);
    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty("_id");
    speakerId = response.body._id;
    expect(response.body).toHaveProperty("identifier", speakerIdentifier);
  });

  // Prueba para DELETE /device/identifier/:identifier
  it("DELETE /device/identifier/:identifier - should delete a device by identifier", async () => {
    const identifier = speakerIdentifier; // Usa un identificador real para la prueba
    const response = await request(app).delete(
      `/device/identifier/${identifier}`
    );
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty(
      "message",
      "Device deleted successfully"
    );
  });
  // Prueba para DELETE /device/identifier/:identifier
  it("DELETE /device/identifier/:identifier - should delete a device by identifier", async () => {
    const identifier = lightIdentifier; // Usa un identificador real para la prueba
    const response = await request(app).delete(
      `/device/identifier/${identifier}`
    );
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty(
      "message",
      "Device deleted successfully"
    );
  });
  // Prueba para DELETE /device/identifier/:identifier
  it("DELETE /device/identifier/:identifier - should delete a device by identifier", async () => {
    const identifier = screenIdentifier; // Usa un identificador real para la prueba
    const response = await request(app).delete(
      `/device/identifier/${identifier}`
    );
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty(
      "message",
      "Device deleted successfully"
    );
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
