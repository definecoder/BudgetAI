import { Request, Response, NextFunction } from "express";
import errorWrapper from "./errorWrapper";
import CustomError from "../types/CustomError";
import { getToken, verifyToken } from "../controllers/token";
import { JwtPayload } from "jsonwebtoken";

const authChecker = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = getToken(req);
    if (!token) {
      throw new CustomError("Unauthorized", 401);
    }
    const decoded = verifyToken(token);
    console.log(decoded);
    req.user = decoded as JwtPayload;
    next();
  }
);

export default authChecker;
