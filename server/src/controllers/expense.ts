import { Request, Response } from "express";
import Expense from "../models/expense";
import errorWrapper from "../middlewares/ErrorWrapper";
import { getExpenseInfo } from "../services/addExpenseService/addBudget";
import OpenAI from "openai";

export const addExpense = errorWrapper(
  async (req: Request, res: Response) => {
    const { text, userId } = req.body;

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Add the expense to the database

    let expenseData = await getExpenseInfo(text, openai);

    expenseData = expenseData.replace(/,\s*([\]}])/g, "$1");
    const expenseInfo = JSON.parse(expenseData);

    const expense = new Expense({
      ...expenseInfo,
      user: userId,
    });

    const data = await expense.save();

    res.send({ data, msg: "Expense added successfully" });
  },
  { statusCode: 400, message: "Expense failed" }
);

export const getExpenses = errorWrapper(
  async (req: Request, res: Response) => {
    const { userId } = req.params;

    console.log(userId);

    const data = await Expense.find({ user: userId });

    console.log(data);

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

export const getAllExpensesOfEveryUser = errorWrapper(
  async (req: Request, res: Response) => {
    const data = await Expense.find();

    res.send(data);
  },
  { statusCode: 400, message: "Get all expenses failed" }
);
// Path: server/src/controllers/user.ts
