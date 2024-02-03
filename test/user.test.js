require("dotenv").config();

const request = require("supertest");
const userRouter = require("../routes/user");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.use(express.json());
app.use("/user", userRouter);

let testUser = {
  user: "testuser",
  password: "testpassword",
  name: "Test",
  lastname: "User",
};

let id = "";
let testToken = "";

// Todas las pruebas van a fallar si hay un usuario llamado `testuser`

beforeAll(async () => {
  // Conexion con la BD
  db = process.env.DB_CON;
  mongoose
    .connect(db)
    .then(() => console.log("Conexión a MongoDB exitosa"))
    .catch(err => console.error("Error al conectar con MongoDB:", err));
});

describe("User API Tests", () => {
  it("should create a new user", async () => {
    const user = testUser;

    const response = await request(app).post("/user").send(user).expect(201);

    expect(response.body.message).toBe("User created");
    expect(response.body).toHaveProperty("user", testUser.user);
    expect(response.body).toHaveProperty("name", testUser.name);
    expect(response.body).toHaveProperty("lastname", testUser.lastname);
    testUser.id = response.body.id;
    id = response.body.id;
  });

  it("should successfully login a user", async () => {
    const userCredentials = {
      user: testUser.user, // Nombre de usuario válido
      password: testUser.password, // Contraseña válida
    };

    const response = await request(app)
      .post("/user/login")
      .send(userCredentials)
      .expect(200);

    expect(response.body.message).toBe("Login successful");
    expect(response.body).toHaveProperty("token");
    testToken = response.body.token;
  });

  it("should fail to login with invalid credentials", async () => {
    const invalidCredentials = {
      user: "invaliduser", // Nombre de usuario no válido
      password: "invalidpassword", // Contraseña no válida
    };

    const response = await request(app)
      .post("/user/login")
      .send(invalidCredentials)
      .expect(401);

    expect(response.body.message).toBe("Invalid credentials");
  });

  it("should fail to login with missing credentials", async () => {
    const missingCredentials = {}; // No se proporcionan credenciales

    const response = await request(app)
      .post("/user/login")
      .send(missingCredentials)
      .expect(401);

    expect(response.body.message).toBe("Invalid credentials");
  });

  it("should refresh token successfully", async () => {
    const refreshToken = testToken;

    const response = await request(app)
      .post("/user/refreshToken")
      .send({ token: refreshToken });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("accessToken");
    expect(response.body).toHaveProperty("refreshToken");
    testToken = response.body.refreshToken;
  });

  it("should fail with invalid refresh token", async () => {
    const invalidToken = "token_inválido";

    const response = await request(app)
      .post("/user/refreshToken")
      .send({ token: invalidToken });

    expect(response.statusCode).toBe(400);
  });

  it("should log out user successfully", async () => {
    const refreshToken = testToken;

    const response = await request(app)
      .delete("/user/logout")
      .send({ token: refreshToken });

    expect(response.statusCode).toBe(204);
  });

  it("should delete a user", async () => {
    const response = await request(app).delete(`/user/by-id/${id}`).expect(200);

    expect(response.body.message).toBe("User deleted successfully");
  });

  it("should create a new user", async () => {
    const user = testUser;

    const response = await request(app).post("/user").send(user).expect(201);

    expect(response.body.message).toBe("User created");
    expect(response.body).toHaveProperty("user", testUser.user);
    expect(response.body).toHaveProperty("name", testUser.name);
    expect(response.body).toHaveProperty("lastname", testUser.lastname);
    testUser.id = response.body.id;
    id = response.body.id;
  });

  it("should list all users without the hashed password", async () => {
    const response = await request(app).get("/user").expect(200);

    expect(response.body.message).toBe("Success");
    expect(response.body.users).toBeTruthy();
  });

  it("should list get the user by id", async () => {
    const response = await request(app).get(`/user/by-id/${id}`).expect(200);

    expect(response.body).toHaveProperty("user", testUser.user);
    expect(response.body).toHaveProperty("name", testUser.name);
    expect(response.body).toHaveProperty("lastname", testUser.lastname);
  });

  it("should list get the user by username", async () => {
    const response = await request(app)
      .get(`/user/search?username=${testUser.user}`)
      .expect(200);

    expect(response.body).toBeTruthy();
    expect(response.body[0]).toHaveProperty("user", testUser.user);
    expect(response.body[0]).toHaveProperty("name", testUser.name);
    expect(response.body[0]).toHaveProperty("lastname", testUser.lastname);
  });

  it("should change the user password", async () => {
    const response = await request(app)
      .patch(`/user/by-id/${id}/change-password`)
      .send({ newPassword: "newPassword1" })
      .expect(200);
    expect(response.body).toHaveProperty(
      "message",
      "Password updated successfully"
    );
  });

  it("should change the user password", async () => {
    const response = await request(app)
      .patch(`/user/by-username/${testUser.user}/change-password`)
      .send({ newPassword: "newPassword2" })
      .expect(200);

    expect(response.body).toHaveProperty(
      "message",
      "Password updated successfully"
    );
  });

  it("should delete a user", async () => {
    const response = await request(app)
      .delete(`/user/by-username/${testUser.user}`)
      .expect(200);

    expect(response.body.message).toBe("User deleted successfully");
  });
});

afterAll(async () => {
  // Cierra la conexión con la base de datos de prueba al final de las pruebas
  await mongoose.connection.close();
});
