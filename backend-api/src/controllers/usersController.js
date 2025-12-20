import { pool } from '../db/index.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

// GET /users
export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, username, created_at FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};