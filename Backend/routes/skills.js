import express from 'express';
import DB from '../DB.js';
const router = express.Router();

router.get('/', (req, res) => {
  DB.query('SELECT * FROM skills', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.get('/user/:id', (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT s.skill_name, us.proficiency_level, us.years_of_experience
    FROM user_skills us
    JOIN skills s ON us.skill_id = s.skill_id
    WHERE us.user_id = ?
  `;
  DB.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

export default router;
