const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models").USER;

router.post("/login", async (req, res) => {
  try {
    if (!req.body.user || !req.body.password) {
      return res
        .status(401)
        .send({ message: 'fields "user" and "password" is required' });
    }

    const user = await userModel.findOne({
      where: {
        user: req.body.user,
      },
    });

    if (!user) {
      res.status(404).send("User does not exist!");
    } else {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.PASSWORD
      );

      if (isPasswordValid) {
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        res.json({ accessToken:accessToken, refreshToken:refreshToken });
      } else {
        res.status(401).send("Password Incorrect!");
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal Server Error",
      request: req.body,
    });
  }
});

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
    const existingUser = await userModel.findOne({
      where: { user: req.body.user },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash de la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Crea un nuevo usuario en la base de datos
    const newUser = await userModel.create({
      USER: req.body.user,
      PASSWORD: hashedPassword,
      NAME: req.body.name,
      LASTNAME: req.body.lastname,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// accessTokens
function generateAccessToken(user) {
  const payload = {
    id: user.ID,
    user: user.USER,
  };

  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}
// refreshTokens
let refreshTokens = [];
function generateRefreshToken(user) {
  const payload = {
    id: user.ID,
    user: user.USER,
  };

  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "20m",
  });
  refreshTokens.push(refreshToken);
  return refreshToken;
}

module.exports = router;
