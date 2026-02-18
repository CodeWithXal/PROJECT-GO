const {Router} = require("express");
const projectRouter = Router();
const {createProject, myProjects} = require("../controllers/projectController");
const jwt_secret = process.env.JWT_AUTH_SECRET;
const { authMiddleware } = require("../middleware/auth_Middleware");
const projectAuth = authMiddleware(jwt_secret);

projectRouter.post("/create-project",projectAuth,createProject);
projectRouter.get("/my-projects",projectAuth,myProjects);

module.exports = {projectRouter};