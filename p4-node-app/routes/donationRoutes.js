import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import {
  listRecord,
  createRecord,
  readRecord,
  updateRecord,
  deleteRecord,
} from "../controllers/donationController.js";
import { isAllowed } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/donation", listRecord);
router.post("/donation", upload.array("files", 10), isAllowed, createRecord);
router.get("/donation/:id", readRecord);
router.put("/donation/:id", updateRecord);
router.delete("/donation/:id", deleteRecord);

export default router;
