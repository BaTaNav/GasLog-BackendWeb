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