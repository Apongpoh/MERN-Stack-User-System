"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
// Schema definition
var userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        lowercase: true,
        trim: true,
        minLength: 5,
        require: true,
        maxlength: 32,
        unique: true
    },
    hashed_password: {
        type: String,
        require: true,
        trim: true,
        minLength: 8,
        unique: true
    },
    pin: {
        type: String,
        require: true,
        trim: true,
        minLength: 6,
        unique: true
    },
    salt: String,
    about: {
        type: String,
        trim: true
    },
    history: {
        type: Array,
        default: []
    },
    role: {
        type: Number,
        default: 0
    }
}, { collection: 'trader', timestamps: true });
exports.default = mongoose_1.default.model('User', userSchema);
