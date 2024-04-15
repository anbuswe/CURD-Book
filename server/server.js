import express from 'express';
import db from './db.js';
import app from './routes.js';

const PORT = 8800;

db.connect(err => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
