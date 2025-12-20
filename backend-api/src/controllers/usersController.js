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

// GET /users/:id
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT id, username, created_at FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};