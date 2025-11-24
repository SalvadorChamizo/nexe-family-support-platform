import { FastifyInstance } from 'fastify';
import {
    getAllGuardiansController,
    getGuardiansByChildController,
    getGuardianByIdController,
    createGuardianController,
    updateGuardianController,
    deleteGuardianController
} from '../controllers/guardiansController';

export default async function guardiansRoutes(fastify: FastifyInstance) {
    
    // GET /api/guardians - Obtener todos los tutores
    fastify.get('/guardians', getAllGuardiansController);

    // GET /api/guardians/:id - Obtener un tutor por ID
    fastify.get('/guardians/:id', getGuardianByIdController);

    // GET /api/children/:childId/guardians - Obtener tutores de un niño
    fastify.get('/children/:childId/guardians', getGuardiansByChildController);

    // POST /api/children/:childId/guardians - Crear tutor para un niño
    fastify.post('/children/:childId/guardians', createGuardianController);

    // PUT /api/guardians/:id - Actualizar tutor
    fastify.put('/guardians/:id', updateGuardianController);

    // DELETE /api/guardians/:id - Eliminar tutor
    fastify.delete('/guardians/:id', deleteGuardianController);
}