import jwt from "jsonwebtoken";
export const generateActiveToken = (payload: object) => {
  return jwt.sign(payload, process.env.ACTIVE_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
};

export const generateAcessToken = (payload: object) => {
  return jwt.sign(payload, process.env.ACESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "30d",
  });
};
