import express from "express";
import {
  addExpense,
  deleteExpense,
  getAllExpensesOfEveryUser,
  getExpense,
  getExpenses,
} from "../controllers/expense";

const router = express.Router();

router.route("/add").post(addExpense);
router.route("/all").get(getAllExpensesOfEveryUser);
router.route("/getAllExpenses/:userId").get(getExpenses);
router.route("/getExpense/:id").get(getExpense);
router.route("/delete/:id").delete(deleteExpense);

export default router;
