import express from 'express';
import { addExpense, getExpenses } from '../controllers/expense';

const router = express.Router();

router.route('/add').post(addExpense);
router.route('/getAllExpenses').get(getExpenses);

export default router;