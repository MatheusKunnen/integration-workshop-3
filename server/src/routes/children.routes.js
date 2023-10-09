import express from "express";
import children from "../app/controllers/children.js";
import verifyToken from '../middlewares/auth.js'

const childrenRoutes = express.Router();

childrenRoutes.get("/", children.findAll); // Only for debug
childrenRoutes.get("/:tagNumber", children.getByTagNumber);
childrenRoutes.get("/parents/:id", verifyToken, children.getByParentId);
childrenRoutes.post("/login", children.loginChild);
childrenRoutes.post("/", verifyToken, children.createChild);
childrenRoutes.patch("/:id", verifyToken, children.updateChild);
childrenRoutes.delete("/:id", verifyToken, children.deleteChild);

export default childrenRoutes;