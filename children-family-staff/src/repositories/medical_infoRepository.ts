import db from '../db/sqlite';

export interface MedicalInfo {
    id: number;
    child_id: number;
    allergies?: string;
    diagnosis?: string;
    medications?: string;
    created_at: string;
    updated_at: string;
}

export interface CreateMedicalInfoInput {
    child_id: number;
    allergies?: string;
    diagnosis?: string;
    medications?: string;
}

export interface UpdateMedicalInfoInput {
    allergies?: string;
    diagnosis?: string;
    medications?: string;
}

export function getMedicalInfoByChildId(childId: number): MedicalInfo | undefined {
    return db.prepare('SELECT * FROM medical_info WHERE child_id = ?').get(childId);
}

export function getMedicalInfoById(id: number): MedicalInfo | undefined {
    return db.prepare('SELECT * FROM medical_info WHERE id = ?').get(id);
}

export function createMedicalInfo(data: CreateMedicalInfoInput): MedicalInfo {
    const result = db.prepare(`
        INSERT INTO medical_info (child_id, allergies, diagnosis, medications)
        VALUES (?, ?, ?, ?)
    `).run(
        data.child_id,
        data.allergies || null,
        data.diagnosis || null,
        data.medications || null
    );

    return db.prepare('SELECT * FROM medical_info WHERE id = ?').get(result.lastInsertRowid);
}

export function updateMedicalInfo(id: number, data: UpdateMedicalInfoInput): MedicalInfo | undefined {
    const medicalInfo = getMedicalInfoById(id);
    
    if (!medicalInfo) {
        return undefined;
    }

    db.prepare(`
        UPDATE medical_info 
        SET allergies = COALESCE(?, allergies),
            diagnosis = COALESCE(?, diagnosis),
            medications = COALESCE(?, medications),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `).run(
        data.allergies,
        data.diagnosis,
        data.medications,
        id
    );

    return getMedicalInfoById(id);
}

export function deleteMedicalInfo(id: number): boolean {
    const medicalInfo = getMedicalInfoById(id);
    
    if (!medicalInfo) {
        return false;
    }

    db.prepare('DELETE FROM medical_info WHERE id = ?').run(id);
    return true;
}