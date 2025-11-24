import db from '../db/sqlite';

export interface Guardian {
    id: number;
    child_id: number;
    user_id: number;
    name: string;
    relationship?: string;
    phone?: string;
    email?: string;
    address?: string;
    created_at: string;
    updated_at: string;
}

export interface CreateGuardianInput {
    child_id: number;
    user_id: number;
    name: string;
    relationship?: string;
    phone?: string;
    email?: string;
    address?: string;
}

export interface UpdateGuardianInput {
    name?: string;
    relationship?: string;
    phone?: string;
    email?: string;
    address?: string;
}

export function getAllGuardians(): Guardian[] {
    return db.prepare('SELECT * FROM guardians').all();
}

export function getGuardiansByChildId(childId: number): Guardian[] {
    return db.prepare('SELECT * FROM guardians WHERE child_id = ?').all(childId);
}

export function getGuardianById(id: number): Guardian | undefined {
    return db.prepare('SELECT * FROM guardians WHERE id = ?').get(id);
}

export function getGuardianByUserId(userId: number): Guardian | undefined {
    return db.prepare('SELECT * FROM guardians WHERE user_id = ?').get(userId);
}

export function createGuardian(data: CreateGuardianInput): Guardian {
    const result = db.prepare(`
        INSERT INTO guardians (child_id, user_id, name, relationship, phone, email, address)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
        data.child_id,
        data.user_id,
        data.name,
        data.relationship || null,
        data.phone || null,
        data.email || null,
        data.address || null
    );

    return db.prepare('SELECT * FROM guardians WHERE id = ?').get(result.lastInsertRowid);
}

export function updateGuardian(id: number, data: UpdateGuardianInput): Guardian | undefined {
    const guardian = getGuardianById(id);
    
    if (!guardian) {
        return undefined;
    }

    db.prepare(`
        UPDATE guardians 
        SET name = COALESCE(?, name),
            relationship = COALESCE(?, relationship),
            phone = COALESCE(?, phone),
            email = COALESCE(?, email),
            address = COALESCE(?, address),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `).run(
        data.name,
        data.relationship,
        data.phone,
        data.email,
        data.address,
        id
    );

    return getGuardianById(id);
}

export function deleteGuardian(id: number): boolean {
    const guardian = getGuardianById(id);
    
    if (!guardian) {
        return false;
    }

    db.prepare('DELETE FROM guardians WHERE id = ?').run(id);
    return true;
}