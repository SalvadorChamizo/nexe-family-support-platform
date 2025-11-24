import { FastifyReply, FastifyRequest } from "fastify";
import { getChildById } from '../repositories/childrenRepository';
import {
    getAllGuardians,
    getGuardiansByChildId,
    getGuardianById,
    getGuardianByUserId,
    createGuardian,
    updateGuardian,
    deleteGuardian,
    CreateGuardianInput,
    UpdateGuardianInput
} from '../repositories/guardiansRepository';

export async function getAllGuardiansController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const guardians = getAllGuardians();
        
        return reply.code(200).send({
            success: true,
            data: guardians
        });
    } catch (error) {
        return reply.code(500).send({
            success: false,
            error: 'Error al obtener tutores'
        });
    }
}

export async function getGuardiansByChildController(
    request: FastifyRequest<{ Params: { childId: string } }>,
    reply: FastifyReply
) {
    try {
        const { childId } = request.params;
        const childIdNum = parseInt(childId);

        if (isNaN(childIdNum)) {
            return reply.code(400).send({
                success: false,
                error: 'ID de niño inválido'
            });
        }

        const child = getChildById(childIdNum);
        
        if (!child) {
            return reply.code(404).send({
                success: false,
                error: 'Niño no encontrado'
            });
        }

        const guardians = getGuardiansByChildId(childIdNum);
        
        return reply.code(200).send({
            success: true,
            data: guardians
        });
    } catch (error) {
        return reply.code(500).send({
            success: false,
            error: 'Error al obtener tutores'
        });
    }
}

export async function getGuardianByIdController(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        const guardianId = parseInt(id);

        if (isNaN(guardianId)) {
            return reply.code(400).send({
                success: false,
                error: 'ID inválido'
            });
        }

        const guardian = getGuardianById(guardianId);
        
        if (!guardian) {
            return reply.code(404).send({
                success: false,
                error: 'Tutor no encontrado'
            });
        }
        
        return reply.code(200).send({
            success: true,
            data: guardian
        });
    } catch (error) {
        return reply.code(500).send({
            success: false,
            error: 'Error al obtener tutor'
        });
    }
}

export async function createGuardianController(
    request: FastifyRequest<{
        Params: { childId: string };
        Body: Omit<CreateGuardianInput, 'child_id'>;
    }>,
    reply: FastifyReply
) {
    try {
        const { childId } = request.params;
        const childIdNum = parseInt(childId);

        if (isNaN(childIdNum)) {
            return reply.code(400).send({
                success: false,
                error: 'ID de niño inválido'
            });
        }

        const { user_id, name, relationship, phone, email, address } = request.body;

        if (!user_id || !name) {
            return reply.code(400).send({
                success: false,
                error: 'Faltan campos requeridos: user_id, name'
            });
        }

        const child = getChildById(childIdNum);
        
        if (!child) {
            return reply.code(404).send({
                success: false,
                error: 'Niño no encontrado'
            });
        }

        const existingGuardian = getGuardianByUserId(user_id);
        
        if (existingGuardian) {
            return reply.code(400).send({
                success: false,
                error: 'Este user_id ya está registrado como tutor'
            });
        }

        const newGuardian = createGuardian({
            child_id: childIdNum,
            user_id,
            name,
            relationship,
            phone,
            email,
            address
        });

        return reply.code(201).send({
            success: true,
            data: newGuardian
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error al crear tutor';
        
        if (errorMessage.includes('UNIQUE constraint failed')) {
            return reply.code(400).send({
                success: false,
                error: 'Este user_id ya está registrado como tutor'
            });
        }
        
        return reply.code(500).send({
            success: false,
            error: 'Error al crear tutor'
        });
    }
}

export async function updateGuardianController(
    request: FastifyRequest<{
        Params: { id: string };
        Body: UpdateGuardianInput;
    }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        const guardianId = parseInt(id);

        if (isNaN(guardianId)) {
            return reply.code(400).send({
                success: false,
                error: 'ID inválido'
            });
        }

        const updatedGuardian = updateGuardian(guardianId, request.body);

        if (!updatedGuardian) {
            return reply.code(404).send({
                success: false,
                error: 'Tutor no encontrado'
            });
        }

        return reply.code(200).send({
            success: true,
            data: updatedGuardian
        });
    } catch (error) {
        return reply.code(500).send({
            success: false,
            error: 'Error al actualizar tutor'
        });
    }
}

export async function deleteGuardianController(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        const guardianId = parseInt(id);

        if (isNaN(guardianId)) {
            return reply.code(400).send({
                success: false,
                error: 'ID inválido'
            });
        }

        const deleted = deleteGuardian(guardianId);

        if (!deleted) {
            return reply.code(404).send({
                success: false,
                error: 'Tutor no encontrado'
            });
        }

        return reply.code(200).send({
            success: true,
            message: 'Tutor eliminado correctamente'
        });
    } catch (error) {
        return reply.code(500).send({
            success: false,
            error: 'Error al eliminar tutor'
        });
    }
}