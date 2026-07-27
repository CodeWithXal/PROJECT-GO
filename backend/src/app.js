import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import healthRouter from "./routes/health.routes.js";
// import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use("/api/v1/health", healthRouter);
//app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);


// middleware will go here 

// routes will go here

export default  app;