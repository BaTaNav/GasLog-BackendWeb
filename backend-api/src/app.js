import express from 'express';
import usersRouter from './routes/users.js';
import fuelRouter from './routes/fuelEntries.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// ES modules fix voor __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());

// Routes
app.use('/users', usersRouter);
app.use('/fuel', fuelRouter);

// Root route met HTML documentatie
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

export default app;
