import { FastifyInstance } from 'fastify';

import { FastifyInstance } from 'fastify';
import {
    getMedicalInfoByChild,
    createMedicalInfoController,
    updateMedicalInfoController,
    deleteMedicalInfoController
} from '../controllers/medical_infoController';

export default async function medicalInfoRoutes(fastify: FastifyInstance) {
    
    // GET /medical_data/children/:childId/medical - Obtener info médica de un niño
    fastify.get('/children/:childId/medical', getMedicalInfoByChild);

    // POST /medical_data/children/medical - Crear info médica
    fastify.post('/children/medical', createMedicalInfoController);

    // PUT /medical_data/children/:childId/medical/:id - Actualizar info médica
    fastify.put('/children/:childId/medical/:id', updateMedicalInfoController);

    // DELETE /medical_data/children/:childId/medical/:id - Eliminar info médica
    fastify.delete('/children/:childId/medical/:id', deleteMedicalInfoController);
}