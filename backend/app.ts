import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

// import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

// Setup database
const uri: any = process.env.DATABASE;
const options: object = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    user: "user",
    pass: "userpassword",
    useFindAndModify: false,
    //autoIndex: false, /*for production*/
    poolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
    keepAlive: true,
    keepAliveInitialDelay: 300000
};

mongoose
    .connect(uri, options)
    .then(() => console.log('Database connected'))
    .catch((err: string) => console.error(err))
    
const db = mongoose.connection;
db.on('close', () => {
    console.log('Mongoose closed MongoDb');
});
db.on('reconnected', () => {
    console.log('Mongoose reconnected to MongoDb');
});
db.on('error', () => {
    console.log('Error payload larger than 16MB');
});

app.use(cors());

// middleware to parse incoming request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.text());
app.use(express.raw());
app.use(morgan('dev'));

// 
app.use('/', authRoutes);
app.use('/', userRoutes);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
