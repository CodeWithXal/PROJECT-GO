const { Router } = require("express");
const projectRouter = Router();
const {
  createProject,
  myProjects,
  showMembers,
  requestToJoin,
  acceptRequest,
  rejectRequest,
  kickMember,
  leaveProject,
  deleteProject,
  exploreProjects,
  viewJoinRequests,
  searchProjects,
  getSingleProject,
  cancelJoinRequest,
} = require("../controllers/projectController");
const jwt_secret = process.env.JWT_AUTH_SECRET;
const { authMiddleware } = require("../middleware/auth_Middleware");
const projectAuth = authMiddleware(jwt_secret);

projectRouter.post("/create-project", projectAuth, createProject);
projectRouter.get("/my-projects", projectAuth, myProjects);
projectRouter.get("/members/:projectId", projectAuth, showMembers);
projectRouter.post("/:projectId/request", projectAuth, requestToJoin);
projectRouter.put("/:projectId/accept/:userId", projectAuth, acceptRequest);
projectRouter.put("/:projectId/reject/:userId", projectAuth, rejectRequest);
projectRouter.put("/:projectId/kick/:userId", projectAuth, kickMember);
projectRouter.put("/:projectId/leave", projectAuth, leaveProject);
projectRouter.delete("/:projectId/delete", projectAuth, deleteProject);
projectRouter.get("/:projectId/join-requests", projectAuth, viewJoinRequests);
projectRouter.put("/:projectId/cancel-request", projectAuth, cancelJoinRequest);
projectRouter.get("/search", projectAuth, searchProjects);
projectRouter.get("/explore", projectAuth, exploreProjects);
projectRouter.get("/:projectId", projectAuth, getSingleProject);

module.exports = { projectRouter };
