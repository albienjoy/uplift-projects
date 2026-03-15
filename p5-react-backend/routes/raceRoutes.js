import express from "express";
import {list, create, read} from "../controllers/raceController.js";
import {isAllowed} from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/register", create);
router.get("/", list);
router.get("/:id", isAllowed, read);

export default router;
