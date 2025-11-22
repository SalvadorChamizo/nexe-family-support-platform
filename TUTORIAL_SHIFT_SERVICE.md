# 🎯 TUTORIAL: Crear tu Servicio de Gestión de Turnos

## 📋 Objetivo
Crear un microservicio para gestionar turnos de trabajo/voluntarios para la Fundación Nexe.

---

## 🏗️ PASO 1: Copiar el template

```bash
# Desde la raíz del proyecto
cp -r service_template/ shift-scheduling-service
cd shift-scheduling-service
```

---

## 📝 PASO 2: Definir qué hace tu servicio

### Funcionalidades principales:
- ✅ Crear turnos
- ✅ Listar turnos (todos, por usuario, por fecha)
- ✅ Actualizar turnos
- ✅ Eliminar turnos
- ✅ Asignar voluntarios a turnos
- ✅ Ver disponibilidad

### Modelo de datos (Turno):
```typescript
{
  id: number,
  title: string,              // "Terapia con Pablo", "Limpieza"
  description: string,
  date: string,               // "2025-11-21"
  startTime: string,          // "09:00"
  endTime: string,            // "17:00"
  assignedUserId?: number,    // ID del voluntario asignado
  status: "open" | "assigned" | "completed" | "cancelled",
  location?: string,
  maxVolunteers?: number,
  createdAt: string,
  updatedAt: string
}
```

---

## 💾 PASO 3: Configurar la base de datos

### 3.1 Editar `src/db/sqlite.ts`

```typescript
import Database from "better-sqlite3";
import path from "path";

const DB_PATH = process.env.DB_PATH || "./data/shifts.db";

// Asegurarse de que la carpeta existe
import fs from "fs";
const dir = path.dirname(DB_PATH);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

const db = new Database(DB_PATH, { verbose: console.log });

// Crear tabla de turnos
db.exec(`
    CREATE TABLE IF NOT EXISTS shifts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        date TEXT NOT NULL,
        start_time TEXT NOT NULL,
        end_time TEXT NOT NULL,
        assigned_user_id INTEGER,
        status TEXT DEFAULT 'open',
        location TEXT,
        max_volunteers INTEGER DEFAULT 1,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
    )
`);

console.log("✅ Database initialized: shifts.db");

export default db;
```

---

## 🗄️ PASO 4: Crear el Repository (acceso a datos)

### 4.1 Editar `src/repositories/shiftRepository.ts`

```typescript
import db from "../db/sqlite";

export interface Shift {
    id?: number;
    title: string;
    description?: string;
    date: string;
    start_time: string;
    end_time: string;
    assigned_user_id?: number;
    status?: "open" | "assigned" | "completed" | "cancelled";
    location?: string;
    max_volunteers?: number;
    created_at?: string;
    updated_at?: string;
}

export class ShiftRepository {
    // Crear un turno
    create(shift: Shift): Shift {
        const stmt = db.prepare(`
            INSERT INTO shifts (
                title, description, date, start_time, end_time,
                assigned_user_id, status, location, max_volunteers
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        const result = stmt.run(
            shift.title,
            shift.description || null,
            shift.date,
            shift.start_time,
            shift.end_time,
            shift.assigned_user_id || null,
            shift.status || "open",
            shift.location || null,
            shift.max_volunteers || 1
        );

        return this.findById(result.lastInsertRowid as number)!;
    }

    // Buscar por ID
    findById(id: number): Shift | undefined {
        const stmt = db.prepare("SELECT * FROM shifts WHERE id = ?");
        return stmt.get(id) as Shift | undefined;
    }

    // Listar todos
    findAll(): Shift[] {
        const stmt = db.prepare("SELECT * FROM shifts ORDER BY date, start_time");
        return stmt.all() as Shift[];
    }

    // Buscar por fecha
    findByDate(date: string): Shift[] {
        const stmt = db.prepare("SELECT * FROM shifts WHERE date = ? ORDER BY start_time");
        return stmt.all(date) as Shift[];
    }

    // Buscar por usuario asignado
    findByUserId(userId: number): Shift[] {
        const stmt = db.prepare("SELECT * FROM shifts WHERE assigned_user_id = ? ORDER BY date, start_time");
        return stmt.all(userId) as Shift[];
    }

    // Actualizar
    update(id: number, shift: Partial<Shift>): Shift | undefined {
        const updates: string[] = [];
        const values: any[] = [];

        if (shift.title !== undefined) {
            updates.push("title = ?");
            values.push(shift.title);
        }
        if (shift.description !== undefined) {
            updates.push("description = ?");
            values.push(shift.description);
        }
        if (shift.date !== undefined) {
            updates.push("date = ?");
            values.push(shift.date);
        }
        if (shift.start_time !== undefined) {
            updates.push("start_time = ?");
            values.push(shift.start_time);
        }
        if (shift.end_time !== undefined) {
            updates.push("end_time = ?");
            values.push(shift.end_time);
        }
        if (shift.assigned_user_id !== undefined) {
            updates.push("assigned_user_id = ?");
            values.push(shift.assigned_user_id);
        }
        if (shift.status !== undefined) {
            updates.push("status = ?");
            values.push(shift.status);
        }
        if (shift.location !== undefined) {
            updates.push("location = ?");
            values.push(shift.location);
        }

        if (updates.length === 0) return this.findById(id);

        updates.push("updated_at = datetime('now')");
        values.push(id);

        const stmt = db.prepare(`
            UPDATE shifts SET ${updates.join(", ")} WHERE id = ?
        `);
        stmt.run(...values);

        return this.findById(id);
    }

    // Eliminar
    delete(id: number): boolean {
        const stmt = db.prepare("DELETE FROM shifts WHERE id = ?");
        const result = stmt.run(id);
        return result.changes > 0;
    }

    // Buscar turnos disponibles (sin asignar)
    findAvailable(): Shift[] {
        const stmt = db.prepare(`
            SELECT * FROM shifts 
            WHERE status = 'open' AND assigned_user_id IS NULL
            ORDER BY date, start_time
        `);
        return stmt.all() as Shift[];
    }
}
```

---

## 🎮 PASO 5: Crear el Service (lógica de negocio)

### 5.1 Editar `src/services/shiftService.ts`

```typescript
import { ShiftRepository, Shift } from "../repositories/shiftRepository";

const shiftRepo = new ShiftRepository();

export class ShiftService {
    // Crear turno con validaciones
    createShift(shiftData: Shift) {
        // Validaciones
        if (!shiftData.title || shiftData.title.trim().length === 0) {
            throw new Error("Title is required");
        }

        if (!shiftData.date || !this.isValidDate(shiftData.date)) {
            throw new Error("Invalid date format. Use YYYY-MM-DD");
        }

        if (!shiftData.start_time || !this.isValidTime(shiftData.start_time)) {
            throw new Error("Invalid start time format. Use HH:MM");
        }

        if (!shiftData.end_time || !this.isValidTime(shiftData.end_time)) {
            throw new Error("Invalid end time format. Use HH:MM");
        }

        // Verificar que end_time > start_time
        if (shiftData.end_time <= shiftData.start_time) {
            throw new Error("End time must be after start time");
        }

        return shiftRepo.create(shiftData);
    }

    // Listar todos los turnos
    getAllShifts() {
        return shiftRepo.findAll();
    }

    // Obtener turno por ID
    getShiftById(id: number) {
        const shift = shiftRepo.findById(id);
        if (!shift) {
            throw new Error("Shift not found");
        }
        return shift;
    }

    // Obtener turnos por fecha
    getShiftsByDate(date: string) {
        if (!this.isValidDate(date)) {
            throw new Error("Invalid date format. Use YYYY-MM-DD");
        }
        return shiftRepo.findByDate(date);
    }

    // Obtener turnos de un usuario
    getShiftsByUser(userId: number) {
        return shiftRepo.findByUserId(userId);
    }

    // Obtener turnos disponibles
    getAvailableShifts() {
        return shiftRepo.findAvailable();
    }

    // Actualizar turno
    updateShift(id: number, updates: Partial<Shift>) {
        const shift = shiftRepo.findById(id);
        if (!shift) {
            throw new Error("Shift not found");
        }

        // Validaciones opcionales
        if (updates.date && !this.isValidDate(updates.date)) {
            throw new Error("Invalid date format");
        }
        if (updates.start_time && !this.isValidTime(updates.start_time)) {
            throw new Error("Invalid start time format");
        }
        if (updates.end_time && !this.isValidTime(updates.end_time)) {
            throw new Error("Invalid end time format");
        }

        return shiftRepo.update(id, updates);
    }

    // Asignar voluntario a un turno
    assignVolunteer(shiftId: number, userId: number) {
        const shift = shiftRepo.findById(shiftId);
        if (!shift) {
            throw new Error("Shift not found");
        }

        if (shift.status !== "open") {
            throw new Error("Shift is not available");
        }

        if (shift.assigned_user_id) {
            throw new Error("Shift already assigned");
        }

        return shiftRepo.update(shiftId, {
            assigned_user_id: userId,
            status: "assigned"
        });
    }

    // Desasignar voluntario
    unassignVolunteer(shiftId: number) {
        const shift = shiftRepo.findById(shiftId);
        if (!shift) {
            throw new Error("Shift not found");
        }

        return shiftRepo.update(shiftId, {
            assigned_user_id: undefined,
            status: "open"
        });
    }

    // Marcar turno como completado
    completeShift(shiftId: number) {
        const shift = shiftRepo.findById(shiftId);
        if (!shift) {
            throw new Error("Shift not found");
        }

        return shiftRepo.update(shiftId, { status: "completed" });
    }

    // Eliminar turno
    deleteShift(id: number) {
        const result = shiftRepo.delete(id);
        if (!result) {
            throw new Error("Shift not found");
        }
        return { success: true, message: "Shift deleted successfully" };
    }

    // Utilidades de validación
    private isValidDate(date: string): boolean {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(date)) return false;
        const d = new Date(date);
        return d instanceof Date && !isNaN(d.getTime());
    }

    private isValidTime(time: string): boolean {
        const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        return regex.test(time);
    }
}
```

---

## 🎛️ PASO 6: Crear el Controller

### 6.1 Editar `src/controllers/shiftController.ts`

```typescript
import { FastifyReply, FastifyRequest } from "fastify";
import { ShiftService } from "../services/shiftService";

const shiftService = new ShiftService();

// POST /shifts - Crear turno
export async function createShiftController(
    req: FastifyRequest<{ Body: any }>,
    reply: FastifyReply
) {
    try {
        const shift = shiftService.createShift(req.body);
        return reply.code(201).send(shift);
    } catch (error: any) {
        return reply.code(400).send({ error: error.message });
    }
}

// GET /shifts - Listar todos los turnos
export async function getAllShiftsController(
    req: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const shifts = shiftService.getAllShifts();
        return reply.send(shifts);
    } catch (error: any) {
        return reply.code(500).send({ error: error.message });
    }
}

// GET /shifts/:id - Obtener turno específico
export async function getShiftByIdController(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
) {
    try {
        const shift = shiftService.getShiftById(parseInt(req.params.id));
        return reply.send(shift);
    } catch (error: any) {
        return reply.code(404).send({ error: error.message });
    }
}

// GET /shifts/date/:date - Turnos por fecha
export async function getShiftsByDateController(
    req: FastifyRequest<{ Params: { date: string } }>,
    reply: FastifyReply
) {
    try {
        const shifts = shiftService.getShiftsByDate(req.params.date);
        return reply.send(shifts);
    } catch (error: any) {
        return reply.code(400).send({ error: error.message });
    }
}

// GET /shifts/user/:userId - Turnos de un usuario
export async function getShiftsByUserController(
    req: FastifyRequest<{ Params: { userId: string } }>,
    reply: FastifyReply
) {
    try {
        const shifts = shiftService.getShiftsByUser(parseInt(req.params.userId));
        return reply.send(shifts);
    } catch (error: any) {
        return reply.code(400).send({ error: error.message });
    }
}

// GET /shifts/available - Turnos disponibles
export async function getAvailableShiftsController(
    req: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const shifts = shiftService.getAvailableShifts();
        return reply.send(shifts);
    } catch (error: any) {
        return reply.code(500).send({ error: error.message });
    }
}

// PUT /shifts/:id - Actualizar turno
export async function updateShiftController(
    req: FastifyRequest<{ Params: { id: string }; Body: any }>,
    reply: FastifyReply
) {
    try {
        const shift = shiftService.updateShift(parseInt(req.params.id), req.body);
        return reply.send(shift);
    } catch (error: any) {
        return reply.code(400).send({ error: error.message });
    }
}

// POST /shifts/:id/assign - Asignar voluntario
export async function assignVolunteerController(
    req: FastifyRequest<{ Params: { id: string }; Body: { userId: number } }>,
    reply: FastifyReply
) {
    try {
        const shift = shiftService.assignVolunteer(
            parseInt(req.params.id),
            req.body.userId
        );
        return reply.send(shift);
    } catch (error: any) {
        return reply.code(400).send({ error: error.message });
    }
}

// POST /shifts/:id/unassign - Desasignar voluntario
export async function unassignVolunteerController(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
) {
    try {
        const shift = shiftService.unassignVolunteer(parseInt(req.params.id));
        return reply.send(shift);
    } catch (error: any) {
        return reply.code(400).send({ error: error.message });
    }
}

// POST /shifts/:id/complete - Marcar como completado
export async function completeShiftController(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
) {
    try {
        const shift = shiftService.completeShift(parseInt(req.params.id));
        return reply.send(shift);
    } catch (error: any) {
        return reply.code(400).send({ error: error.message });
    }
}

// DELETE /shifts/:id - Eliminar turno
export async function deleteShiftController(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
) {
    try {
        const result = shiftService.deleteShift(parseInt(req.params.id));
        return reply.send(result);
    } catch (error: any) {
        return reply.code(404).send({ error: error.message });
    }
}
```

---

## 🛣️ PASO 7: Crear las rutas

### 7.1 Editar `src/routes/shiftRoutes.ts`

```typescript
import { FastifyInstance } from "fastify";
import {
    createShiftController,
    getAllShiftsController,
    getShiftByIdController,
    getShiftsByDateController,
    getShiftsByUserController,
    getAvailableShiftsController,
    updateShiftController,
    assignVolunteerController,
    unassignVolunteerController,
    completeShiftController,
    deleteShiftController,
} from "../controllers/shiftController";

export default async function shiftRoutes(app: FastifyInstance) {
    // Crear turno
    app.post("/shifts", createShiftController);

    // Listar todos
    app.get("/shifts", getAllShiftsController);

    // Turnos disponibles
    app.get("/shifts/available", getAvailableShiftsController);

    // Turnos por fecha
    app.get("/shifts/date/:date", getShiftsByDateController);

    // Turnos por usuario
    app.get("/shifts/user/:userId", getShiftsByUserController);

    // Obtener turno específico
    app.get("/shifts/:id", getShiftByIdController);

    // Actualizar turno
    app.put("/shifts/:id", updateShiftController);

    // Asignar voluntario
    app.post("/shifts/:id/assign", assignVolunteerController);

    // Desasignar voluntario
    app.post("/shifts/:id/unassign", unassignVolunteerController);

    // Marcar completado
    app.post("/shifts/:id/complete", completeShiftController);

    // Eliminar turno
    app.delete("/shifts/:id", deleteShiftController);
}
```

---

## 🚀 PASO 8: Actualizar index.ts

### 8.1 Editar `src/index.ts`

```typescript
import Fastify from "fastify";
import dotenv from "dotenv";
import shiftRoutes from "./routes/shiftRoutes";
import "./db/sqlite"; // Inicializar DB

dotenv.config();

const app = Fastify({ logger: true });

app.register(shiftRoutes);

const PORT = process.env.PORT || 8083;

app.listen({ port: Number(PORT), host: "0.0.0.0" })
    .then(() => console.log(`🚀 Shift Scheduling Service running on port ${PORT}`));
```

---

## ⚙️ PASO 9: Configuración

### 9.1 Crear `.env`

```bash
PORT=8083
DB_PATH=./data/shifts.db
NODE_ENV=development
```

### 9.2 Actualizar `package.json`

```json
{
  "name": "shift-scheduling-service",
  "version": "1.0.0",
  "description": "Shift scheduling management service for Nexe Family Support Platform",
  "main": "index.js",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "start": "tsx src/index.ts",
    "build": "tsc"
  },
  "dependencies": {
    "better-sqlite3": "^12.2.0",
    "dotenv": "^17.2.1",
    "fastify": "^5.5.0"
  },
  "devDependencies": {
    "@types/better-sqlite3": "^7.6.13",
    "@types/node": "^24.3.0",
    "tsx": "^4.7.0",
    "typescript": "^5.9.2"
  }
}
```

---

## 🐳 PASO 10: Dockerizar

El `Dockerfile` ya existe en el template, solo verifica que sea:

```dockerfile
FROM nexe-node-base:latest

WORKDIR /app

COPY package*.json tsconfig.json ./

RUN npm install

COPY . .

EXPOSE 8083

CMD ["npx", "tsx", "src/index.ts"]
```

---

## 🔗 PASO 11: Conectar al sistema

### 11.1 Añadir al `docker-compose.yml` (en la raíz)

```yaml
  shift-scheduling-service:
    build: ./shift-scheduling-service
    expose:
      - "8083"
    depends_on:
      - node-base
    volumes:
      - shift_data:/app/data
    environment:
      - PORT=8083
      - DB_PATH=/app/data/shifts.db
    networks:
      - backend
```

Y añade el volumen:

```yaml
volumes:
  auth_data:
  user_data:
  shift_data:
  frontend_dist:
```

### 11.2 Crear ruta en Gateway

Crea `gateway/src/routes/shiftRoutes.ts`:

```typescript
import { FastifyInstance } from "fastify";
import fastifyHttpProxy from "@fastify/http-proxy";

export default async function shiftRoutes(app: FastifyInstance) {
    app.register(fastifyHttpProxy, {
        upstream: "http://shift-scheduling-service:8083",
        prefix: "/api/shifts",
        rewritePrefix: "/shifts",
    });
}
```

### 11.3 Registrar en `gateway/src/index.ts`

```typescript
import shiftRoutes from "./routes/shiftRoutes";
// ... otras importaciones

// ... después de otras rutas
app.register(shiftRoutes);
```

---

## ✅ PASO 12: Probar

```bash
# 1. Levantar todo
make up

# 2. Ver logs
sudo docker compose logs -f shift-scheduling-service

# 3. Crear un turno
curl -X POST http://localhost:8080/api/shifts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Terapia con Pablo",
    "description": "Sesión de fisioterapia",
    "date": "2025-11-22",
    "start_time": "10:00",
    "end_time": "11:30",
    "location": "Sala 3"
  }'

# 4. Listar turnos
curl http://localhost:8080/api/shifts

# 5. Ver turnos disponibles
curl http://localhost:8080/api/shifts/available

# 6. Asignar voluntario
curl -X POST http://localhost:8080/api/shifts/1/assign \
  -H "Content-Type: application/json" \
  -d '{"userId": 1}'
```

---

## 🎉 ¡Ya tienes tu microservicio!

### Próximos pasos:
1. ✅ Añadir autenticación (middleware del gateway)
2. ✅ Validar que el usuario existe antes de asignar
3. ✅ Añadir notificaciones cuando se asigna un turno
4. ✅ Crear frontend para gestionar turnos
5. ✅ Añadir filtros avanzados (por estado, rango de fechas)
6. ✅ Reportes (turnos completados, estadísticas)

¡Ahora empieza a desarrollar! 🚀
