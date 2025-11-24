import { FastifyReply, FastifyRequest } from "fastify";
import {
    getChildren,
    getChildById,
    createChild,
    updateChild,
    deleteChild,
    CreateChildInput,
    UpdateChildInput
} from '../repositories/childrenRepository';

export async function getAllChildren(request: FastifyRequest, reply: FastifyReply) {
    try {
        const children = getChildren();
        
        return reply.code(200).send({
            success: true,
            data: children
        });
    } catch (error) {
        return reply.code(500).send({
            success: false,
            error: 'Error al obtener los niños'
        });
    }
}

export async function getChildByIdController(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        const childId = parseInt(id);

        if (isNaN(childId)) {
            return reply.code(400).send({
                success: false,
                error: 'ID inválido'
            });
        }

        const child = getChildById(childId);
        
        if (!child) {
            return reply.code(404).send({
                success: false,
                error: 'Niño no encontrado'
            });
        }
        
        return reply.code(200).send({
            success: true,
            data: child
        });
    } catch (error) {
        return reply.code(500).send({
            success: false,
            error: 'Error al obtener el niño'
        });
    }
}

export async function createChildController(
    request: FastifyRequest<{ Body: CreateChildInput }>,
    reply: FastifyReply
) {
    try {
        const { first_name, last_name, birthdate, gender, notes } = request.body;

        if (!first_name || !last_name || !birthdate) {
            return reply.code(400).send({
                success: false,
                error: 'Faltan campos requeridos: first_name, last_name, birthdate'
            });
        }

        const newChild = createChild({
            first_name,
            last_name,
            birthdate,
            gender,
            notes
        });

        return reply.code(201).send({
            success: true,
            data: newChild
        });
    } catch (error) {
        return reply.code(500).send({
            success: false,
            error: 'Error al crear el niño'
        });
    }
}

export async function updateChildController(
    request: FastifyRequest<{
        Params: { id: string };
        Body: UpdateChildInput;
    }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        const childId = parseInt(id);

        if (isNaN(childId)) {
            return reply.code(400).send({
                success: false,
                error: 'ID inválido'
            });
        }

        const updatedChild = updateChild(childId, request.body);

        if (!updatedChild) {
            return reply.code(404).send({
                success: false,
                error: 'Niño no encontrado'
            });
        }

        return reply.code(200).send({
            success: true,
            data: updatedChild
        });
    } catch (error) {
        return reply.code(500).send({
            success: false,
            error: 'Error al actualizar el niño'
        });
    }
}

export async function deleteChildController(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        const childId = parseInt(id);

        if (isNaN(childId)) {
            return reply.code(400).send({
                success: false,
                error: 'ID inválido'
            });
        }

        const deleted = deleteChild(childId);

        if (!deleted) {
            return reply.code(404).send({
                success: false,
                error: 'Niño no encontrado'
            });
        }

        return reply.code(200).send({
            success: true,
            message: 'Niño eliminado correctamente'
        });
    } catch (error) {
        return reply.code(500).send({
            success: false,
            error: 'Error al eliminar el niño'
        });
    }
}