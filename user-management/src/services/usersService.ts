import * as fs from "fs";
import path from "path";

import { 
	createUser,
	emailChanger,
	passwordChanger,
	findUserById,
	findUserByEmail,
	findAllUsers,
	removeUser
} from "../repositories/usersRepository";

export async function registerUser(email: string, username: string, password: string) {
	createUser(username, password, email);
	return { message: "User registered successfully" };
}

export async function changeEmail(id: number, newEmail: string) {
	emailChanger(id, newEmail);
	return { message: "Email changed successfully" };
}

export async function changePassword(id: number, hashedNewPassword: string) {
	passwordChanger(id, hashedNewPassword);
	return { message: "Password changed successfully" };
}

export async function getUserById(id: number) {
	const user = findUserById(id);
	return user;
}

export async function getUserByEmail(email: string) {
	const user = findUserByEmail(email);
	return user;
}

export async function userRemover(id: number) {
	const result = removeUser(id);
	if (result.changes === 0) {
		throw new Error("No user found with the given ID");
	}
	
	// Delete chat data (conversations, messages, blocks) for this user
	try {
		const chatServiceUrl = process.env.CHAT_SERVICE_URL || 'http://chat-service:8083';
		const response = await fetch(`${chatServiceUrl}/users/${id}/data`, {
			method: 'DELETE'
		});

		const res = await fetch("http://auth-service:8081/deleteAuthUser", {
			method: "DELETE",
        	headers: { "Content-Type": "application/json" },
        	body: JSON.stringify({ userId: id }),
		})
		if (!response.ok) {
			console.error(`Failed to delete chat data for user ${id}:`, await response.text());
		} else if (!res.ok) {
			console.error(`Failed to delete auth data for user ${id}`);
		} else {
			console.log(`Chat data and auth data deleted successfully for user ${id}`);
		}
	} catch (error) {
		console.error(`Error deleting chat data for user ${id}:`, error);
		// Don't throw - we still want to delete the user even if chat cleanup fails
	}
}

export async function getAllUsers() {
	const users = findAllUsers();
	return users;
}
