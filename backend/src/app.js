import express from "express";
import healthRouter from "./routes/health.routes.js"
import userRouter from "./routes/user.routes.js"


const app = express();


app.use(express.json());

app.use("/api/v1/health", healthRouter);
app.use("/api/v1/users", userRouter);


// middleware will go here 

// routes will go here

export default  app;