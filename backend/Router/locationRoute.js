import { Router } from "express";

import {
    getLocation,
    getLocationById,
    postLocation,
    putLocation,
    deleteLocation
} from "../Controllers/locationController.js";


const router = Router();

router.get("/",getLocation);
router.get("/:id",getLocationById);
router.post("/",postLocation);
router.put("/:id",putLocation);
router.delete("/:id",deleteLocation);

export default router;