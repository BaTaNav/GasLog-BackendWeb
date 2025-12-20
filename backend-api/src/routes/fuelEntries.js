import express from 'express';
const router = express.Router();

// Voorbeeld: lijst van tankbeurten
router.get('/', (req, res) => {
  res.json({ message: 'list fuel entries' });
});