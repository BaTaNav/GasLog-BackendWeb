import express from 'express';
import usersRouter from './routes/users.js';
import fuelRouter from './routes/fuelEntries.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <h1>Fuel API</h1>
    <ul>
      <li>GET /users</li>
      <li>POST /users</li>
      <li>GET /fuel</li>
      <li>POST /fuel</li>
    </ul>
  `);
});

app.use('/users', usersRouter);
app.use('/fuel', fuelRouter);

export default app;
