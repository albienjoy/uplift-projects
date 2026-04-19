import express from "express";
import {
  listRecord,
  createRecord,
  readRecord,
  updateRecord,
  deleteRecord,
} from "../controllers/addressController.js";
import { isAllowed, isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/address", listRecord);
router.post("/address", isAllowed, createRecord);
router.get("/address/:id", isAllowed, readRecord);
router.put("/address/:id", isAllowed, updateRecord);
router.delete("/address/:id", isAllowed, deleteRecord);

export default router;
