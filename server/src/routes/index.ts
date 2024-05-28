import express from "express";
const router = express.Router();

import auth from "./auth";
import expense from "./expense";
import user from "./user";

router.use("/auth", auth);
router.use("/expense", expense);
router.use("/users/", user);

export default router;
