require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_AUTH_SECRET;
const { userModel } = require("../models/users");
const { createClerkClient } = require("@clerk/clerk-sdk-node");

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

// clerk login

async function clerkLogin(req, res) {
  try {
    const clerkUserId = req.clerkUserId;

    const clerkUser = await clerk.users.getUser(clerkUserId);

    if (!clerkUser.emailAddresses.length) {
      return res.status(400).json({
        message: "No email found",
      });
    }

    const email = clerkUser.emailAddresses[0]?.emailAddress;

    let user = await userModel.findOne({
      $or: [{ clerkId: clerkUserId }, { email }],
    });

    if (!user) {
      user = await userModel.create({
        clerkId: clerkUserId,
        email,
        profileCompleted : false
      });
    }

    const token = jwt.sign({ id: user._id }, jwt_secret, {
      expiresIn: "7d",
      issuer: "project-go",
      audience: "project-go-users",
    });

    res.json({
      message: "Login successful",
      token,
      profileCompleted: user.profileCompleted,
    });
  } catch (err) {
    console.error("CLERK LOGIN ERROR:", err); // ADD THIS
    res.status(500).json({
      message: "Error logging in",
      error: err.message,
    });
  }
}

module.exports = { clerkLogin };
