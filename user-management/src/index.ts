import Fastify from "fastify";
import multipart from "@fastify/multipart";
import { initAdmin } from "./utils/utils";

import usersRoutes from "./routes/usersRoutes";
import { removeInactiveUsers } from "./repositories/usersRepository";

const app = Fastify({ logger: true });

initAdmin();

app.register(multipart, {
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max
  },
});

app.register(usersRoutes);

const PORT = 8082;

app.listen({ port: Number(PORT), host: "0.0.0.0" })
	.then(() => console.log(`user-service listening on port: 8082`));