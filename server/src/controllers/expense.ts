import { Request, Response } from "express";
import Expense from "../models/expense";

export const addExpense = async (req: Request, res: Response) => {
    
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

    res.send({data, msg: "Expense added successfully"});
    
};

export const getExpenses = async (req: Request, res: Response) => {
    
    const { userId } = req.body;

    const data = await Expense.find({ user: userId });

    res.send(data);
};