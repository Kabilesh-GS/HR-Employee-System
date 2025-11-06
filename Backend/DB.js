import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const DB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
})

DB.connect((err) => {
  if(err) {
    console.error('Error connecting to database:', err);
  }
  else{
    console.log('Connected to database.');
  }
})

export default DB;