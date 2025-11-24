import bcrypt from "bcrypt";
import { FastifyReply, FastifyRequest } from "fastify";
import { 
	registerUser, 
	changeEmail,
	changePassword,
	getUserById, 
	getUserByEmail, 
	userRemover
} from "../services/usersService";

export async function registerController(req: FastifyRequest, reply: FastifyReply) {
	const { email, username, password } = req.body as { email: string; username: string; password: string };

	try {

		const userEmail = await getUserByEmail(email);
		if (userEmail)
			throw new Error("Email already exists");

		const hashed = await bcrypt.hash(password, 10);
		const result = await registerUser(email, username, hashed);
		return reply.send(result);
	} 
	catch (err: any) {
		console.error("Error occurred during user registration:", err);
		return reply.code(400).send({ error: err.message });	
	}
}

export async function emailChanger(req: FastifyRequest, reply: FastifyReply) {
	const { newEmail } = req.body as { newEmail: string };
	const userId = req.headers["x-user-id"];

	if (!userId) {
		return reply.code(401).send({ error: "Not authenticated" });
	}

	try {
		const existingUser = await getUserByEmail(newEmail);
		if (existingUser) {
			return reply.code(400).send({ error: "Email already exists" });
		};
		const result = await changeEmail(userId, newEmail);
		return reply.send({ result });
	} catch (err: any) {
		console.error("Error occurred during email change:", err);
		return reply.code(400).send({ error: err.message });
	}
}

export async function userGetterByEmail(req: FastifyRequest, reply: FastifyReply) {
	const { email } = req.body as { email: string };

	try {
		const user = await getUserByEmail(email);
		return reply.send({
			id: user.id,
			username: user.username,
			email: user.email
		});
	} catch (err: any) {
		return reply.code(400).send({ error: err.message });
	}
}

export async function userGetterById(req: FastifyRequest, reply: FastifyReply) {
	const { id } = req.body as { id: number };

	try {
		const user = await getUserById(id);
		return reply.send({
			id: user.id,
			username: user.username,
			email: user.email
		});
	} catch (err: any) {
		return reply.code(400).send({ error: err.message });
	}
}

export async function passwordControl(req: FastifyRequest, reply: FastifyReply) {
	const { username, password } = req.body as { username: string; password: string };

	try {
		const user = await getUserById(1);
		if (!user.id) 
			throw new Error("User not found");
		const valid = await bcrypt.compare(password, user.password);
		if (!valid)
			throw new Error("Invalid password");
		return reply.send({ message: "Password is valid" });
	} catch (err: any) {
		return reply.code(400).send({ error: err.message });
	}
}

export async function passwordChanger(req: FastifyRequest, reply: FastifyReply) {
	const userId = req.headers["x-user-id"];
	const { newPassword } = req.body as { newPassword: string };

	try {
		const user = await getUserById(Number(userId));
		if (!user.id) throw new Error("User not found");

		const valid = await bcrypt.compare(newPassword, user.password);
		if (valid)
			throw new Error("Invalid password");

		const hashedNewPassword = await bcrypt.hash(newPassword, 10);
		await changePassword(userId, hashedNewPassword);
		return reply.send({ message: "Password changed successfully" });
	} catch (err: any) {
		return reply.code(400).send({ error: err.message });
	}
}

export async function passwordChangerController(req: FastifyRequest, reply: FastifyReply) {
	const { newPassword, userId } = req.body as { newPassword: string, userId: number };

	try {
		const user = await getUserById(Number(userId));
		if (!user.id) throw new Error("User not found");

		const valid = await bcrypt.compare(newPassword, user.password);
		if (valid)
			throw new Error("Invalid password");

		const hashedNewPassword = await bcrypt.hash(newPassword, 10);
		await changePassword(userId, hashedNewPassword);
		return reply.send({ message: "Password changed successfully" });
	} catch (err: any) {
		return reply.code(400).send({ error: err.message });
	}
}

export async function getCurrentUserController(req: FastifyRequest, reply: FastifyReply) {
	const userId = req.headers["x-user-id"];
	const username = req.headers["x-username"];

  if (!userId || !username) {
	console.log("❌ Missing user headers, not authenticated");
	return reply.code(401).send({ error: "Not authenticated" });
  }

	const user = await getUserById(Number(userId));
	return { user };
}

export async function removeUser(req: FastifyRequest, reply: FastifyReply) {
	const userId = req.headers["x-user-id"];

	try {
		userRemover(userId);
		return reply.send({ message: "User removed successfully" });
	}
	catch (err: any) {
		return reply.code(400).send({ error: err.message });
	}
}
