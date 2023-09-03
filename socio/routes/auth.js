/* This code is creating a router for handling HTTP requests in a JavaScript application using the
Express framework. */
import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router();

router.post('/login', login);

export default router;
