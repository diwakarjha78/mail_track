import express from "express";
import trackrouter from "./track.routes.js";

const router = express.Router();

router.use('/', trackrouter);

export default router;