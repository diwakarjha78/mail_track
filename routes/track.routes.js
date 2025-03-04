import express from "express";
import { send_mail_controller, tracking_pixel_controller } from "../controllers/track.controller.js";

const trackrouter = express.Router();

trackrouter.get('/logo', tracking_pixel_controller);
trackrouter.post('/send-mail', send_mail_controller);

export default trackrouter;