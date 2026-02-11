import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import {
  listRecord,
  createRecord,
  readRecord,
  updateRecord,
  hardDeleteRecord,
  softDeleteRecord,
} from "../controllers/donationController.js";
import { isAllowed, isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/donation", listRecord);
router.post("/donation", isAuthenticated, createRecord);
router.get("/donation/:id", readRecord);
router.put("/donation/:id", updateRecord);
router.delete("/donation/:id", hardDeleteRecord);
router.post("/donation/:id", softDeleteRecord);

export default router;
