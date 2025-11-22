# 🚀 GUÍA COMPLETA PARA EMPEZAR CON EL PROYECTO

## 📖 ¿Qué es esto?

Este es un proyecto de **microservicios** - varios "mini-programas" que trabajan juntos.
Cada uno hace una cosa específica y se comunican entre sí.

---

## 🏗️ Arquitectura Simplificada

```
TU NAVEGADOR (localhost:8080)
        ↓
    [GATEWAY] ← El "portero" - decide a dónde va cada petición
        ↓
    ┌──────────────┬─────────────────┬──────────────┐
    ↓              ↓                 ↓              ↓
[AUTH]         [USUARIOS]      [FRONTEND]    [TU SERVICIO]
Login/2FA      Gestión users   React/Vue     Lo que hagas
:8081          :8082           :5173         :808X
```

---

## ⚙️ PASO 1: Preparar el entorno

### 1.1 Docker está instalado ✅
Ya lo hicimos. Pero necesitas **cerrar tu sesión y volver a entrar** para usar Docker sin sudo.

### 1.2 Verificar que funciona
```bash
# Después de reiniciar sesión:
docker ps
```

Si no da error, estás listo.

---

## 🚀 PASO 2: Ejecutar el proyecto por primera vez

### Opción A: Usando Make (recomendado)
```bash
# Desde la raíz del proyecto
make up
```

Esto:
1. Construye todas las imágenes Docker
2. Inicia todos los servicios
3. Los conecta en una red interna

### Opción B: Docker Compose directo
```bash
sudo docker compose up --build -d
```

### Ver los logs
```bash
# Ver todos los logs
sudo docker compose logs -f

# Ver logs de un servicio específico
sudo docker compose logs -f gateway
sudo docker compose logs -f auth-service
```

### Ver qué servicios están corriendo
```bash
sudo docker compose ps
```

---

## 🛑 PASO 3: Parar el proyecto

```bash
# Con Make
make down

# Con Docker Compose
sudo docker compose down
```

---

## 🔍 PASO 4: Entender la estructura de UN microservicio

Todos siguen el mismo patrón:

```
mi-servicio/
├── Dockerfile              # Cómo se construye el contenedor
├── package.json            # Dependencias de Node.js
├── tsconfig.json           # Configuración de TypeScript
├── .env                    # Variables de entorno (NO subir a git)
└── src/
    ├── index.ts            # ⭐ PUNTO DE ENTRADA - Arranca el servidor
    │
    ├── routes/             # Define las URLs (endpoints)
    │   └── miRoutes.ts     # Ejemplo: GET /users, POST /users
    │
    ├── controllers/        # Maneja las peticiones HTTP
    │   └── miController.ts # Recibe request, llama service, devuelve response
    │
    ├── services/           # Lógica de negocio
    │   └── miService.ts    # Aquí va tu código principal
    │
    ├── repositories/       # Acceso a base de datos
    │   └── miRepository.ts # CRUD: Create, Read, Update, Delete
    │
    ├── db/                 # Configuración de base de datos
    │   └── sqlite.ts       # Conexión a SQLite
    │
    ├── schemas/            # Validación de datos (opcional)
    │   └── miSchemas.ts    # Define qué datos son válidos
    │
    └── utils/              # Funciones útiles
        └── utils.ts        # Helpers varios
```

---

## 🎯 PASO 5: Crear TU microservicio

### 5.1 Usa el template

```bash
# Copia el template
cp -r service_template/ shift-scheduling-service

# O para Java
cp -r service-template-java/ shift-scheduling-service-java
```

### 5.2 Estructura recomendada para SHIFT SCHEDULING

```
shift-scheduling-service/
└── src/
    ├── index.ts
    ├── routes/
    │   └── shiftRoutes.ts          # Endpoints de turnos
    │
    ├── controllers/
    │   └── shiftController.ts      # Maneja requests
    │
    ├── services/
    │   └── shiftService.ts         # Lógica: asignar turnos, validar, etc.
    │
    ├── repositories/
    │   └── shiftRepository.ts      # Guardar/leer turnos de DB
    │
    └── db/
        └── sqlite.ts               # Base de datos de turnos
```

### 5.3 Ejemplos de endpoints que podrías hacer

```typescript
// En shiftRoutes.ts
POST   /shifts              # Crear un turno
GET    /shifts              # Listar todos los turnos
GET    /shifts/:id          # Ver un turno específico
PUT    /shifts/:id          # Modificar un turno
DELETE /shifts/:id          # Eliminar un turno
GET    /shifts/user/:userId # Turnos de un usuario
GET    /shifts/date/:date   # Turnos de una fecha
```

---

## 🔗 PASO 6: Conectar tu servicio al sistema

### 6.1 Añadir al docker-compose.yml

```yaml
  shift-scheduling-service:
    build: ./shift-scheduling-service
    expose:
      - "8083"  # Tu puerto
    depends_on:
      - node-base
    volumes:
      - shift_data:/app/data
    networks:
      - backend
```

Y añade el volumen:

```yaml
volumes:
  auth_data:
  user_data:
  shift_data:  # Añade esto
  frontend_dist:
```

### 6.2 Añadir ruta en el Gateway

Crea/edita `gateway/src/routes/shiftRoutes.ts`:

```typescript
import { FastifyInstance } from "fastify";
import fastifyHttpProxy from "@fastify/http-proxy";

export default async function shiftRoutes(app: FastifyInstance) {
    app.register(fastifyHttpProxy, {
        upstream: "http://shift-scheduling-service:8083",
        prefix: "/shifts",
        rewritePrefix: "",
    });
}
```

Y regístrala en `gateway/src/index.ts`:

```typescript
import shiftRoutes from "./routes/shiftRoutes";
// ...
app.register(shiftRoutes);
```

---

## 🧪 PASO 7: Probar tu servicio

### Usando curl
```bash
# Crear un turno
curl -X POST http://localhost:8080/shifts \
  -H "Content-Type: application/json" \
  -d '{"userId": 1, "date": "2025-11-21", "startTime": "09:00", "endTime": "17:00"}'

# Listar turnos
curl http://localhost:8080/shifts
```

### Usando Postman o Thunder Client (VS Code)
1. Instala la extensión "Thunder Client" en VS Code
2. Crea una nueva request
3. URL: `http://localhost:8080/shifts`
4. Método: GET/POST/PUT/DELETE

---

## 📚 PASO 8: Comandos útiles Docker

```bash
# Ver servicios corriendo
sudo docker compose ps

# Ver logs en tiempo real
sudo docker compose logs -f

# Entrar dentro de un contenedor (para debug)
sudo docker compose exec gateway sh
sudo docker compose exec auth-service sh

# Reiniciar un servicio específico
sudo docker compose restart gateway

# Reconstruir un servicio sin afectar otros
sudo docker compose up -d --build shift-scheduling-service

# Limpiar todo (⚠️ borra volúmenes/datos)
make fclean
```

---

## 🐛 PASO 9: Debugging

### Ver qué está fallando
```bash
# Logs del servicio que falla
sudo docker compose logs gateway
sudo docker compose logs auth-service

# Ver el estado
sudo docker compose ps
```

### Errores comunes

**"Cannot connect to service"**
- Los servicios se llaman por su nombre en docker-compose, no localhost
- Usa: `http://auth-service:8081` NO `http://localhost:8081`

**"Port already in use"**
```bash
# Ver qué usa el puerto
sudo lsof -i :8080
# Matar el proceso
sudo kill -9 <PID>
```

**"Module not found"**
```bash
# Reconstruir el contenedor
sudo docker compose up -d --build <servicio>
```

---

## 📖 PASO 10: Flujo de trabajo diario

```bash
# 1. Haces cambios en tu código
# 2. Rebuild solo tu servicio
sudo docker compose up -d --build shift-scheduling-service

# 3. Ver logs
sudo docker compose logs -f shift-scheduling-service

# 4. Probar con curl/Postman

# 5. Si algo va mal, ver logs de todos
sudo docker compose logs -f
```

---

## 🎓 CONCEPTOS CLAVE

### ¿Por qué Docker?
- Todos tienen el mismo entorno (evita "en mi máquina funciona")
- Fácil de levantar/bajar servicios
- Los servicios están aislados

### ¿Por qué Gateway?
- Un solo punto de entrada
- Maneja la autenticación en un lugar
- Los servicios internos no se exponen directamente

### ¿Por qué microservicios?
- Cada uno hace una cosa y la hace bien
- Puedes escalar solo lo que necesitas
- Si uno falla, los demás siguen funcionando
- Diferentes equipos pueden trabajar en paralelo

---

## 🆘 AYUDA RÁPIDA

### ¿El proyecto no arranca?
```bash
sudo docker compose down
sudo docker compose up --build
```

### ¿Cambios no se reflejan?
```bash
# Rebuild con caché limpio
sudo docker compose build --no-cache <servicio>
sudo docker compose up -d <servicio>
```

### ¿Base de datos perdida?
Los volúmenes persisten los datos. Si haces `make fclean` o `docker compose down -v` se borran.

---

## 📞 SIGUIENTE PASO

1. ✅ Instala Docker (hecho)
2. ⏭️ Ejecuta `make up` y ve los logs
3. ⏭️ Prueba llamar al gateway: `curl http://localhost:8080/ping`
4. ⏭️ Copia el template y empieza tu servicio
5. ⏭️ Añádelo al docker-compose
6. ⏭️ Añade la ruta en el gateway
7. ⏭️ Prueba tu endpoint

**¡Empieza con algo simple!** Por ejemplo, un endpoint que devuelva "Hello from shift service".
