import { pool } from '../db/index.js';
import bcrypt from 'bcrypt';


// GET /fuel
export const getAllFuelEntries = async (req, res) => {
  try {
    const result = await pool.query(`
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
    `);
    res.json(result.rows);
  } catch (err) {
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
    res.status(500).json({ error: 'Database error' });
  }
};


// POST /fuel
export const createFuelEntry = async (req, res) => {
  const { car_id, user_id, date, liters, price_per_liter, odometer } = req.body;

  if (
    car_id == null ||
    user_id == null ||
    !date ||
    liters == null ||
    price_per_liter == null
  ) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (
    !isNumber(liters) ||
    !isNumber(price_per_liter) ||
    (odometer != null && !isNumber(odometer))
  ) {
    return res.status(400).json({ error: 'Numeric fields must be numbers' });
  }

  if (liters <= 0 || price_per_liter <= 0) {
    return res.status(400).json({ error: 'liters and price_per_liter must be > 0' });
  }

  try {
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
      [car_id, user_id, date, liters, price_per_liter, odometer ?? null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};