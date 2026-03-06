import { pool } from '../db.js';

// Obtener todos los tipos de actividades
export const getActivityTypes = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM activity_types');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un tipo de actividad por id
export const getActivityTypeById = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM activity_types WHERE id_activity_type = ?',
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Activity type not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};