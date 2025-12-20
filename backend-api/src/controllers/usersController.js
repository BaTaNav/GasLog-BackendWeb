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

// POST /users
export const createUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing fields' });

  try {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const result = await pool.query(
      'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username, created_at',
      [username, hash]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') return res.status(400).json({ error: 'Username already exists' });
    res.status(500).json({ error: 'Database error' });
  }
};

// PUT /users/:id
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  if (!username && !password) return res.status(400).json({ error: 'Nothing to update' });

  try {
    let query = 'UPDATE users SET ';
    const params = [];
    let count = 1;

    if (username) {
      query += `username = $${count++}`;
      params.push(username);
    }
    if (password) {
      if (username) query += ', ';
      const hash = await bcrypt.hash(password, SALT_ROUNDS);
      query += `password_hash = $${count++}`;
      params.push(hash);
    }

    query += ` WHERE id = $${count} RETURNING id, username, created_at`;
    params.push(id);

    const result = await pool.query(query, params);
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};

// DELETE /users/:id
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted', id });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};