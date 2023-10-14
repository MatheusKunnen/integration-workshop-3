import express from "express";
import parents from "../app/controllers/parents.js";
import verifyToken from '../middlewares/auth.js'

const parentsRoutes = express.Router();

parentsRoutes.get("/", verifyToken, parents.findParent);
parentsRoutes.post("/", parents.createParent);
parentsRoutes.post("/login", parents.loginParent);

export default parentsRoutes;
