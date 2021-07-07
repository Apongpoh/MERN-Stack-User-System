import express from "express";
const router = express.Router();

import { signup, signin, signout } from "../controllers/auth";

import { userSignupValidator } from "../vallidators/index";

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.post("/signout", signout);

module.exports = router;
