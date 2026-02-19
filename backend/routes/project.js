const {Router} = require("express");
const projectRouter = Router();
const {createProject, myProjects, joinProject, showMembers} = require("../controllers/projectController");
const jwt_secret = process.env.JWT_AUTH_SECRET;
const { authMiddleware } = require("../middleware/auth_Middleware");
const projectAuth = authMiddleware(jwt_secret);

projectRouter.post("/create-project",projectAuth,createProject);
projectRouter.get("/my-projects",projectAuth,myProjects);
projectRouter.post("/join/:projectId", projectAuth, joinProject);
projectRouter.get("/members/:projectId", projectAuth, showMembers)

module.exports = {projectRouter};