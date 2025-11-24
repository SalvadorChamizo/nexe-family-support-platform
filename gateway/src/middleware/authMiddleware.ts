import { FastifyReply, FastifyRequest } from "fastify";
import { parse } from "url";
import jwt from "jsonwebtoken";

const publicUrls = [
    "/auth/login",
    "/auth/register",
    "/auth/refresh",
    "/ping",
    "/auth/verify-2fa",
    "/auth/forgot-password",
    "/auth/generate-qr",
    "/auth/google/login",
    "/auth/google/callback",
	"/medical_data/children",
	"/medical_data/children/:id",
	"/medical_data/children/:childId/medical",
	"/medical_data/children/:childId/medical/:id",
	"/medical_data/guardians",
	"/medical_data/guardians/:id",
	"/medical_data/children/:childId/guardians",
	"/medical_data/children/:childId/guardians/:id"
];

export async function authMiddleware(req: FastifyRequest, reply: FastifyReply) {
  const urlPath = req.url.split("?")[0];

  const isPublic = publicUrls.some((publicUrl) => {
    if (publicUrl.includes(":")) {
      const regex = new RegExp("^" + publicUrl.replace(/:[^/]+/g, "[^/]+") + "$");
      return regex.test(urlPath);
    }
    return publicUrl === urlPath;
  });

    if (isPublic) {
        return;
    }

    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return reply.code(401).send({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1]?.trim();
    if (!token) {
        return reply.code(401).send({ error: "Unauthorized: Malformed token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
            id: string;
            email: string;
            role: string;
            iat?: number;
            exp?: number;
        };
        console.log(`[Auth Middleware] Token validated successfully for user: ${decoded.email}`);

        req.user = decoded;

        // Only set x-user-id if it's not already set by the client
        // This allows endpoints to request data for other users (e.g., getting another user's avatar)
        if (!req.headers["x-user-id"]) {
            req.headers["x-user-id"] = decoded.id;
        }
        if (!req.headers["x-email"]) {
            req.headers["x-email"] = decoded.email;
        }
        if (!req.headers["x-role"]) {
            req.headers["x-role"] = decoded.role;
        }

    }   catch (err) {
            return reply.code(401).send({ error: "Unauthorized: Invalid or expired token" });
    }
}