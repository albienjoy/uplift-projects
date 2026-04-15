import express from "express";
import dotEnv from "dotenv";
import session from "express-session";
import mongoStore from "connect-mongo";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./configs/db.js";
import userRoute from "./routes/userRoutes.js";
import activityRoute from "./routes/activityRoutes.js";
import raceRoute from "./routes/raceRoutes.js";


dotEnv.config();

const PORT = process.env.PORT || 3000;
const app = express();
const frontend = process.env.FRONTEND || 'http://localhost:5173';

const corsOptions = {
    origin: function (origin, callback) {
    const allowedOrigins =  [frontend];

if (!origin) return callback(null, true);

if (allowedOrigins.includes(origin)) {
    callback(null, true);

}else {
    callback(new Error("not allowed by Cors"));
}
},

credentials: true,
methods: ['GET', 'POST', 'PUT', 'DELETE'],
allowedHeaders: ['Content-Type', 'Authorization'],
maxAge: 86400
};


app.use(helmet());
app.use(cors(corsOptions))

//commented out at Mar 13 -- api call
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true
//   }));

app.use(express.json());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000*60*60
        },
        rolling: true,
        store: mongoStore.create({
            mongoUrl: process.env.MONGO_URI,
        })
    })
);

app.use("/api/auth", userRoute);
app.use("/api/post", activityRoute);
app.use("/api/race", raceRoute);



connectDB();

app.listen(PORT, () => {console.log(`App is running at http://localhost:${PORT}`)});