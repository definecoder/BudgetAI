import express from 'express';
import { addExpense } from '../controllers/expense';

const router = express.Router();

router.route('/add').post(addExpense);

export default router;