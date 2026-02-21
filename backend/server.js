require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const helmet = require("helmet");

const connectDB = require("./config/db.js");
const { authRouter } = require("./routes/auth.js");
const { userRouter } = require("./routes/user.js");
const { projectRouter } = require("./routes/project.js");

const app = express();

app.set("trust proxy", 1);

app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());

// rate limiter global

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: {
    message: "Too many requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// rate limiter auth routes

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // only 5 login attempts
  message: { message: "Too many login attempts" },
});

app.get("/", (req, res) => {
  res.send("backend running");
});

// router points

app.use("/api/auth", authLimiter, authRouter);
app.use("/api/user", userRouter);
app.use("/api/project", projectRouter);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () =>
      console.log(`server running on http://127.0.0.1:${PORT}`),
    );
  } catch (err) {
    console.error("Failed to start the server", err);
  }
};

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal Server Error",
  });
});

startServer();
