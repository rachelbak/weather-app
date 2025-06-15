import { Router } from "express"
import { getByCity } from "../controllers/weatherController.js"

const router = Router();
router.get("/:city", getByCity);

export default router;