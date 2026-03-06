import { pool } from "../db.js";

//Obtener actividades
export const getActivities = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM activities ORDER BY date_activity DESC, time_activity DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener una actividad por id
export const getActivityById = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM activities WHERE id_activity = ?",
      [req.params.id],
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Activity not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear una actividad
export const createActivity = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "INSERT INTO activities (id_user, id_goal, id_activity_type, activity_name, observation, minutes_spent, date_activity, time_activity)" +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        req.body.id_user,
        req.body.id_goal,
        req.body.id_activity_type,
        req.body.activity_name,
        req.body.observation,
        req.body.minutes_spent,
        req.body.date_activity,
        req.body.time_activity,
      ],
    );
    // Actualizar el remaining_minutes del goal
    await pool.query(
      "UPDATE goals SET remaining_minutes = remaining_minutes + ? WHERE id_goal = ?",
      [req.body.minutes_spent, req.body.id_goal],
    );
    res.json({ insertId: rows.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar una actividad
export const deleteActivity = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "DELETE FROM activities WHERE id_activity = ?",
      [req.params.id],
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar una actividad
export const updateActivity = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "UPDATE activities SET id_user = ?, id_goal = ?, id_activity_type = ?, activity_name = ?, observation = ?, minutes_spent = ?, date_activity = ?, time_activity = ? WHERE id_activity = ?",
      [
        req.body.id_user,
        req.body.id_goal,
        req.body.id_activity_type,
        req.body.activity_name,
        req.body.observation,
        req.body.minutes_spent,
        req.body.date_activity,
        req.body.time_activity,
        req.params.id,
      ],
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
