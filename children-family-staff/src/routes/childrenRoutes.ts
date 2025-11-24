import { FastifyInstance } from 'fastify';
import {
    getAllChildren,
    getChildByIdController,
    createChildController,
    updateChildController,
    deleteChildController
} from '../controllers/childrenController';

export default async function childrenRoutes(fastify: FastifyInstance) {
    
    // GET /medical_data/children - Obtener todos los niños
    fastify.get('/children', getAllChildren);

    // GET /medical_data/children/:id - Obtener un niño por ID
    fastify.get('/children/:id', getChildByIdController);

    // POST /medical_data/children - Crear un nuevo niño
    fastify.post('/children', createChildController);

    // PUT /medical_data/children/:id - Actualizar un niño
    fastify.put('/children/:id', updateChildController);

    // DELETE /medical_data/children/:id - Eliminar un niño
    fastify.delete('/children/:id', deleteChildController);
}