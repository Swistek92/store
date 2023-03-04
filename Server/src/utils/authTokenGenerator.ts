import jwt from "jsonwebtoken";

const AuthTokenGenerator = {
  Active: (payload: object) => {
    return jwt.sign(payload, process.env.ACTIVE_TOKEN_SECRET!, {
      expiresIn: "15m",
    });
  },
  Access: (payload: object) => {
    return jwt.sign(payload, process.env.ACESS_TOKEN_SECRET!, {
      expiresIn: "15m",
    });
  },
  Refresh: (payload: object) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: "30d",
    });
  },
};

export default AuthTokenGenerator;
