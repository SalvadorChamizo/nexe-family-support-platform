import { FastifyInstance } from "fastify";

export default async function gatewayRoutes(app: FastifyInstance) {
    // Health check endpoint
    app.get("/health", async () => {
        return { 
            status: "healthy", 
            service: "gateway",
            timestamp: new Date().toISOString()
        };
    });

    // Info endpoint
    app.get("/info", async () => {
        return {
            name: "Nexe Family Support Platform - API Gateway",
            version: "1.0.0",
            services: {
                auth: "http://auth-service:8081",
                users: "http://user-management-service:8082"
            }
        };
    });
}
