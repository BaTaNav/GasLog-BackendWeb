import express from 'express';
import fuelRouter from './routes/fuelEntries.js';
import usersRouter from './routes/users.js';

const app = express();

app.use(express.json());
app.use('/users', usersRouter);
app.use('/fuel', fuelRouter);

// Root pagina met API documentatie
app.get('/', (req, res) => {
  res.sendFile(new URL('./docs/index.html', import.meta.url));
});

export default app;
