const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');

const db = new Database(path.join(__dirname, 'database.sqlite'));

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  );

  CREATE TABLE IF NOT EXISTS programs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    category TEXT,
    target INTEGER,
    collected INTEGER DEFAULT 0,
    image_url TEXT
  );

  CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT,
    date TEXT,
    image_url TEXT
  );
`);

// Seed Admin User if not exists
const adminExists = db.prepare('SELECT * FROM users WHERE username = ?').get('admin');
if (!adminExists) {
    const hashedPassword = bcrypt.hashSync('admin123', 10);
    db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run('admin', hashedPassword);
}

// Seed Programs if empty
const programsCount = db.prepare('SELECT COUNT(*) as count FROM programs').get().count;
if (programsCount === 0) {
    const seedPrograms = [
        { title: "Beasiswa Dhuafa Berprestasi", category: "pendidikan", target: 100000000, collected: 45000000 },
        { title: "Layanan Ambulans Gratis 24 Jam", category: "kesehatan", target: 250000000, collected: 120000000 },
        { title: "Bantuan Modal Usaha Mikro", category: "ekonomi", target: 50000000, collected: 15000000 },
        { title: "Tanggap Bencana Banjir Jakarta", category: "kemanusiaan", target: 50000000, collected: 32000000 },
        { title: "Program 1000 Pohon Masjid", category: "lingkungan", target: 10000000, collected: 2500000 },
        { title: "Renovasi Sanitasi Masjid", category: "kesehatan", target: 75000000, collected: 60000000 }
    ];
    const insert = db.prepare('INSERT INTO programs (title, category, target, collected) VALUES (@title, @category, @target, @collected)');
    for (const p of seedPrograms) {
        insert.run(p);
    }
}

module.exports = db;
