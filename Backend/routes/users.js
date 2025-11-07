import express from "express";
import DB from "../DB.js";

const router = express.Router();

router.get("/", (req, res) => {

  DB.query("SELECT * FROM users", (error, result) => {
    if (error) {
      return res.status(500).json({ message: "SQL Error", error });
    }
    res.json(result);
  });
});

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  const query = `
    SELECT u.*, d.department_name
    FROM users u
    LEFT JOIN departments d ON u.department_id = d.department_id
    WHERE u.user_id = ?
  `;
  DB.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json(results[0]);
  });
});

router.post('/', (req, res) => {
  const { name, email, role, department_id } = req.body;
  const query = 'INSERT INTO users (name, email, role, department_id) VALUES (?, ?, ?, ?)';
  DB.query(query, [name, email, role, department_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'User added', userId: result.insertId });
  });
});

export default router;
