import express from 'express';
import DB from '../DB.js';
const router = express.Router();

router.get('/', (req, res) => {
  DB.query('SELECT * FROM projects', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.get('/user/:id', (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT p.project_name, up.role_in_project, up.contribution_percentage
    FROM user_projects up
    JOIN projects p ON up.project_id = p.project_id
    WHERE up.user_id = ?
  `;
    DB.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

export default router;
