import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';  // ← NUEVO
import dotenv from 'dotenv';
import path from 'path';  // ← NUEVO
import { fileURLToPath } from 'url';  // ← NUEVO
import shiftRoutes from './routes/templateRoute';
import { initializeDatabase, closeDatabase } from './db/database';

dotenv.config();

const fastify = Fastify({ 
    logger: true
});

const PORT = Number(process.env.PORT) || 8083;

// Configurar CORS
fastify.register(cors, {
    origin: true,
    credentials: true
});

// ← NUEVO: Configurar archivos estáticos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

fastify.register(fastifyStatic, {
    root: path.join(__dirname, '..', 'public'),
    prefix: '/',
});

// Inicializar base de datos
initializeDatabase();

// Registrar rutas de API
fastify.register(shiftRoutes, { prefix: '/api' });

// Ruta de health check
fastify.get('/health', async (request, reply) => {
    return { 
        status: 'ok',
        timestamp: new Date().toISOString()
    };
});

const start = async () => {
    try {
        await fastify.listen({ 
            port: PORT, 
            host: '0.0.0.0' 
        });
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        console.log(`📄 Frontend disponible en http://localhost:${PORT}`);
        console.log(`🔌 API disponible en http://localhost:${PORT}/api`);
    } catch (err) {
        fastify.log.error(err);
        closeDatabase();
        process.exit(1);
    }
};

// Manejar cierre limpio
process.on('SIGINT', () => {
    console.log('\n🛑 Cerrando servidor...');
    closeDatabase();
    fastify.close().then(() => {
        console.log('✅ Servidor cerrado');
        process.exit(0);
    });
});

start();