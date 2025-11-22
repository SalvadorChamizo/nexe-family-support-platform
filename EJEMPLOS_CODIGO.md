# 💡 EJEMPLOS PRÁCTICOS - Entendiendo el Código

## 🎯 Objetivo
Ver ejemplos concretos de cómo funciona cada capa del microservicio.

---

## 📁 1. ESTRUCTURA DE CAPAS

```
REQUEST → ROUTE → CONTROLLER → SERVICE → REPOSITORY → DATABASE
         (URL)   (HTTP)       (Lógica)  (SQL)        (SQLite)
```

---

## 🔄 2. EJEMPLO COMPLETO: Crear un Usuario

### 2.1 Cliente hace la petición
```bash
curl -X POST http://localhost:8080/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Juan", "email": "juan@example.com"}'
```

### 2.2 Route - Define el endpoint (routes/userRoutes.ts)
```typescript
import { FastifyInstance } from "fastify";
import { createUserController } from "../controllers/userController";

export default async function userRoutes(app: FastifyInstance) {
    // Define: POST /users llama a createUserController
    app.post("/users", createUserController);
}
```

**¿Qué hace?**
- Registra la URL `/users` con método POST
- Dice: "cuando llegue una petición POST a /users, ejecuta createUserController"

---

### 2.3 Controller - Maneja la petición HTTP (controllers/userController.ts)
```typescript
import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/userService";

const userService = new UserService();

export async function createUserController(
    req: FastifyRequest<{ Body: { name: string; email: string } }>,
    reply: FastifyReply
) {
    try {
        // 1. Obtener datos del body de la petición
        const { name, email } = req.body;

        // 2. Llamar al servicio (lógica de negocio)
        const user = userService.createUser(name, email);

        // 3. Devolver respuesta exitosa
        return reply.code(201).send(user);
    } catch (error: any) {
        // 4. Manejar errores
        return reply.code(400).send({ error: error.message });
    }
}
```

**¿Qué hace?**
- Recibe la petición HTTP
- Extrae los datos (body, params, headers)
- Llama al servicio
- Devuelve la respuesta HTTP (código + datos)
- Maneja errores

---

### 2.4 Service - Lógica de negocio (services/userService.ts)
```typescript
import { UserRepository } from "../repositories/userRepository";

const userRepo = new UserRepository();

export class UserService {
    createUser(name: string, email: string) {
        // 1. VALIDACIONES
        if (!name || name.trim().length === 0) {
            throw new Error("Name is required");
        }

        if (!email || !this.isValidEmail(email)) {
            throw new Error("Invalid email");
        }

        // 2. LÓGICA DE NEGOCIO
        // Por ejemplo: verificar que el email no existe
        const existingUser = userRepo.findByEmail(email);
        if (existingUser) {
            throw new Error("Email already exists");
        }

        // 3. LLAMAR AL REPOSITORY para guardar en DB
        const user = userRepo.create({ name, email });

        // 4. LÓGICA ADICIONAL (opcional)
        // Por ejemplo: enviar email de bienvenida
        // this.sendWelcomeEmail(email);

        return user;
    }

    private isValidEmail(email: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
}
```

**¿Qué hace?**
- Valida los datos
- Implementa reglas de negocio (ej: email único)
- Llama al repository para acceder a datos
- Puede llamar a otros servicios (emails, notificaciones, etc.)
- NO sabe de HTTP (puede usarse en CLI, tests, etc.)

---

### 2.5 Repository - Acceso a datos (repositories/userRepository.ts)
```typescript
import db from "../db/sqlite";

export interface User {
    id?: number;
    name: string;
    email: string;
    created_at?: string;
}

export class UserRepository {
    // CREATE
    create(user: User): User {
        const stmt = db.prepare(`
            INSERT INTO users (name, email) 
            VALUES (?, ?)
        `);
        
        const result = stmt.run(user.name, user.email);
        
        return this.findById(result.lastInsertRowid as number)!;
    }

    // READ - buscar por ID
    findById(id: number): User | undefined {
        const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
        return stmt.get(id) as User | undefined;
    }

    // READ - buscar por email
    findByEmail(email: string): User | undefined {
        const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
        return stmt.get(email) as User | undefined;
    }

    // READ - listar todos
    findAll(): User[] {
        const stmt = db.prepare("SELECT * FROM users ORDER BY created_at DESC");
        return stmt.all() as User[];
    }

    // UPDATE
    update(id: number, data: Partial<User>): User | undefined {
        const updates: string[] = [];
        const values: any[] = [];

        if (data.name !== undefined) {
            updates.push("name = ?");
            values.push(data.name);
        }
        if (data.email !== undefined) {
            updates.push("email = ?");
            values.push(data.email);
        }

        if (updates.length === 0) return this.findById(id);

        values.push(id);
        const stmt = db.prepare(`
            UPDATE users SET ${updates.join(", ")} WHERE id = ?
        `);
        stmt.run(...values);

        return this.findById(id);
    }

    // DELETE
    delete(id: number): boolean {
        const stmt = db.prepare("DELETE FROM users WHERE id = ?");
        const result = stmt.run(id);
        return result.changes > 0;
    }
}
```

**¿Qué hace?**
- CRUD: Create, Read, Update, Delete
- Ejecuta queries SQL
- Devuelve objetos JavaScript
- NO tiene lógica de negocio, solo acceso a datos

---

### 2.6 Database - Conexión y tabla (db/sqlite.ts)
```typescript
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const DB_PATH = process.env.DB_PATH || "./data/app.db";

// Crear carpeta si no existe
const dir = path.dirname(DB_PATH);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

// Conectar a la base de datos
const db = new Database(DB_PATH, { verbose: console.log });

// Crear tabla users si no existe
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        created_at TEXT DEFAULT (datetime('now'))
    )
`);

console.log("✅ Database initialized");

export default db;
```

**¿Qué hace?**
- Conecta a SQLite
- Crea tablas si no existen
- Exporta la conexión para usar en repositories

---

### 2.7 Index - Punto de entrada (index.ts)
```typescript
import Fastify from "fastify";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import "./db/sqlite"; // Inicializar DB

dotenv.config(); // Cargar .env

const app = Fastify({ logger: true });

// Registrar rutas
app.register(userRoutes);

const PORT = process.env.PORT || 3000;

// Arrancar servidor
app.listen({ port: Number(PORT), host: "0.0.0.0" })
    .then(() => console.log(`🚀 Server running on port ${PORT}`));
```

**¿Qué hace?**
- Carga variables de entorno (.env)
- Crea servidor Fastify
- Registra todas las rutas
- Inicia la DB
- Arranca el servidor

---

## 🔗 3. FLUJO COMPLETO

```
1. Cliente:     POST /users {"name":"Juan","email":"juan@example.com"}
                  ↓
2. Gateway:     Verifica token JWT → Reenvía a user-service
                  ↓
3. Route:       POST /users → createUserController
                  ↓
4. Controller:  Extrae body → Llama userService.createUser()
                  ↓
5. Service:     Valida datos → Verifica email único → Llama userRepo.create()
                  ↓
6. Repository:  INSERT INTO users... → Devuelve user
                  ↓
7. Database:    Guarda en SQLite
                  ↓
8. Service:     Devuelve user al controller
                  ↓
9. Controller:  Devuelve 201 + JSON
                  ↓
10. Cliente:    Recibe {"id":1,"name":"Juan","email":"juan@example.com"}
```

---

## 🎨 4. EJEMPLO DE COMUNICACIÓN ENTRE MICROSERVICIOS

### Servicio A llama a Servicio B

```typescript
// En shift-service, necesitamos verificar que un usuario existe
// Llamamos al user-management-service

export class ShiftService {
    async assignShift(shiftId: number, userId: number) {
        // 1. Verificar que el usuario existe llamando a otro servicio
        const userExists = await this.checkUserExists(userId);
        if (!userExists) {
            throw new Error("User not found");
        }

        // 2. Asignar el turno
        return shiftRepo.update(shiftId, { assigned_user_id: userId });
    }

    private async checkUserExists(userId: number): Promise<boolean> {
        try {
            // Llamada HTTP interna entre servicios
            const response = await fetch(
                `http://user-management-service:8082/users/${userId}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                }
            );
            return response.ok;
        } catch (error) {
            return false;
        }
    }
}
```

**Notas importantes:**
- Usa el **nombre del servicio** en docker-compose, NO localhost
- `http://user-management-service:8082` NO `http://localhost:8082`
- Docker resuelve los nombres automáticamente

---

## 🔐 5. EJEMPLO DE AUTENTICACIÓN

### Endpoint protegido

```typescript
// En el Gateway, el middleware verifica el token ANTES de llegar al servicio

// gateway/src/middleware/authMiddleware.ts
export async function authMiddleware(req: FastifyRequest, reply: FastifyReply) {
    const authHeader = req.headers["authorization"];
    
    if (!authHeader) {
        return reply.code(401).send({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // "Bearer TOKEN" → "TOKEN"
    
    try {
        // Verificar token JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        
        // Añadir info del usuario a la request
        req.user = decoded;
        
        // Continuar con la petición
        return;
    } catch (error) {
        return reply.code(401).send({ error: "Invalid token" });
    }
}
```

### En tu servicio, recibir el usuario autenticado

```typescript
// El gateway inyecta headers x-user-id y x-username

export async function getMyShiftsController(
    req: FastifyRequest,
    reply: FastifyReply
) {
    // El gateway ya validó el token y añadió estos headers
    const userId = req.headers["x-user-id"] as string;
    
    const shifts = shiftService.getShiftsByUser(parseInt(userId));
    return reply.send(shifts);
}
```

---

## 🧪 6. EJEMPLO DE PRUEBAS

### Probar con curl

```bash
# 1. Login
TOKEN=$(curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"Test123!"}' \
  | jq -r '.accessToken')

# 2. Usar el token
curl http://localhost:8080/api/shifts \
  -H "Authorization: Bearer $TOKEN"
```

---

## 📊 7. VARIABLES DE ENTORNO (.env)

```bash
# Servicio de turnos
PORT=8083
DB_PATH=/app/data/shifts.db
NODE_ENV=development

# Secrets (nunca subir a git)
JWT_SECRET=mi-secreto-super-seguro-12345
```

Usar en el código:
```typescript
const PORT = process.env.PORT || 8083;
const DB_PATH = process.env.DB_PATH || "./data/shifts.db";
```

---

## 🎯 RESUMEN

1. **Route** = Define URLs
2. **Controller** = Maneja HTTP (request/response)
3. **Service** = Lógica de negocio (validaciones, reglas)
4. **Repository** = Acceso a base de datos (SQL)
5. **DB** = Conexión y esquema

**Regla de oro:** Cada capa solo habla con la siguiente. El Controller NO debe hablar directamente con el Repository.

---

## 🚀 ¿Listo para empezar?

Ahora que entiendes cómo funciona, sigue el `TUTORIAL_SHIFT_SERVICE.md` y crea tu servicio paso a paso copiando estos patrones.
