import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config({ path: './config.env' });
import { userRoute } from '@routes';
import { eventRoutes } from '@routes';
import { registrationRoutes } from '@routes';
import ErrorHandler from './handlers/errorHandlers';

const app = express();
app.use(cors());
app.use(express.json())

app.use('/auth', userRoute);
app.use('/events', eventRoutes);
app.use('/registrations', registrationRoutes);
app.use(ErrorHandler.errorHandlerMiddlerWare)

export default app;