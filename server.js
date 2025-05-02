import { log } from 'console';
import { type } from 'os';
import express from 'express'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import blogRouter from './routes/blog.js'
import userRouter from './routes/user.js';
import { config } from 'dotenv';
import cors from 'cors'
import { get } from 'http';

const app = express();

app.use(express.json());

app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URI],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

config(
    {
        path: './data/config.env'
    }
)

mongoose.connect(process.env.MONGO_URI, {
    dbName: "MERN_2025"

}).then(() => console.log("MongoDB is Connected!")
)


// userRouter
app.use('/api/users', userRouter);

// Blog router
app.use('/api/blogs', blogRouter);

// MVC MODEL VIEWS CONTROLLER

const port = process.env.PORT || 4000;

app.listen(process.env.PORT, () => {
    console.log(`Server is Running on ${process.env.PORT}`);

})