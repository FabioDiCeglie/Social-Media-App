import { Router } from "express";

import { login } from "../controllers/auth.ts";

const router = Router();

router.post("/login", login);

export default router;
