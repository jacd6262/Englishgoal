import { pool } from '../db.js';

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows); // ✅ aquí rows ya es el array
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un usuario por id
export const getUserById = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE id_user = ?',
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'No user found' });
    }
    res.json(rows[0]); // ✅ primer objeto del array
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};