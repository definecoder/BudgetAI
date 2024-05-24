import express from 'express';
import { changePassword, login, signup } from '../controllers/auth';

const router = express.Router();

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/change-password').post(changePassword);

export default router;