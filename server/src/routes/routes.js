import express from "express";
import images from "../app/controllers/images.js";
import snacks from "../app/controllers/snacks.js";
import passwordGroups from "../app/controllers/passwordGroups.js";
import verifyToken from '../middlewares/auth.js'

const routes = express.Router();

routes.get("/images", images.findAll); // Only for debug
routes.get("/password-groups", passwordGroups.findAll); // Only for debug
routes.get("/password-groups/random", passwordGroups.getRandom);
routes.get("/snacks", snacks.findAll); // Only for debug
routes.get("/snacks/purchase/:snack_id", verifyToken, snacks.purchase);

export { routes as default };
