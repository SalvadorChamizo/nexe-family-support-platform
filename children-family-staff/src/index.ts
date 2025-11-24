import Fastify from "fastify";
import multipart from "@fastify/multipart";

import usersRoutes from "./routes/childrenRoutes";
import medicalInfoRoutes from "./routes/medicalInfoRoutes";
import guardiansRoutes from "routes/guardiansRoutes";

const app = Fastify({ logger: true });

app.register(multipart, {
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max
  },
});

app.register(usersRoutes);
app.register(medicalInfoRoutes);
app.register(guardiansRoutes);

const PORT = process.env.PORT || 8086;

app.listen({ port: Number(PORT), host: "0.0.0.0" })
	.then(() => console.log(`children-service listening on port: ${PORT}`));