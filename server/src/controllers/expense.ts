import { Request, Response } from "express";
import Expense from "../models/expense";
import errorWrapper from "../middlewares/ErrorWrapper";

export const addExpense = errorWrapper(
  async (req: Request, res: Response) => {
    console.log(req.body);

    const { amount, description, category, date, userId } = req.body;

    // Add the expense to the database
    const expense = new Expense({
      amount,
      description,
      category,
      date,
      user: userId,
    });

    const data = await expense.save();

    res.send({ data, msg: "Expense added successfully" });
  },
  { statusCode: 400, message: "Expense failed" }
);

export const getExpenses = errorWrapper(
  async (req: Request, res: Response) => {
    const { userId } = req.body;

    const data = await Expense.find({ user: userId });

    res.send(data);
  },
  { statusCode: 400, message: "Get expenses failed" }
);

export const getExpense = errorWrapper(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const data = await Expense.findById(id);

    res.send(data);
  },
  { statusCode: 400, message: "Get expense failed" }
);
