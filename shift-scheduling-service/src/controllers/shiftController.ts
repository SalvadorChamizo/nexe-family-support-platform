import { FastifyRequest, FastifyReply } from 'fastify';
import { shiftService } from '../services/shiftService';
import { CreateShiftData, UpdateShiftData } from '../repositories/shiftRepository';

export class ShiftController {
    
    // GET /api/shifts - Obtener todos los turnos
    async getAll(request: FastifyRequest, reply: FastifyReply) {
        try {
            const shifts = await shiftService.getAllShifts();
            
            return reply.code(200).send({
                success: true,
                data: shifts
            });
        } catch (error) {
            return this.handleError(reply, error);
        }
    }
    
    // GET /api/shifts/:id - Obtener un turno específico
    async getById(
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const id = Number(request.params.id);
            
            // Validar que el ID es un número válido
            if (isNaN(id)) {
                return reply.code(400).send({
                    success: false,
                    error: 'Invalid ID format'
                });
            }
            
            const shift = await shiftService.getShiftById(id);
            
            if (!shift) {
                return reply.code(404).send({
                    success: false,
                    error: `Shift with id ${id} not found`
                });
            }
            
            return reply.code(200).send({
                success: true,
                data: shift
            });
        } catch (error) {
            return this.handleError(reply, error);
        }
    }
    
    // POST /api/shifts - Crear un nuevo turno
    async create(
        request: FastifyRequest<{ Body: CreateShiftData }>,
        reply: FastifyReply
    ) {
        try {
            const data = request.body;
            
            // Validación básica de campos obligatorios
            if (!data.user_id || !data.user_name || !data.date || 
                !data.start_time || !data.end_time || !data.hours || !data.role) {
                return reply.code(400).send({
                    success: false,
                    error: 'Missing required fields'
                });
            }
            
            // Crear el turno (el service valida las reglas de negocio)
            const newShift = await shiftService.createShift(data);
            
            return reply.code(201).send({
                success: true,
                message: 'Shift created successfully',
                data: newShift
            });
        } catch (error) {
            return this.handleError(reply, error);
        }
    }
    
    // PUT /api/shifts/:id - Actualizar un turno
    async update(
        request: FastifyRequest<{ 
            Params: { id: string };
            Body: UpdateShiftData;
        }>,
        reply: FastifyReply
    ) {
        try {
            const id = Number(request.params.id);
            const data = request.body;
            
            // Validar que el ID es un número válido
            if (isNaN(id)) {
                return reply.code(400).send({
                    success: false,
                    error: 'Invalid ID format'
                });
            }
            
            // Validación básica de campos obligatorios
            if (!data.user_id || !data.user_name || !data.date || 
                !data.start_time || !data.end_time || !data.hours || !data.role) {
                return reply.code(400).send({
                    success: false,
                    error: 'Missing required fields'
                });
            }
            
            // Actualizar el turno
            const updatedShift = await shiftService.updateShift(id, data);
            
            if (!updatedShift) {
                return reply.code(404).send({
                    success: false,
                    error: `Shift with id ${id} not found`
                });
            }
            
            return reply.code(200).send({
                success: true,
                message: `Shift ${id} updated successfully`,
                data: updatedShift
            });
        } catch (error) {
            return this.handleError(reply, error);
        }
    }
    
    // DELETE /api/shifts/:id - Eliminar un turno
    async delete(
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const id = Number(request.params.id);
            
            // Validar que el ID es un número válido
            if (isNaN(id)) {
                return reply.code(400).send({
                    success: false,
                    error: 'Invalid ID format'
                });
            }
            
            const deleted = await shiftService.deleteShift(id);
            
            if (!deleted) {
                return reply.code(404).send({
                    success: false,
                    error: `Shift with id ${id} not found`
                });
            }
            
            return reply.code(200).send({
                success: true,
                message: `Shift ${id} deleted successfully`
            });
        } catch (error) {
            return this.handleError(reply, error);
        }
    }
    
    // GET /api/shifts/user/:userId - Obtener turnos por usuario
    async getByUser(
        request: FastifyRequest<{ Params: { userId: string } }>,
        reply: FastifyReply
    ) {
        try {
            const { userId } = request.params;
            const shifts = await shiftService.getShiftsByUser(userId);
            
            return reply.code(200).send({
                success: true,
                data: shifts
            });
        } catch (error) {
            return this.handleError(reply, error);
        }
    }
    
    // GET /api/shifts/date/:date - Obtener turnos por fecha
    async getByDate(
        request: FastifyRequest<{ Params: { date: string } }>,
        reply: FastifyReply
    ) {
        try {
            const { date } = request.params;
            
            // Validar formato de fecha
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!dateRegex.test(date)) {
                return reply.code(400).send({
                    success: false,
                    error: 'Invalid date format. Use YYYY-MM-DD'
                });
            }
            
            const shifts = await shiftService.getShiftsByDate(date);
            
            return reply.code(200).send({
                success: true,
                data: shifts
            });
        } catch (error) {
            return this.handleError(reply, error);
        }
    }
    
    // GET /api/shifts/range?start=YYYY-MM-DD&end=YYYY-MM-DD
    async getByDateRange(
        request: FastifyRequest<{ 
            Querystring: { start: string; end: string } 
        }>,
        reply: FastifyReply
    ) {
        try {
            const { start, end } = request.query;
            
            // Validar que los parámetros existen
            if (!start || !end) {
                return reply.code(400).send({
                    success: false,
                    error: 'Missing start or end date parameters'
                });
            }
            
            // Validar formato de fechas
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!dateRegex.test(start) || !dateRegex.test(end)) {
                return reply.code(400).send({
                    success: false,
                    error: 'Invalid date format. Use YYYY-MM-DD'
                });
            }
            
            const shifts = await shiftService.getShiftsByDateRange(start, end);
            
            return reply.code(200).send({
                success: true,
                data: shifts
            });
        } catch (error) {
            return this.handleError(reply, error);
        }
    }
    
    // Método privado para manejar errores
    private handleError(reply: FastifyReply, error: unknown) {
        console.error('Error in ShiftController:', error);
        
        // Si es un error conocido (con mensaje)
        if (error instanceof Error) {
            return reply.code(400).send({
                success: false,
                error: error.message
            });
        }
        
        // Error desconocido
        return reply.code(500).send({
            success: false,
            error: 'Internal server error'
        });
    }
}

// Exportar instancia única (Singleton)
export const shiftController = new ShiftController();