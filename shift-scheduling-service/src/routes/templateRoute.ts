import { FastifyInstance } from "fastify";
import { stringify } from "querystring";

export default async function shiftRoutes(fastify: FastifyInstance) {

	fastify.get("/shifts", async (request, reply) => {
		return {
			success: true,
			data: [
				{
                id: 1,
                userId: 'user123',
                userName: 'Juan Pérez',
                date: '2025-11-21',
                startTime: '09:00',
                endTime: '17:00',
                hours: 8,
                role: 'Voluntario'
            },
            {
                id: 2,
                userId: 'user456',
                userName: 'María García',
                date: '2025-11-22',
                startTime: '10:00',
                endTime: '16:00',
                hours: 6,
                role: 'Coordinador'
            }
			]
		};
	});

	fastify.get<{ Params: { id: string } }>("/shifts/:id", async (request, reply) => {
		const { id } = request.params;

		const shift = [
			{
            id: 1,
            userId: 'user123',
            userName: 'Juan Pérez',
            date: '2025-11-21',
            startTime: '09:00',
            endTime: '17:00',
            hours: 8,
            role: 'Voluntario',
            notes: 'Turno de mañana'
        },
        {
            id: 2,
            userId: 'user456',
            userName: 'María García',
            date: '2025-11-22',
            startTime: '10:00',
            endTime: '16:00',
            hours: 6,
            role: 'Coordinador',
            notes: 'Turno tarde'
        }
		].find(s => s.id === Number(id));

		if (!shift) {
			return reply.code(404).send({
				success: false,
				error: "Shift not found"
			});
		}

		return {
			success: true,
			data: shift
		};
	});

	fastify.post<{ Body: { userId: string; userName: string; date: string; startTime: string; endTime: string; hours: number; role: string } }>("/shifts", async (request, reply) => {
		const { userId, userName, date, startTime, endTime, hours, role } = request.body;

		if (!userId || !userName || !date || !startTime || !endTime || !hours || !role) {
			return reply.code(400).send({
				success: false,
				error: "Missing required fields"
			});
		}

		const newShift = {
			id: Math.floor(Math.random() * 1000) + 3,
			userId,
			userName,
			date,
			startTime,
			endTime,
			hours,
			role,
			createdAt: new Date().toISOString()
		};

		return reply.code(201).send({
			success: true,
			message: 'Turno creado exitosamente',
			data: newShift
		});
	});
	
	fastify.put<{ 
		Params: { id: string }; 
		Body: { userId: string; userName: string; date: string; startTime: string; endTime: string; hours: number; role: string; notes?: string }
	}>("/shifts/:id", async (request, reply) => {
		const { id } = request.params;
		const { userId, userName, date, startTime, endTime, hours, role, notes } = request.body;
		
		if (!userId || !userName || !date || !startTime || !endTime || !hours || !role) {
			return reply.code(400).send({
				success: false,
				error: 'Missing required fields'
			});
		}
		
		const shiftExists = [1, 2, 3].includes(Number(id));
		
		if (!shiftExists) {
			return reply.code(404).send({
				success: false,
				error: `Shift with id ${id} not found`
			});
		}
		
		const updatedShift = {
			id: Number(id),
			userId,
			userName,
			date,
			startTime,
			endTime,
			hours,
			role,
			notes: notes || '',
			updatedAt: new Date().toISOString()
		};
		
		return reply.code(200).send({
			success: true,
			message: `Shift ${id} updated successfully`,
			data: updatedShift
		});
	});

	fastify.delete<{ Params: { id : string } }>("/shifts/:id", async (request, reply) => {
		const { id } = request.params;

		const shiftExists = [1, 2, 3].includes(Number(id));

		if (!shiftExists) {
			return reply.code(404).send({
				success: false,
				error: "Shift not found"
			});
		}

		return reply.code(200).send({
			success: true,
			message: `Shift ${id} deleted successfully`
		});
	});
}