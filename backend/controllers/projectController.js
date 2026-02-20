const { includes } = require("zod");
const { projectModel } = require("../models/projects");

//create project function

async function createProject(req, res) {
  let title = req.body.title;
  const description = req.body.description;
  const skillsRequired = req.body.skillsRequired;

  try {
    title = title.trim().toLowerCase();

    // check existing projects
    const existingProject = await projectModel.findOne({
      title,
      createdBy: req.userId,
    });

    if (existingProject) {
      return res.status(400).json({
        message: "Project with this title already exists",
      });
    }

    // creating new project

    const newProject = await projectModel.create({
      title,
      description,
      skillsRequired,
      createdBy: req.userId,
    });

    res.json({
      message: "Project created Successfully",
      project: newProject,
    });
  } catch (err) {
    res.json({
      message: "Error creating project",
      error: err.message,
    });
  }
}

// get all my projects function

async function myProjects(req, res) {
  try {
    const createdProjects = await projectModel.find({
      createdBy: req.userId,
    });

    const joinedProjects = await projectModel.find({
      members: req.userId,
    });

    res.json({
      created_count: createProject.length,
      created: createdProjects,
      joined_count: joinProject.length,
      joined: joinedProjects,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching projects",
      error: err.message,
    });
  }
}

// join project function

async function joinProject(req, res) {
  const projectId = req.params.projectId;
  const userId = req.userId;

  const project = await projectModel.findById(projectId);

  if (!project) {
    return res.status(404).json({
      message: "project not found",
    });
  }

  //prevent duplicates

  if (project.members.includes(userId)) {
    return res.json({
      message: "already joined",
    });
  }

  project.members.push(userId);
  await project.save();

  res.json({
    message: "project joined successfully",
  });
}

// show members function

async function showMembers(req, res) {
  try {
    const project = await projectModel.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project Not Found",
      });
    }

    // authentication members should only be visible to
    // creator or members of project
    const isCreator = project.createdBy.toString() === req.userId;
    const isMember = project.members.some(
      (members) => members.toString() === req.userId,
    );

    if (!isCreator && !isMember) {
      return res.status(403).json({
        message: "You are not allowed to view members",
      });
    }

    // this shows the members
    await project.populate("members", "username email");
    await project.populate("createdBy", "username");

    res.json({ project });
  } catch (err) {
    res.json({
      message: "Error fetching Project",
      error: err.message,
    });
  }
}

// request function

async function requestToJoin(req, res) {
  try {
    const project = await projectModel.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project Not Found",
      });
    }

    if (project.createdBy.toString() === req.userId) {
      return res.status(400).json({
        message: "Creator cannot join own project",
      });
    }
    if (project.members.some((members) => members.toString() === req.userId)) {
      return res.status(400).json({
        message: "Already a member",
      });
    }

    const alreadyRequested = project.joinRequest.some(
      (id) => id.toString() === req.userId,
    );

    if (alreadyRequested) {
      return res.status(400).json({
        message: "Already Requested",
      });
    }

    project.joinRequest.push(req.userId);
    await project.save();

    res.json({
      message: "Join request sent",
      userId: req.userId,
    });
  } catch (err) {
    res.json({
      message: "Error sending request",
      error: err.message,
    });
  }
}

// function to accept requests

async function acceptRequest(req, res) {
  try {
    const project = await projectModel.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (project.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        message: "Only creator can accept requests",
      });
    }

    const requestedUser = req.params.userId;

    const requestExists = project.joinRequest.some(
      (id) => id.toString() === requestedUser,
    );

    if (!requestExists) {
      return res.status(400).json({
        message: "No request found",
      });
    }

    project.joinRequest = project.joinRequest.filter(
      (id) => id.toString() !== requestedUser,
    );

    if (!req.userId) {
      return res.status(400).json({
        message: "invalid user",
      });
    }

    project.members.push(requestedUser);
    await project.save();

    res.json({
      message: "User added to project",
    });
  } catch (err) {
    res.json({
      message: "Error accepting request",
      error: err.message,
    });
  }
}

// function to reject requests

async function rejectRequest(req, res) {
  try {
    const project = await projectModel.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({
        message: "No project found",
      });
    }

    const requestedUser = req.params.userId;

    if (!project.joinRequest.includes(requestedUser)) {
      return res.status(400).json({
        message: "No request found",
      });
    }

    project.joinRequest = project.joinRequest.filter(
      (id) => id.toString() !== requestedUser,
    );

    await project.save();

    res.json({
      message: "Request rejected",
    });
  } catch (err) {
    res.json({
      messsage: "Error rejecting request",
      error: err.message,
    });
  }
}

// function to kick meembers

async function kickMember(req, res) {
  try {
    const project = await projectModel.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (project.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        message: "Only Creator can kick",
      });
    }

    const member = req.params.userId;

    if (member === project.createdBy.toString()) {
      return res.status(400).json({
        message: "Cannot kick Creator",
      });
    }

    const isMember = project.members.some((id) => id.toString() === member);

    if (!isMember) {
      return res.status(400).json({
        message: "Not a member ",
      });
    }

    project.members = project.members.filter((id) => id.toString() !== member);

    await project.save();

    res.json({
      message: "User kicked successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error kicking member",
      error: err.message,
    });
  }
}

// function to leave project

async function leaveProject(req, res) {
  try {
    const project = await projectModel.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const member = req.userId;

    const isMember = project.members.some((id) => id.toString() === member);

    if (project.createdBy.toString() === member) {
      return res.status(400).json({
        message: "creator cannot leave project",
      });
    }

    if (!isMember) {
      return res.status(403).json({
        message: "you are not a member",
      });
    }

    project.members = project.members.filter((id) => id.toString() !== member);

    await project.save();

    res.json({
      message: "Left project successfully",
    });
  } catch (err) {
    res.json({
      message: "Error leavig project",
      error: err.message,
    });
  }
}

// function to delete project

async function deleteProject(req, res) {
  try {
    const project = await projectModel.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (project.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        message: "Only Creator can delete project",
      });
    }

    // Remove project from all members
    await userModel.updateMany(
      { _id: { $in: project.members } },
      { $pull: { joinedProjects: project._id } },
    );

    // Remove project from creator if stored
    await userModel.updateOne(
      { _id: project.createdBy },
      { $pull: { joinedProjects: project._id } },
    );

    await project.deleteOne();

    res.json({
      message: "Project deleted successfully",
    });
  } catch (err) {
    res.json({
      message: "Error deleting project",
      error: err.message,
    });
  }
}

module.exports = {
  createProject,
  myProjects,
  showMembers,
  requestToJoin,
  acceptRequest,
  rejectRequest,
  kickMember,
  leaveProject,
  deleteProject,
};
