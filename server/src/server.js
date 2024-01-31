// server/src/server.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3001;

// Use CORS middleware
app.use(cors());

// Create a MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// Check the MySQL connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Middleware to parse JSON requests
app.use(bodyParser.json());

// API route to get course progress
app.get('/course-progress', (req, res) => {
  db.query('SELECT * FROM course_progress', (err, results) => {
    if (err) {
      console.error('Error getting course progress:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

// API route to add course progress
app.post('/course-progress', (req, res) => {
  const { course_name, videos_watched, total_videos, time_watched, total_time } = req.body;
  const sql = 'INSERT INTO course_progress (course_name, videos_watched, total_videos, time_watched, total_time) VALUES (?, ?, ?, ?, ?)';
  const values = [course_name, videos_watched, total_videos, time_watched, total_time];

  db.query(sql, values, (err) => {
    if (err) {
      console.error('Error adding course progress:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Course progress added successfully' });
    }
  });
});

// API route to update course progress
app.put('/course-progress/:id', (req, res) => {
  const { id } = req.params;
  const { videos_watched, time_watched } = req.body;
  const sql = 'UPDATE course_progress SET videos_watched = ?, time_watched = ? WHERE id = ?';
  const values = [videos_watched, time_watched, id];

  db.query(sql, values, (err) => {
    if (err) {
      console.error('Error updating course progress:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Course progress updated successfully' });
    }
  });
});

// API route to delete course progress
app.delete('/course-progress/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM course_progress WHERE id = ?';

  db.query(sql, [id], (err) => {
    if (err) {
      console.error('Error deleting course progress:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Course progress deleted successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
