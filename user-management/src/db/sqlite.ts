import Database from "better-sqlite3"

const db: any = new Database("/app/data/users.db");

db.prepare(`
	CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		email TEXT UNIQUE,
		password TEXT NOT NULL,
		role TEXT NOT NULL,
		created_at TEXT DEFAULT CURRENT_TIMESTAMP
	)
`).run();

export default db;