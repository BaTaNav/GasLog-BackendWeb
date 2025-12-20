import app from './app.js';
import { pool } from './db/index.js'; 

const PORT = process.env.PORT || 3000;
//db test connection
pool.query('SELECT 1')
  .then(() => console.log('DB connected'))
  .catch(err => console.error('DB connection error', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
