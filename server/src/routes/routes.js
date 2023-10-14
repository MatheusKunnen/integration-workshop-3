import express from "express";
import snacks from "../app/controllers/snacks.js";
import passwordGroups from "../app/controllers/passwordGroups.js";
import verifyToken from '../middlewares/auth.js'

const routes = express.Router();

routes.get("/password-groups/random", passwordGroups.getRandom);
routes.get("/snacks/purchase/:snack_id", verifyToken, snacks.purchase);

export { routes as default };
