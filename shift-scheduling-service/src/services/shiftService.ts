import { shiftRepository, Shift, CreateShiftData, UpdateShiftData } from '../repositories/shiftRepository';

export class ShiftService {
    
    // Obtener todos los turnos
    async getAllShifts(): Promise<Shift[]> {
        return shiftRepository.findAll();
    }
    
    // Obtener un turno por ID
    async getShiftById(id: number): Promise<Shift | null> {
        const shift = shiftRepository.findById(id);
        return shift || null;
    }
    
    // Crear un nuevo turno
    async createShift(data: CreateShiftData): Promise<Shift> {
        // Validaciones de negocio
        this.validateShiftData(data);
        
        // Verificar que no haya solapamiento de horarios
        await this.checkTimeConflicts(data.user_id, data.date, data.start_time, data.end_time);
        
        // Crear el turno
        return shiftRepository.create(data);
    }
    
    // Actualizar un turno
    async updateShift(id: number, data: UpdateShiftData): Promise<Shift | null> {
        // Validaciones de negocio
        this.validateShiftData(data);
        
        // Verificar que existe
        const exists = shiftRepository.findById(id);
        if (!exists) {
            return null;
        }
        
        // Verificar solapamiento (excluyendo el turno actual)
        await this.checkTimeConflicts(data.user_id, data.date, data.start_time, data.end_time, id);
        
        // Actualizar
        const updated = shiftRepository.update(id, data);
        return updated || null;
    }
    
    // Eliminar un turno
    async deleteShift(id: number): Promise<boolean> {
        return shiftRepository.delete(id);
    }
    
    // Obtener turnos por usuario
    async getShiftsByUser(userId: string): Promise<Shift[]> {
        return shiftRepository.findByUserId(userId);
    }
    
    // Obtener turnos por fecha
    async getShiftsByDate(date: string): Promise<Shift[]> {
        return shiftRepository.findByDate(date);
    }
    
    // Obtener turnos por rango de fechas
    async getShiftsByDateRange(startDate: string, endDate: string): Promise<Shift[]> {
        // Validar que startDate <= endDate
        if (startDate > endDate) {
            throw new Error('Start date must be before or equal to end date');
        }
        
        return shiftRepository.findByDateRange(startDate, endDate);
    }
    
    // Validar datos del turno
    private validateShiftData(data: CreateShiftData | UpdateShiftData): void {
        // Validar formato de fecha (YYYY-MM-DD)
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(data.date)) {
            throw new Error('Invalid date format. Use YYYY-MM-DD');
        }
        
        // Validar formato de hora (HH:MM)
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(data.start_time)) {
            throw new Error('Invalid start_time format. Use HH:MM');
        }
        if (!timeRegex.test(data.end_time)) {
            throw new Error('Invalid end_time format. Use HH:MM');
        }
        
        // Validar que start_time < end_time
        if (data.start_time >= data.end_time) {
            throw new Error('start_time must be before end_time');
        }
        
        // Validar que hours sea positivo y razonable
        if (data.hours <= 0 || data.hours > 24) {
            throw new Error('hours must be between 1 and 24');
        }
        
        // Validar longitud de campos
        if (data.user_id.length === 0 || data.user_id.length > 255) {
            throw new Error('user_id must be between 1 and 255 characters');
        }
        if (data.user_name.length === 0 || data.user_name.length > 255) {
            throw new Error('user_name must be between 1 and 255 characters');
        }
        if (data.role.length === 0 || data.role.length > 100) {
            throw new Error('role must be between 1 and 100 characters');
        }
        if (data.notes && data.notes.length > 1000) {
            throw new Error('notes must be less than 1000 characters');
        }
    }
    
    // Verificar conflictos de horarios
    private async checkTimeConflicts(
        userId: string, 
        date: string, 
        startTime: string, 
        endTime: string,
        excludeShiftId?: number
    ): Promise<void> {
        // Obtener todos los turnos del usuario en esa fecha
        const userShifts = shiftRepository.findByUserId(userId);
        const shiftsOnDate = userShifts.filter(shift => shift.date === date);
        
        // Verificar solapamiento
        for (const shift of shiftsOnDate) {
            // Si estamos actualizando, excluir el turno actual
            if (excludeShiftId && shift.id === excludeShiftId) {
                continue;
            }
            
            // Verificar si hay solapamiento de horarios
            const hasConflict = this.checkTimeOverlap(
                startTime, endTime,
                shift.start_time, shift.end_time
            );
            
            if (hasConflict) {
                throw new Error(
                    `Time conflict: User already has a shift from ${shift.start_time} to ${shift.end_time} on ${date}`
                );
            }
        }
    }
    
    // Verificar si dos rangos de tiempo se solapan
    private checkTimeOverlap(
        start1: string, end1: string,
        start2: string, end2: string
    ): boolean {
        // Convertir a minutos para comparar
        const toMinutes = (time: string) => {
            const [hours, minutes] = time.split(':').map(Number);
            return hours * 60 + minutes;
        };
        
        const start1Min = toMinutes(start1);
        const end1Min = toMinutes(end1);
        const start2Min = toMinutes(start2);
        const end2Min = toMinutes(end2);
        
        // Hay solapamiento si:
        // - El nuevo turno empieza antes de que termine el existente
        // - Y el nuevo turno termina después de que empieza el existente
        return start1Min < end2Min && end1Min > start2Min;
    }
}

// Exportar instancia única (Singleton)
export const shiftService = new ShiftService();