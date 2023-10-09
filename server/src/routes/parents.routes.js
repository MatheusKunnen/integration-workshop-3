import express from "express";
import parents from "../app/controllers/parents.js";
import verifyToken from '../middlewares/auth.js'

const parentsRoutes = express.Router();

parentsRoutes.get("/", parents.findAll);  // Only for debug
parentsRoutes.post("/", parents.createParent);
parentsRoutes.post("/login", parents.loginParent);
parentsRoutes.get("/:id", verifyToken, parents.findParent);

export default parentsRoutes;
