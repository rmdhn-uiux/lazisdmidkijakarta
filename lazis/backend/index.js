require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey';

app.use(cors());
app.use(express.json());

// Middleware for auth
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Auth Routes
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token, username: user.username });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Program Routes
app.get('/api/programs', (req, res) => {
    const programs = db.prepare('SELECT * FROM programs').all();
    res.json(programs);
});

app.post('/api/programs', authenticateToken, (req, res) => {
    const { title, category, target, collected, image_url } = req.body;
    const info = db.prepare('INSERT INTO programs (title, category, target, collected, image_url) VALUES (?, ?, ?, ?, ?)')
        .run(title, category, target, collected || 0, image_url);
    res.json({ id: info.lastInsertRowid, title, category, target, collected, image_url });
});

app.put('/api/programs/:id', authenticateToken, (req, res) => {
    const { title, category, target, collected, image_url } = req.body;
    db.prepare('UPDATE programs SET title = ?, category = ?, target = ?, collected = ?, image_url = ? WHERE id = ?')
        .run(title, category, target, collected, image_url, req.params.id);
    res.json({ message: 'Updated' });
});

app.delete('/api/programs/:id', authenticateToken, (req, res) => {
    db.prepare('DELETE FROM programs WHERE id = ?').run(req.params.id);
    res.json({ message: 'Deleted' });
});

// News Routes
app.get('/api/news', (req, res) => {
    const news = db.prepare('SELECT * FROM news ORDER BY id DESC').all();
    res.json(news);
});

app.post('/api/news', authenticateToken, (req, res) => {
    const { title, content, date, image_url } = req.body;
    const info = db.prepare('INSERT INTO news (title, content, date, image_url) VALUES (?, ?, ?, ?)')
        .run(title, content, date, image_url);
    res.json({ id: info.lastInsertRowid, title, content, date, image_url });
});

app.delete('/api/news/:id', authenticateToken, (req, res) => {
    db.prepare('DELETE FROM news WHERE id = ?').run(req.params.id);
    res.json({ message: 'Deleted' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
