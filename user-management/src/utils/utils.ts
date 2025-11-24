import db from "../db/sqlite";
import bcrypt from "bcrypt";

export function initAdmin() {
  const stmt = db.prepare("SELECT * FROM users WHERE role = 'admin'");

  const admin = stmt.get();

  if (!admin) {
    const passwordHash = bcrypt.hashSync("Admin123!", 10);

    db.prepare(`
      INSERT INTO users (email, password, role)
      VALUES (?, ?, ?)
    `).run("admin@system.local", passwordHash, "admin");

    console.log("⚠ Admin user created:");
    console.log("   Email: admin@system.local");
    console.log("   Password: Admin123!");
  }
}