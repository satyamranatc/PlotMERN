import { Router } from "express";

import {
    getProperties,
    getPropertiesById,
    postProperties,
    putProperties,
    deleteProperties
} from "../Controllers/PropertiesController.js";


const router = Router();

router.get("/",getProperties);
router.get("/:id",getPropertiesById);
router.post("/",postProperties);
router.put("/:id",putProperties);
router.delete("/:id",deleteProperties);

export default router;