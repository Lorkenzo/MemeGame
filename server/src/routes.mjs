import express from 'express';
import matchRoutes from "./routes/matchRoutes.mjs"
import memeRoutes from "./routes/memeRoutes.mjs"
import authRoutes from "./routes/authRoutes.mjs"

const router = express.Router();

router.use("/sessions",authRoutes);
router.use("/memes",memeRoutes);
router.use("/matches",matchRoutes);

export default router;