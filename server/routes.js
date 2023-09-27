import express from "express";
import parents from "./src/controllers/parents.js";
import images from "./src/controllers/images.js";
import snacks from "./src/controllers/snacks.js";
import children from "./src/controllers/children.js";
import passwordGroups from "./src/controllers/passwordGroups.js";

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
