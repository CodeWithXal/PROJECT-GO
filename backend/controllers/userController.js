const { userModel } = require("../models/users");

// Complete Profile Function

async function completeProfile(req, res) {
  const { bio, skills, education, experience } = req.body;

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      req.userId,
      {
        bio,
        skills,
        education,
        experience,
        profileCompleted: true,
      },
      { returnDocument: "after" },
    );

    res.json({
      message: "Profile completed",
      profileCompleted: updatedUser.profileCompleted,
    });
  } catch (err) {
    res.json({
      message: "Error Updating Profile",
      error: err.message,
    });
  }
}

// Show Profile function

async function showProfile(req, res) {
  try {
    const user = await userModel.findById(req.userId).select("-password");

    if (!user) {
      res.status(401).json({
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

// add the /me route for fetching your profile

module.exports = { completeProfile, showProfile };
