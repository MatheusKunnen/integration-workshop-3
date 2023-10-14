import express from "express";
import children from "../app/controllers/children.js";
import verifyToken from '../middlewares/auth.js'

const childrenRoutes = express.Router();

childrenRoutes.get("/tag/:tagNumber", children.getByTagNumber);
childrenRoutes.get("/all", verifyToken, children.getByParentId);
childrenRoutes.get("/history/:id", verifyToken, children.getOrderHistory);
childrenRoutes.post("/login", children.loginChild);
childrenRoutes.post("/", verifyToken, children.createChild);
childrenRoutes.patch("/:id", verifyToken, children.updateChild);
childrenRoutes.patch("/:id/budget", verifyToken, children.updateBudget);
childrenRoutes.patch('/:id/allowed-snacks', verifyToken, children.updateAllowedSnacks)
childrenRoutes.delete("/:id", verifyToken, children.deleteChild);

export default childrenRoutes;