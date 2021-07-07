"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var app = express_1.default();
// import routes
var authRoutes = require('./routes/auth');
// Setup database
var uri = process.env.DATABASE;
var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    user: "Apongpoh",
    pass: "PassyMe.1",
    useFindAndModify: false,
    //autoIndex: false, /*for production*/
    poolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4,
    keepAlive: true,
    keepAliveInitialDelay: 300000
};
mongoose_1.default
    .connect(uri, options)
    .then(function () { return console.log('Database connected'); })
    .catch(function (err) { return console.error(err); });
var db = mongoose_1.default.connection;
db.on('close', function () {
    console.log('Mongoose closed MongoDb');
});
db.on('reconnected', function () {
    console.log('Mongoose reconnected to MongoDb');
});
db.on('error', function () {
    console.log('Error payload larger than 16MB');
});
app.use(cors_1.default());
// middleware to parse incoming request
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use(express_1.default.text());
app.use(express_1.default.raw());
app.use(morgan_1.default('dev'));
// 
app.use('/', authRoutes);
var port = process.env.PORT;
app.listen(port, function () {
    console.log("Server running on port " + port);
});
