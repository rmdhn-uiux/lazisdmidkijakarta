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

  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT, -- 'zakat' or 'infaq'
    amount INTEGER,
    date TEXT,
    description TEXT
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

// Seed Transactions if empty
const transactionsCount = db.prepare('SELECT COUNT(*) as count FROM transactions').get().count;
if (transactionsCount === 0) {
    const seedTransactions = [
        { type: 'zakat', amount: 5000000, date: '2025-01-10', description: 'Zakat Mal Bapak H.' },
        { type: 'infaq', amount: 2000000, date: '2025-01-15', description: 'Infaq Masjid' },
        { type: 'zakat', amount: 3500000, date: '2025-02-05', description: 'Zakat Profesi Ibu S.' },
        { type: 'infaq', amount: 1500000, date: '2025-02-20', description: 'Sedekah Jumat' },
        { type: 'zakat', amount: 7000000, date: '2025-03-12', description: 'Zakat Mal Perusahaan X' },
        { type: 'infaq', amount: 4000000, date: '2025-03-25', description: 'Infaq Pendidikan' },
        { type: 'zakat', amount: 4500000, date: '2025-04-05', description: 'Zakat Profesi' },
        { type: 'infaq', amount: 3000000, date: '2025-04-18', description: 'Infaq Kesehatan' },
        { type: 'zakat', amount: 6000000, date: '2025-05-02', description: 'Zakat Mal' },
        { type: 'infaq', amount: 2500000, date: '2025-05-15', description: 'Infaq Yatim' },
    ];
    const insert = db.prepare('INSERT INTO transactions (type, amount, date, description) VALUES (@type, @amount, @date, @description)');
    for (const t of seedTransactions) {
        insert.run(t);
    }
}

module.exports = db;
