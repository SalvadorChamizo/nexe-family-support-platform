import { db } from '../db/database';

// Interfaz para el tipo Shift
export interface Shift {
    id: number;
    user_id: string;
    user_name: string;
    date: string;
    start_time: string;
    end_time: string;
    hours: number;
    role: string;
    notes: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

// Interfaz para crear un shift (sin id, created_at, updated_at, deleted_at)
export interface CreateShiftData {
    user_id: string;
    user_name: string;
    date: string;
    start_time: string;
    end_time: string;
    hours: number;
    role: string;
    notes?: string;
}

// Interfaz para actualizar un shift
export interface UpdateShiftData {
    user_id: string;
    user_name: string;
    date: string;
    start_time: string;
    end_time: string;
    hours: number;
    role: string;
    notes?: string;
}

export class ShiftRepository {
    
    // Obtener todos los turnos activos (no eliminados)
    findAll(): Shift[] {
        const stmt = db.prepare(`
            SELECT * FROM shifts 
            WHERE deleted_at IS NULL 
            ORDER BY date DESC, start_time ASC
        `);
        
        return stmt.all() as Shift[];
    }
    
    // Obtener un turno por ID
    findById(id: number): Shift | undefined {
        const stmt = db.prepare(`
            SELECT * FROM shifts 
            WHERE id = ? AND deleted_at IS NULL
        `);
        
        return stmt.get(id) as Shift | undefined;
    }
    
    // Crear un nuevo turno
    create(data: CreateShiftData): Shift {
        const stmt = db.prepare(`
            INSERT INTO shifts (
                user_id, user_name, date, start_time, end_time, 
                hours, role, notes
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `);
        
        const result = stmt.run(
            data.user_id,
            data.user_name,
            data.date,
            data.start_time,
            data.end_time,
            data.hours,
            data.role,
            data.notes || ''
        );
        
        // Obtener el shift recién creado
        return this.findById(result.lastInsertRowid as number)!;
    }
    
    // Actualizar un turno
    update(id: number, data: UpdateShiftData): Shift | undefined {
        // Verificar que existe
        const exists = this.findById(id);
        if (!exists) {
            return undefined;
        }
        
        const stmt = db.prepare(`
            UPDATE shifts 
            SET user_id = ?, 
                user_name = ?, 
                date = ?, 
                start_time = ?, 
                end_time = ?, 
                hours = ?, 
                role = ?, 
                notes = ?,
                updated_at = datetime('now')
            WHERE id = ? AND deleted_at IS NULL
        `);
        
        stmt.run(
            data.user_id,
            data.user_name,
            data.date,
            data.start_time,
            data.end_time,
            data.hours,
            data.role,
            data.notes || '',
            id
        );
        
        // Devolver el shift actualizado
        return this.findById(id);
    }
    
    // Eliminar un turno (soft delete)
    delete(id: number): boolean {
        // Verificar que existe
        const exists = this.findById(id);
        if (!exists) {
            return false;
        }
        
        const stmt = db.prepare(`
            UPDATE shifts 
            SET deleted_at = datetime('now')
            WHERE id = ? AND deleted_at IS NULL
        `);
        
        const result = stmt.run(id);
        return result.changes > 0;
    }
    
    // Búsqueda por usuario
    findByUserId(userId: string): Shift[] {
        const stmt = db.prepare(`
            SELECT * FROM shifts 
            WHERE user_id = ? AND deleted_at IS NULL
            ORDER BY date DESC, start_time ASC
        `);
        
        return stmt.all(userId) as Shift[];
    }
    
    // Búsqueda por fecha
    findByDate(date: string): Shift[] {
        const stmt = db.prepare(`
            SELECT * FROM shifts 
            WHERE date = ? AND deleted_at IS NULL
            ORDER BY start_time ASC
        `);
        
        return stmt.all(date) as Shift[];
    }
    
    // Búsqueda por rango de fechas
    findByDateRange(startDate: string, endDate: string): Shift[] {
        const stmt = db.prepare(`
            SELECT * FROM shifts 
            WHERE date BETWEEN ? AND ? 
            AND deleted_at IS NULL
            ORDER BY date ASC, start_time ASC
        `);
        
        return stmt.all(startDate, endDate) as Shift[];
    }
}

// Exportar instancia única (Singleton)
export const shiftRepository = new ShiftRepository();