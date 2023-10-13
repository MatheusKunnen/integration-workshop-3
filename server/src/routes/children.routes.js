import express from "express";
import children from "../app/controllers/children.js";
import verifyToken from '../middlewares/auth.js'

const childrenRoutes = express.Router();

childrenRoutes.get("/tag/:tagNumber", children.getByTagNumber);
childrenRoutes.get("/all", verifyToken, children.getByParentId);
childrenRoutes.post("/login", children.loginChild);
childrenRoutes.post("/", verifyToken, children.createChild);
childrenRoutes.patch("/:id", verifyToken, children.updateChild);
childrenRoutes.patch("/:id/budget", verifyToken, children.updateBudget);
childrenRoutes.delete("/:id", verifyToken, children.deleteChild);

childrenRoutes.patch('/:id/allowed-snacks', verifyToken, children.updateAllowedSnacks)

export default childrenRoutes;