import express from "express";
import auth from "../../utils/auth.js";
import toss from "./game-toss.js";
import getHistory from "./game-history.js";

const router = express.Router();

router.post("/toss", auth, toss);
router.get('/getHistory',auth, getHistory);  

export default router;