import express from 'express';
import 'dotenv/config';
import router from './router';
import { connectDB } from './config/db';

const app = express();

// Leer datos de formularios
app.use(express.json());

// Conectar a la BD
connectDB();

app.use('/', router);

export default app;