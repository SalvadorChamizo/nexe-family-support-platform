import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { join } from 'path';

// Ruta al archivo de la base de datos
const DB_PATH = join(__dirname, '..', '..', 'shifts.db');

// Crear/abrir conexión a la base de datos
export const db = new Database(DB_PATH, {
    verbose: console.log  // Log de queries (útil en desarrollo)
});

// Habilitar foreign keys (para relaciones entre tablas)
db.pragma('foreign_keys = ON');

// Función para inicializar la base de datos
export function initializeDatabase() {
    try {
        // Leer el archivo schema.sql
        const schemaPath = join(__dirname, 'schema.sql');
        const schema = readFileSync(schemaPath, 'utf-8');
        
        // Ejecutar el schema (crear tablas e índices)
        db.exec(schema);
        
        console.log('✅ Database initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing database:', error);
        throw error;
    }
}

// Función para cerrar la base de datos (al apagar el servidor)
export function closeDatabase() {
    db.close();
    console.log('🔒 Database connection closed');
}