import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'list users' });
});

router.post('/', (req, res) => {
  res.json({ message: 'create user' });
});

export default router;
