import { FastifyInstance } from "fastify";
import fastifyHttpProxy from "@fastify/http-proxy";
import { authMiddleware } from "../middleware/authMiddleware";

export default async function springRoutes(app: FastifyInstance) {
  app.register(async function (protectedRoutes: FastifyInstance) {
    protectedRoutes.register(fastifyHttpProxy, {
      upstream: "http://demo-service:8081", // <-- URL de tu microservicio
      prefix: "/demo",                      // <-- prefijo en el gateway
      rewritePrefix: "",
      async preHandler(req, reply) {
        // Si quieres protegerlo con JWT:
        await authMiddleware(req, reply);

        if (req.user) {
          reply.headers({
            "x-user-id": req.user.id,
            "x-username": req.user.username,
          });
        }

        console.log("Forwarding headers to demo service:", {
          "x-user-id": req.user?.id,
          "x-username": req.user?.username,
        });
      },
    });
  });
}

