import { Request, Response } from "express";
import User from "../models/user";
import { generateToken } from "./token";
import errorWrapper from "../middlewares/errorWrapper";

const secret = process.env.JWT_SECRET;

export const signup = errorWrapper(
  async (req: Request, res: Response) => {
    console.log(req.body);
    const { name, email, password } = req.body;
    const user = new User({
      name,
      email,
      password,
    });
    const data = await user.save();
    const token = generateToken({ id: data._id, email }, "6h");
    const responseData = {
      user,
      token,
    };
    res.send(responseData);
  },
  { statusCode: 400, message: "Signup failed" }
);

export const login = errorWrapper(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(404).send("Login Failed");
    }
    const token = generateToken({ id: user._id, email }, "1h");
    const responseData = {
      user,
      token,
    };
    res.send(responseData);
  },
  { statusCode: 400, message: "Login failed" }
);

export const changePassword = (req: Request, res: Response) => {
  res.send("Change password route");
};
