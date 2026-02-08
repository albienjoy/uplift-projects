import express from "express";
import {
  listRecord,
  createRecord,
  readRecord,
  updateRecord,
  deleteRecord,
} from "../controllers/addressController.js";

const router = express.Router();

router.get("/", listRecord);
router.post("/", createRecord);
router.get("/:id", readRecord);
router.put("/:id", updateRecord);
router.delete("/:id", deleteRecord);

export default router;
