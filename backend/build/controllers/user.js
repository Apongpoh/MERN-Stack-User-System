"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVendor = exports.read = exports.userById = void 0;
var user_1 = __importDefault(require("../models/user"));
var userById = function (req, res, next, id) {
    user_1.default.findById(id).exec(function (err, user) {
        if (err || !user) {
            return res.status(400).json({ msg: "User not found" });
        }
        req.profile = user;
        next();
    });
};
exports.userById = userById;
var read = function (req, res) {
    req.profile.hashed_password = undefined;
    req.profile.pin = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};
exports.read = read;
var updateVendor = function (req, res) {
    user_1.default.findByIdAndUpdate({ _id: req.profile._id }, { $set: req.body }, { new: true }, function (err, user) {
        if (err) {
            return res.status(400).json({
                error: "You are not authorized to perform this action",
            });
        }
        user.hashed_password = undefined;
        user.pin = undefined;
        user.salt = undefined;
        res.json(user);
    });
};
exports.updateVendor = updateVendor;
