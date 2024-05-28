import express from "express";
const router = express.Router();

import { getAllUsers, getLoggedInUser } from "../controllers/user";

router.route("/loggedin").get(getLoggedInUser);
router.route("/all").get(getAllUsers);

export default router;
