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

router.get("/", listRecord);
router.post("/", upload.array("files", 10), isAllowed, createRecord);
router.get("/:id", readRecord);
router.put("/:id", updateRecord);
router.delete("/:id", deleteRecord);

export default router;
