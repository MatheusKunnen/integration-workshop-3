import express from "express";
import images from "../app/controllers/images.js";
import snacks from "../app/controllers/snacks.js";
import passwordGroups from "../app/controllers/passwordGroups.js";

const routes = express.Router();

routes.get("/images", images.findAll); // Only for debug
routes.get("/password-groups", passwordGroups.findAll); // Only for debug
routes.get("/password-groups/:id", passwordGroups.findOne); // Only for debug
routes.get("/snacks", snacks.findAll); // Only for debug

export { routes as default };
