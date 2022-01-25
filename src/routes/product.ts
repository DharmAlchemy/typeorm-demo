import { Router } from "express";
import ProductController from "../controllers/ProductController";

const router = Router();


router.get("/", ProductController.getall);

router.get("/:id", ProductController.getOneById);

router.post("/",  ProductController.new);

router.patch("/:id", ProductController.edit);

router.delete("/:id", ProductController.delete);

router.delete("/cat/:id",ProductController.deletecat)


export default router;