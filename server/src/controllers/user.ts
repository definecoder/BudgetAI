import { Payload } from "./../types/Payload";
import { Request, Response } from "express";
import { getToken, verifyToken } from "./token";

import User from "../models/user";
import errorWrapper from "../middlewares/errorWrapper";

const getLoggedInUser = errorWrapper(
  async (req: Request, res: Response) => {
    // get the token

    const token: string = getToken(req) as string;

    const { id } = verifyToken(token) as Payload;

    const userInfo = await User.findById(id);

    res.send(userInfo);
  },
  { statusCode: 400, message: "Error getting logged in user" }
);

const getAllUsers = errorWrapper(
  async (req: Request, res: Response) => {
    const users = await User.find();
    res.send(users);
  },
  { statusCode: 400, message: "Error getting all users" }
);

export { getLoggedInUser, getAllUsers };
