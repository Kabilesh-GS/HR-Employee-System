import express from "express";
import DB from "../DB.js";

const router = express.Router();

router.get("/", (req, res) => {
  DB.query("SELECT * FROM users WHERE role='EMPLOYEE'", (error, result) => {
    if (error) {
      return res.status(500).json({ message: "SQL Error", error });
    }
    res.json(result);
  });
});

router.post("/login", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  const query = "SELECT * FROM users WHERE name = ? AND email = ?";
  DB.query(query, [name, email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = results[0];
    res.json({
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      role: user.role,
      department_id: user.department_id,
    });
  });
});

router.get("/:id", (req, res) => {
  const userId = req.params.id;
  const query = `
    SELECT u.*, d.department_name
    FROM users u
    LEFT JOIN departments d ON u.department_id = d.department_id
    WHERE u.user_id = ?
  `;
  DB.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ message: "User not found" });
    res.json(results[0]);
  });
});

router.post("/", (req, res) => {
  const { name, email, role, department_id } = req.body;
  const query =
    "INSERT INTO users (name, email, role, department_id) VALUES (?, ?, ?, ?)";
  DB.query(query, [name, email, role, department_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "User added", userId: result.insertId });
  });
});

export default router;
