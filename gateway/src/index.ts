import Fastify from "fastify";
import dotenv from "dotenv";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";

import { authMiddleware } from "./middleware/authMiddleware";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";

import springRoutes from "./routes/springRoutes";


// Loads .env variables into process.env
dotenv.config();

// Creates a Fastify instance with logger activated
const app = Fastify({ logger: true });

// Register auth middleware BEFORE routes
app.addHook("preHandler", authMiddleware);

app.register(authRoutes);
app.register(userRoutes);

app.register(springRoutes);

// CORS
const whitelist = ["https://localhost:8443"];
app.register(cors, {
  origin: (origin, callback) => {

    if (!origin) return callback(null, true);


    const localNetworkPattern = /.*/;

    if (
      whitelist.includes(origin) ||
      localNetworkPattern.test(origin)
    ) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"), false);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
});

app.register(helmet, {
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: true,
  crossOriginResourcePolicy: { policy: "same-origin" },
  referrerPolicy: { policy: "no-referrer" },
  frameguard: { action: "deny" },
  hidePoweredBy: true,
});

// Endpoint to test the server
app.get("/ping", async () => ({ pong: true }));

const PORT = process.env.PORT || 8080;

const listeners = ['SIGINT', 'SIGTERM'];
listeners.forEach((signal) => {
  process.on(signal, async () => {
    await app.close();
    process.exit(0);
  });
});

async function main() {
  await app.listen({ port: Number(PORT), host: "0.0.0.0" })
    .then(() => console.log(`Server running on port ${PORT}`));
}

main();