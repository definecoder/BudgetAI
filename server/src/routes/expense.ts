import express from "express";
import {
  addExpense,
  chatExpense,
  deleteExpense,
  getAllExpensesOfEveryUser,
  getExpense,
  getExpenses,
} from "../controllers/expense";
import authChecker from "../middlewares/auth";

const router = express.Router();

router.route("/add").post(addExpense);
router.route("/all").get(getAllExpensesOfEveryUser);
router.route("/getAllExpenses/:userId").get(getExpenses);
router.route("/getExpense/:id").get(getExpense);
router.route("/delete/:id").delete(deleteExpense);

router.route("/chat").post(authChecker, chatExpense);

export default router;
