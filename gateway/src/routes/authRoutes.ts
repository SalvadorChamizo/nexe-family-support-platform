import { FastifyInstance } from "fastify";
import fastifyHttpProxy from "@fastify/http-proxy";

export default async function authRoutes(app: FastifyInstance) {
    app.register(fastifyHttpProxy, {
        upstream: "http://auth-service:8081",
        prefix: "/auth",
        rewritePrefix: "",
    });
}