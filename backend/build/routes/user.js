"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var auth_1 = require("../controllers/auth");
var user_1 = require("../controllers/user");
router.get("/secret/:userId", auth_1.requireSignin, auth_1.isAuth, auth_1.isVendor, function (req, res) {
    res.json({ user: req.profile });
});
router.get("/user/:userId", auth_1.requireSignin, auth_1.isAuth, user_1.read);
router.put("/user/:userId", auth_1.requireSignin, auth_1.isAuth, user_1.updateVendor);
router.param("userId", user_1.userById);
module.exports = router;
