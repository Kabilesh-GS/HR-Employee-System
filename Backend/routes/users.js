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

export default router;
