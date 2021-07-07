import express from "express";
const router = express.Router();

import { requireSignin, isAuth, isVendor } from "../controllers/auth";

import { userById, read, updateVendor } from "../controllers/user";

router.get(
  "/vendor/:userId",
  requireSignin,
  isAuth,
  isVendor,
  (req: any, res: any) => {
    res.json({ user: req.profile });
  }
);
router.get("/user/:userId", requireSignin, isAuth, read);
router.put("/vendor/:userId", requireSignin, isAuth, updateVendor);

router.param("userId", userById);

module.exports = router;
