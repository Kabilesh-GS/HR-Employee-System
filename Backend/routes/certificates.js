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

export default router;