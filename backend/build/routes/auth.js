"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var auth_1 = require("../controllers/auth");
var index_1 = require("../vallidators/index");
router.post("/signup", index_1.userSignupValidator, auth_1.signup);
router.post("/signin", auth_1.signin);
router.post("/signout", auth_1.signout);
module.exports = router;
