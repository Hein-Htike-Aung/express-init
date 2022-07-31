import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
dotenv.config();

/* MongoDB Connection */
const connect = async () => {
    try {
        const mongodb_url = process.env.MONGO_URL
        if (mongodb_url) await mongoose.connect(mongodb_url);
        console.log('CONNECTED TO DB');
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on('disconnected', () => {
    console.log('mongoDB disconnected!');
});

/* Middlewares */
app.use(cors());
app.use(express.json());

app.use(errorHandler);

app.listen(8800, () => {
    connect();
    console.log('CONNECTED TO BACKEND SERVER');
});