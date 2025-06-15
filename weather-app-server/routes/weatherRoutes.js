import { Router } from "express"
import { validateCity, requestLogger } from "../middleware/validation.js";
import { getByCity } from "../controllers/weatherController.js"

const router = Router();
router.get("/:city", validateCity, requestLogger, getByCity);

export default router;





