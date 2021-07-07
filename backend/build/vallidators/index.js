"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignupValidator = void 0;
var user_1 = __importDefault(require("../models/user"));
var userSignupValidator = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, hashed_password, hashed_password_confirm, pin, pin_confirm, existingUser, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, username = _a.username, hashed_password = _a.hashed_password, hashed_password_confirm = _a.hashed_password_confirm, pin = _a.pin, pin_confirm = _a.pin_confirm;
                if (!username ||
                    !hashed_password ||
                    !hashed_password_confirm ||
                    !pin ||
                    !pin_confirm) {
                    return [2 /*return*/, res.status(400).json({ msg: "Please fill out this field." })];
                }
                if (username.length < 5) {
                    return [2 /*return*/, res.status(400).json({ msg: "Username too short." })];
                }
                if (hashed_password.length < 8) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ msg: "Password must be 8 charaters long." })];
                }
                if (!hashed_password.match(/\d/)) {
                    return [2 /*return*/, res.status(400).json({ msg: "Password must contain a number." })];
                }
                if (hashed_password !== hashed_password_confirm) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ msg: "Password for verification does not match." })];
                }
                if (pin.length < 6) {
                    return [2 /*return*/, res.status(400).json({
                            msg: "Pin is require to withdraw your coins.It must be 6 digits long.",
                        })];
                }
                if (!pin.match(/^\d+$/)) {
                    return [2 /*return*/, res.status(400).json({ msg: "Pin must contain only digits." })];
                }
                if (pin !== pin_confirm) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ msg: "Pin for verification does not match." })];
                }
                return [4 /*yield*/, user_1.default.findOne({ username: username })];
            case 1:
                existingUser = _b.sent();
                if (existingUser) {
                    return [2 /*return*/, res.status(400).json({ msg: "User already exist." })];
                }
                return [3 /*break*/, 3];
            case 2:
                err_1 = _b.sent();
                res.status(500).json({ error: err_1.message });
                return [3 /*break*/, 3];
            case 3:
                next();
                return [2 /*return*/];
        }
    });
}); };
exports.userSignupValidator = userSignupValidator;
