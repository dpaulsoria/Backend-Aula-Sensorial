const UserRepository = require("../repositories/userRepository");
const jwt = require("jsonwebtoken");
let refreshTokens = [];

// accessTokens
class AuthService {
  static generateAccessToken(user) {
    const payload = {
      id: user.ID,
      user: user.USER,
    };

    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_TIME || "15m",
    });
  }

  // refreshTokens
    static generateRefreshToken(user) {
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
}

module.exports = AuthService;