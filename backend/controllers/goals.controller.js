import { pool } from '../db.js';

// Obtener todos los goals
export const getGoals = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM goals');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un goal por id
export const getGoalById = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM goals WHERE id_goal = ?',
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Goal not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};