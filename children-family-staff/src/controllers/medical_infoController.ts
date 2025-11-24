import { FastifyReply, FastifyRequest } from "fastify";
import { getChildById } from '../repositories/childrenRepository';
import {
    getMedicalInfoByChildId,
    getMedicalInfoById,
    createMedicalInfo,
    updateMedicalInfo,
    deleteMedicalInfo,
    CreateMedicalInfoInput,
    UpdateMedicalInfoInput
} from '../repositories/medical_infoRepository';

export async function getMedicalInfoByChild(
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

        const medicalInfo = getMedicalInfoByChildId(childIdNum);
        
        if (!medicalInfo) {
            return reply.code(404).send({
                success: false,
                error: 'Información médica no encontrada'
            });
        }
        
        return reply.code(200).send({
            success: true,
            data: medicalInfo
        });
    } catch (error) {
        return reply.code(500).send({
            success: false,
            error: 'Error al obtener información médica'
        });
    }
}

export async function createMedicalInfoController(
    request: FastifyRequest, reply: FastifyReply) {
    try {
        const { childId, allergies, medications, diagnosis } = request.body as { childId: string, allergies?: string, medications?: string, diagnosis?: string };
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

        const existingMedicalInfo = getMedicalInfoByChildId(childIdNum);
        
        if (existingMedicalInfo) {
            return reply.code(400).send({
                success: false,
                error: 'Este niño ya tiene información médica registrada'
            });
        }

        const { allergies, diagnosis, medications } = request.body;

        const newMedicalInfo = createMedicalInfo({
            child_id: childIdNum,
            allergies,
            diagnosis,
            medications
        });

        return reply.code(201).send({
            success: true,
            data: newMedicalInfo
        });
    } catch (error) {
        return reply.code(500).send({
            success: false,
            error: 'Error al crear información médica'
        });
    }
}

export async function updateMedicalInfoController(
    request: FastifyRequest<{
        Params: { childId: string; id: string };
        Body: UpdateMedicalInfoInput;
    }>,
    reply: FastifyReply
) {
    try {
        const { childId, id } = request.params;
        const childIdNum = parseInt(childId);
        const medicalInfoId = parseInt(id);

        if (isNaN(childIdNum) || isNaN(medicalInfoId)) {
            return reply.code(400).send({
                success: false,
                error: 'ID inválido'
            });
        }

        const medicalInfo = getMedicalInfoById(medicalInfoId);
        
        if (!medicalInfo) {
            return reply.code(404).send({
                success: false,
                error: 'Información médica no encontrada'
            });
        }

        if (medicalInfo.child_id !== childIdNum) {
            return reply.code(400).send({
                success: false,
                error: 'La información médica no pertenece a este niño'
            });
        }

        const updatedMedicalInfo = updateMedicalInfo(medicalInfoId, request.body);

        return reply.code(200).send({
            success: true,
            data: updatedMedicalInfo
        });
    } catch (error) {
        return reply.code(500).send({
            success: false,
            error: 'Error al actualizar información médica'
        });
    }
}

export async function deleteMedicalInfoController(
    request: FastifyRequest<{
        Params: { childId: string; id: string };
    }>,
    reply: FastifyReply
) {
    try {
        const { childId, id } = request.params;
        const childIdNum = parseInt(childId);
        const medicalInfoId = parseInt(id);

        if (isNaN(childIdNum) || isNaN(medicalInfoId)) {
            return reply.code(400).send({
                success: false,
                error: 'ID inválido'
            });
        }

        const medicalInfo = getMedicalInfoById(medicalInfoId);
        
        if (!medicalInfo) {
            return reply.code(404).send({
                success: false,
                error: 'Información médica no encontrada'
            });
        }

        if (medicalInfo.child_id !== childIdNum) {
            return reply.code(400).send({
                success: false,
                error: 'La información médica no pertenece a este niño'
            });
        }

        const deleted = deleteMedicalInfo(medicalInfoId);

        return reply.code(200).send({
            success: true,
            message: 'Información médica eliminada correctamente'
        });
    } catch (error) {
        return reply.code(500).send({
            success: false,
            error: 'Error al eliminar información médica'
        });
    }
}