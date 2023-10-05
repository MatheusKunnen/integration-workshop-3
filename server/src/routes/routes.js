import express from "express";
import parents from "../app/controllers/parents.js";
import images from "../app/controllers/images.js";
import snacks from "../app/controllers/snacks.js";
import children from "../app/controllers/children.js";
import passwordGroups from "../app/controllers/passwordGroups.js";
import verifyToken from '../middlewares/auth.js'

const routes = express.Router();

routes.get("/parents", parents.findAll);
routes.post("/parents", parents.createParent);
routes.post("/parents/login", parents.loginParent);
routes.get("/parents/:id", verifyToken, parents.findParent);

routes.get("/children", children.findAll);
routes.post("/children", verifyToken, children.createChild);
routes.post("/children/login", children.loginChild);

routes.get("/images", images.findAll);
routes.get("/password-groups", passwordGroups.findAll);
routes.get("/snacks", snacks.findAll);

export { routes as default };
