import express from "express";
const router = express.Router();

import { getLoggedInUser } from "../controllers/user";

router.route("/loggedin").get(getLoggedInUser);

export default router;
