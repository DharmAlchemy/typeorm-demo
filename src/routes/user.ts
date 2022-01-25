import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();

//Get all users
router.get("/", UserController.listAll);

// Get one user
router.get("/:id", UserController.getOneById);

//Create a new user
router.post("/",  UserController.newUser);

//Edit one user
router.patch("/:id", UserController.editUser);

//Delete one user
router.delete("/:id", UserController.deleteUser);

//soft delete user
router.delete("/soft/:id", UserController.softdelete);

export default router;