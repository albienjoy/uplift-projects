import express from "express";
import upload from "../middlewares/upload.js"
import {list, create, read, update, softDelete, hardDelete} from "../controllers/activityController.js";
import {isAllowed} from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/", upload.array("files", 10), isAllowed, create);
router.get("/", isAllowed, list);
router.get("/:id", isAllowed, read);
router.put("/:id", isAllowed, update); 
router.delete("/:id", isAllowed, hardDelete);
router.post("/:id", isAllowed, softDelete);


export default router;
