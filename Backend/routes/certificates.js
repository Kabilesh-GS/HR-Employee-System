import express from "express";
import DB from "../DB.js";
const router = express.Router();

router.get("/",(req,res) => {
  DB.query("SELECT * FROM certifications", (err,result) => {
    if(err){
      return res.status(500).json({error : err.message});
    }
    res.json(result);
  })
})

router.get("/user/:id", (req,res) => {
  const userId = req.params.id;
  const query = `
    SELECT c.cert_name, c.issued_by, DATE(c.date_obtained) FROM certifications c JOIN users u ON c.user_id = u.user_id WHERE u.user_id = ? `;
  DB.query(query, [userId], (err,result) => {
    if(err){
      return res.status(500).json({error : err.message});
    }
    res.json(result);
  })
})

router.post('/user/:id', (req, res) => {
  const { id } = req.params;
  const { cert_name, issued_by, date_obtained } = req.body;
  const query = 'INSERT INTO certifications (user_id, cert_name, issued_by, date_obtained) VALUES (?, ?, ?, ?)';
  DB.query(query, [id, cert_name, issued_by, date_obtained], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error adding certificate', error: err });
    }
    res.status(201).json({ message: 'Certificate added successfully', certId: result.insertId });
  });
});

export default router;