/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 */

const express = require("express");
const router = express.Router();
const UserRepository = require("../repositories/userRepository");
const AuthService = require("../services/authService");
const bcrypt = require("bcrypt");

/**
 * @swagger
 * /auth/login:
 *    post:
 *      summary: Authenticate user and generate tokens
 *      tags: [Authentication]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user:
 *                  type: string
 *                  description: Username
 *                password:
 *                  type: string
 *                  description: User password
 *      responses:
 *        '200':
 *          description: Successful login
 *        '401':
 *          description: Invalid credentials
 *        '404':
 *          description: User does not exist
 *        '500':
 *          description: Internal Server Error
 */
router.post("/login", async (req, res) => {
  try {
    if (!req.body.user || !req.body.password) {
      return res
        .status(401)
        .send({ message: 'fields "user" and "password" is required' });
    }

    const user = await UserRepository.getByUser(req.body.user);

    if (!user) {
      res.status(404).send("User does not exist!");
    } else {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.PASSWORD
      );

      if (isPasswordValid) {
        const accessToken = AuthService.generateAccessToken(user);
        const refreshToken = AuthService.generateRefreshToken(user);
        res.json({
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      } else {
        res.status(401).send({
          msg: "Password Incorrect",
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});

/**
 * @swagger
 * /auth/register:
 *    post:
 *      summary: Register a new user
 *      tags: [Authentication]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user:
 *                  type: string
 *                  description: Username
 *                password:
 *                  type: string
 *                  description: User password
 *                name:
 *                  type: string
 *                  description: User's first name
 *                lastname:
 *                  type: string
 *                  description: User's last name
 *      responses:
 *        '201':
 *          description: User registered successfully
 *        '400':
 *          description: All fields are required or User already exists
 *        '500':
 *          description: Internal Server Error
 */
router.post("/register", async (req, res) => {
  try {
    if (
      !req.body.user ||
      !req.body.password ||
      !req.body.name ||
      !req.body.lastname
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Verifica si el usuario ya existe en la base de datos
    const existingUser = await UserRepository.getByUser(req.body.user);

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    data = {
      USER: req.body.user,
      PASSWORD: req.body.password,
      NAME: req.body.name,
      LASTNAME: req.body.lastname,
    };

    newUser = await UserRepository.create(data);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//REFRESH TOKEN API
router.post("/refreshToken", (req, res) => {
  if (!refreshTokens.includes(req.body.token))
    res.status(400).send("Refresh Token Invalid");
  refreshTokens = refreshTokens.filter((c) => c != req.body.token);
  //remove the old refreshToken from the refreshTokens list
  const accessToken = generateAccessToken({ user: req.body.name });
  const refreshToken = generateRefreshToken({ user: req.body.name });
  //generate new accessToken and refreshTokens
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

router.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((c) => c != req.body.token);
  res.status(204).send({
    msg: "Logged out!",
  });
});



module.exports = router;
