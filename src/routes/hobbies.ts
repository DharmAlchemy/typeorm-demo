import { Router } from "express";
import HobbiesController from "../controllers/HobbiesController";

const router = Router();

router.get("/", HobbiesController.listAll);

router.post("/", HobbiesController.new);

router.patch("/:id",HobbiesController.edit);

export default router;