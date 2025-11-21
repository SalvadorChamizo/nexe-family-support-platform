import Database from "better-sqlite3"

const db: any = new Database("/app/data/users.db");

db.prepare(`
	CREATE TABLE IF NOT EXISTS children (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		first_name TEXT NOT NULL,
		last_name TEXT NOT NULL,
		birthdate TEXT NOT NULL,
		gender TEXT,
		notes TEXT,
		created_at TEXT DEFAULT CURRENT_TIMESTAMP,
		updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
	)
`).run();

db.prepare(`
	CREATE TABLE IF NOT EXISTS medical_info (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		child_id INTEGER NOT NULL,
		allergies TEXT,
		diagnosis TEXT,
		medications TEXT,
		created_at TEXT DEFAULT CURRENT_TIMESTAMP,
		updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE
		);
		)
		`).run();
		
db.prepare(`
	CREATE TABLE IF NOT EXISTS guardians (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		child_id INTEGER NOT NULL,
		user_id INTEGER UNIQUE NOT NULL,
		name TEXT NOT NULL,
		relationship TEXT,
		phone TEXT,
		email TEXT,
		address TEXT,
		created_at TEXT DEFAULT CURRENT_TIMESTAMP,
		updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE
	);
`).run();

db.prepare(`
	CREATE TABLE IF NOT EXISTS staff (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		role TEXT NOT NULL,
		phone TEXT,
		email TEXT,
		created_at TEXT DEFAULT CURRENT_TIMESTAMP
	);
`).run();

db.prepare(`
	CREATE TABLE child_staff (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		child_id INTEGER NOT NULL,
		staff_id INTEGER NOT NULL,
		role TEXT,
		FOREIGN KEY(child_id) REFERENCES children(id),
		FOREIGN KEY(staff_id) REFERENCES staff(id)
	);
`).run();

export default db;