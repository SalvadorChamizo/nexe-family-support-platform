import db from '../db/sqlite';

export interface Child {
    id: number;
    first_name: string;
    last_name: string;
    birthdate: string;
    gender?: string;
    notes?: string;
    created_at: string;
    updated_at: string;
}

export interface CreateChildInput {
    first_name: string;
    last_name: string;
    birthdate: string;
    gender?: string;
    notes?: string;
}

export interface UpdateChildInput {
    first_name?: string;
    last_name?: string;
    birthdate?: string;
    gender?: string;
    notes?: string;
}

export function getChildren(): Child[] {
    return db.prepare('SELECT * FROM children').all();
}

export function getChildById(id: number): Child | undefined {
    return db.prepare('SELECT * FROM children WHERE id = ?').get(id);
}

export function createChild(data: CreateChildInput): Child {
    const result = db.prepare(`
        INSERT INTO children (first_name, last_name, birthdate, gender, notes)
        VALUES (?, ?, ?, ?, ?)
    `).run(
        data.first_name,
        data.last_name,
        data.birthdate,
        data.gender || null,
        data.notes || null
    );

    return db.prepare('SELECT * FROM children WHERE id = ?').get(result.lastInsertRowid);
}

export function updateChild(id: number, data: UpdateChildInput): Child | undefined {
    const child = getChildById(id);
    
    if (!child) {
        return undefined;
    }

    db.prepare(`
        UPDATE children 
        SET first_name = COALESCE(?, first_name),
            last_name = COALESCE(?, last_name),
            birthdate = COALESCE(?, birthdate),
            gender = COALESCE(?, gender),
            notes = COALESCE(?, notes),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `).run(
        data.first_name,
        data.last_name,
        data.birthdate,
        data.gender,
        data.notes,
        id
    );

    return getChildById(id);
}

export function deleteChild(id: number): boolean {
    const child = getChildById(id);
    
    if (!child) {
        return false;
    }

    db.prepare('DELETE FROM children WHERE id = ?').run(id);
    return true;
}