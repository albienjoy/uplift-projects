import express from "express";
import dotEnv from "dotenv";
import session from "express-session";
import mongoStore from "connect-mongo";
import cors from "cors";
import helmet from "helmet";
import limiterConfig from "./configs/limiter.js";
import connectDB from "./configs/db.js";

import userRoutes from "./routes/userRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import addressRoutes from "./routes/addressRoutes.js"

dotEnv.config();
connectDB();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(limiterConfig);
app.use(helmet());
app.use(cors());
app.use(express.json()); //updated this
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60,
        },
        rolling: true,
        store: mongoStore.create({
            mongoUrl: process.env.MONGO_URI,
        })
    })
);

app.get("/", (req,res) => {
    res.end("Hello world")
});
app.use("/api", userRoutes);
app.use("/api", donationRoutes);
app.use("/api", addressRoutes);

app.listen(PORT, () => {console.log(`App is running at http://localhost:${PORT}`)});
