import express from 'express';
import { addExpense, getExpense, getExpenses } from '../controllers/expense';

const router = express.Router();

router.route('/add').post(addExpense);
router.route('/getAllExpenses').get(getExpenses);
router.route('/getExpense/:id').get(getExpense);

export default router;