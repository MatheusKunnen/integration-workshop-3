import express from "express";
import images from "../app/controllers/images.js";
import snacks from "../app/controllers/snacks.js";
import passwordGroups from "../app/controllers/passwordGroups.js";
import parents from "../app/controllers/parents.js";

const routes = express.Router();

routes.get("/images", images.findAll); // Only for debug
routes.get("/password-groups", passwordGroups.findAll); // Only for debug
routes.get("/snacks", snacks.findAll); // Only for debug
routes.patch("/snacks/:id/stock", snacks.updateStock); // Only for debug
routes.patch("/update-balance/:parent_id", parents.updateBalance); // Only for debug

export { routes as default };
