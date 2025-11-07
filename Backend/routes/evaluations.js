import express from 'express';
import DB from '../DB.js';
const router = express.Router();

router.get('/', (req, res) => {
  DB.query('SELECT * FROM evaluations', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.get('/user/:id', (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT quarter, year, rating, strengths, weaknesses, goals_for_next_quarter
    FROM evaluations
    WHERE user_id = ?
  `;
  DB.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

export default router;
