import { FastifyInstance } from "fastify";
import fastifyHttpProxy from "@fastify/http-proxy";
import { authMiddleware } from "../middleware/authMiddleware";

export default async function springRoutes(app: FastifyInstance) {
  app.register(async function (protectedRoutes: FastifyInstance) {
    protectedRoutes.register(fastifyHttpProxy, {
      upstream: "http://spring-microservice:8085",
      prefix: "/medicine",
      rewritePrefix: "",
      async preHandler(req, reply) {

       

        
        await authMiddleware(req, reply);

        if (req.user) {
          reply.headers({
            "x-user-id": req.user.id,
            "x-username": req.user.username,
          });
        }

        console.log("Forwarding headers to user service:", {
          "x-user-id": req.user?.id,
          "x-username": req.user?.username,
        });
      },
    });
  });
}
