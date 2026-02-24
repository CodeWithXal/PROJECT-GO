require("dotenv").config();
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_AUTH_SECRET;
const { userModel } = require("../models/users");

// sign up function

async function signup(req, res) {
  // fetching data

  const email = req.body.email;
  const password = req.body.password;

  // input validation

  const requireBody = z.object({
    
    email: z.string().email("invalid email format"),
    password: z
      .string()
      .min(8, "The password must be atleast 8 characters")
      .max(25, "Thhe passwoed must be atmost 25 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character",
      ),
  });

  const parseData = requireBody.safeParse(req.body);

  if (!parseData.success) {
    const errMsg = parseData.error.issues.map((issue) => ({
      field: issue.path[0],
      message: issue.message,
    }));

    res.status(400).json({
      message: "Incorrect Format",
      error: errMsg,
    });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({
      email,
      password: hashedPassword,
    });

    return res.json({
      message: "You are signed up successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: "User already exists or Database error",
      error: error.messaage,
    });
  }
}

// signin function

async function signin(req, res) {
  const requireBody = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password is required"),
  });

  const parseData = requireBody.safeParse(req.body);
  if (!parseData.success) {
    const errMsg = parseData.error.issues.map((issue) => ({
      field: issue.path[0],
      message: issue.message,
    }));
    return res.status(400).json({
      message: "Incorrect Format",
      error: errMsg,
    });
  }
  const email = req.body.email;
  const password = req.body.password;

  const user = await userModel.findOne({
    email: email,
  });

  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  const password_match = await bcrypt.compare(password, user.password);

  //JWT

  if (password_match) {
    const token = jwt.sign(
      {
        id: user.id,
      },
      jwt_secret,
      {
        issuer: "project-go",        // Add issuer
        audience: "project-go-users", // Add audience
        expiresIn: "24h"             // Optional: add expiration
      }
    );
    res.json({
      message: "signed in successfully",
      token:  token,
      profileCompleted: user.profileCompleted,
    });
  } else {
    res.status(403).json({
      message: "Email or Password is Incorrect",
    });
  }
}



module.exports = { signup, signin };