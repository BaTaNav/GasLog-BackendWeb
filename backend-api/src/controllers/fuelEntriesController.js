import { pool } from '../db/index.js';
import bcrypt from 'bcrypt';

// Helper om te checken of een waarde een geldig nummer is
const isNumber = (value) => typeof value === 'number' && !isNaN(value);

// GET /fuel
export const getAllFuelEntries = async (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : 10;
  const offset = req.query.offset ? Number(req.query.offset) : 0;

  if (isNaN(limit) || isNaN(offset) || limit <= 0 || offset < 0) {
    return res.status(400).json({ error: 'Invalid limit or offset' });
  }

  try {
    const result = await pool.query(
      `
      SELECT 
        id,
        car_id,
        user_id,
        date,
        liters,
        price_per_liter,
        odometer,
        (liters * price_per_liter) AS total_amount,
        created_at
      FROM fuel_entries
      ORDER BY date DESC
      LIMIT $1 OFFSET $2
      `,
      [limit, offset]
    );

    res.json({
      limit,
      offset,
      count: result.rows.length,
      data: result.rows
    });
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

// GET /fuel/:id
export const getFuelEntryById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT 
        id,
        car_id,
        user_id,
        date,
        liters,
        price_per_liter,
        odometer,
        (liters * price_per_liter) AS total_amount,
        created_at
      FROM fuel_entries
      WHERE id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Fuel entry not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

// POST /fuel
export const createFuelEntry = async (req, res) => {
  const { car_id, user_id, date, liters, price_per_liter, odometer } = req.body;

  if (car_id == null || user_id == null || !date || liters == null || price_per_liter == null) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // cast strings naar nummers
  const litersNum = Number(liters);
  const priceNum = Number(price_per_liter);
  const odoNum = odometer != null ? Number(odometer) : null;

  if (isNaN(litersNum) || isNaN(priceNum) || (odometer != null && isNaN(odoNum))) {
    return res.status(400).json({ error: 'Numeric fields must be numbers' });
  }

  if (litersNum <= 0 || priceNum <= 0) {
    return res.status(400).json({ error: 'liters and price_per_liter must be > 0' });
  }

  try {
    console.log('Creating fuel entry:', { car_id, user_id, date, litersNum, priceNum, odoNum });
    const result = await pool.query(
      `
      INSERT INTO fuel_entries
        (car_id, user_id, date, liters, price_per_liter, odometer)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING
        id,
        car_id,
        user_id,
        date,
        liters,
        price_per_liter,
        odometer,
        (liters * price_per_liter) AS total_amount,
        created_at
      `,
      [car_id, user_id, date, litersNum, priceNum, odoNum]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('DB insert error:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

// PUT /fuel/:id
export const updateFuelEntry = async (req, res) => {
  const { id } = req.params;
  const { date, liters, price_per_liter, odometer } = req.body;

  if (!date && liters == null && price_per_liter == null && odometer == null) {
    return res.status(400).json({ error: 'Nothing to update' });
  }

  const litersNum = liters != null ? Number(liters) : null;
  const priceNum = price_per_liter != null ? Number(price_per_liter) : null;
  const odoNum = odometer != null ? Number(odometer) : null;

  if ((litersNum != null && (isNaN(litersNum) || litersNum <= 0)) ||
      (priceNum != null && (isNaN(priceNum) || priceNum <= 0)) ||
      (odoNum != null && isNaN(odoNum))) {
    return res.status(400).json({ error: 'Invalid numeric values' });
  }

  try {
    let query = 'UPDATE fuel_entries SET ';
    const values = [];
    let idx = 1;

    if (date) {
      query += `date = $${idx++}, `;
      values.push(date);
    }
    if (litersNum != null) {
      query += `liters = $${idx++}, `;
      values.push(litersNum);
    }
    if (priceNum != null) {
      query += `price_per_liter = $${idx++}, `;
      values.push(priceNum);
    }
    if (odoNum != null) {
      query += `odometer = $${idx++}, `;
      values.push(odoNum);
    }

    query = query.slice(0, -2); // laatste comma verwijderen
    query += `
      WHERE id = $${idx}
      RETURNING
        id,
        car_id,
        user_id,
        date,
        liters,
        price_per_liter,
        odometer,
        (liters * price_per_liter) AS total_amount,
        created_at
    `;
    values.push(id);

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Fuel entry not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('DB update error:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

// DELETE /fuel/:id
export const deleteFuelEntry = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM fuel_entries WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Fuel entry not found' });
    }

    res.json({ message: 'Fuel entry deleted', id });
  } catch (err) {
    console.error('DB delete error:', err);
    res.status(500).json({ error: 'Database error' });
  }
};
