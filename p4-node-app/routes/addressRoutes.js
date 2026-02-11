import express from "express";
import {
  listRecord,
  createRecord,
  readRecord,
  updateRecord,
  deleteRecord,
} from "../controllers/addressController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/address", listRecord);
router.post("/address", isAuthenticated, createRecord);
router.get("/address/:id", isAuthenticated, readRecord);
router.put("/address/:id", isAuthenticated, updateRecord);
router.delete("/address/:id", isAuthenticated, deleteRecord);

export default router;
