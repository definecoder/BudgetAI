import express from 'express';
const router = express.Router();

import auth from './auth';
import expense from './expense';

router.use('/auth', auth);
router.use('/expense', expense);

export default router;