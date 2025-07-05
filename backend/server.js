const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();

app.use(cors());
app.use(express.json());

// Save memory
app.post('/api/memories', (req, res) => {
  const { name, place, details, date } = req.body;
  const query = "INSERT INTO memories (name, place, details, date) VALUES (?, ?, ?, ?)";
  db.query(query, [name, place, details, date], (err) => {
    if (err) return res.status(500).send("DB Error");
    res.send("Memory Saved");
  });
});

// Get all memories
app.get('/api/memories', (req, res) => {
  db.query("SELECT * FROM memories ORDER BY date DESC", (err, results) => {
    if (err) return res.status(500).send("DB Error");
    res.json(results);
  });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
