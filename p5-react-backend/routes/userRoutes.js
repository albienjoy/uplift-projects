import express from "express";
import {register, login, logout, session} from "../controllers/userController.js"
import {isAuthenticated, isAllowed} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", isAuthenticated, login);
router.post("/logout", logout);
router.get("/session", session);

router.post("/dashboard", isAllowed, (req,res) => {
    res.json({message: "welcome to the dashboard"})
});

export default router;