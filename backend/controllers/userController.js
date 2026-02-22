const { userModel } = require("../models/users");

// Complete Profile Function

async function completeProfile(req, res) {
   try {
    const { username, bio, skills } = req.body;

    if (!username) {
      return res.status(400).json({
        message: "Username is required",
      });
    }

    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.username = username;
    user.bio = bio;
    user.skills = skills || [];
    user.profileCompleted = true;

    await user.save();

    res.json({
      message: "Profile completed successfully",
    });
  } catch (err) {
    console.error("COMPLETE PROFILE ERROR:", err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
// Show Profile function

async function showProfile(req, res) {
  try {
    const user = await userModel.findById(req.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch Profile",
      error: err.message,
    });
  }
}

// function for fetching your profile
async function myProfile(req, res) {
  try {
    const user = await userModel.findById(req.userId);

    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching user",
    });
  }
}


module.exports = { completeProfile, showProfile, myProfile };
