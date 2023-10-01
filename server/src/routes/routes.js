import express from "express";
import parents from "../app/controllers/parents.js";
import images from "../app/controllers/images.js";
import snacks from "../app/controllers/snacks.js";
import children from "../app/controllers/children.js";
import passwordGroups from "../app/controllers/passwordGroups.js";

const routes = express.Router();

routes.get("/parents", parents.findAll);
routes.post("/parents", parents.addParent);
routes.get("/parents/:id", parents.findParent);
routes.put("/parents/:id", parents.updateParent);
routes.delete("/parents/:id", parents.deleteParent);

routes.get("/images", images.findAll);
routes.get("/password-groups", passwordGroups.findAll);
routes.get("/snacks", snacks.findAll);
routes.get("/children", children.findAll);

export { routes as default };
