## TABLAS DE LA BASE DE DATOS

### Tabla 1: `shifts` (Turnos) - PRINCIPAL

La tabla principal del servicio:

```sql
shifts
├── id (INTEGER PRIMARY KEY)
├── user_id (TEXT) - ID del usuario (viene del user-management-service)
├── user_name (TEXT) - Nombre del usuario (cache para no consultar siempre)
├── role (TEXT) - Rol: 'educator', 'therapist', 'caregiver', 'nurse', 'admin'
├── date (TEXT) - Fecha del turno '2025-11-21'
├── start_time (TEXT) - Hora inicio '09:00'
├── end_time (TEXT) - Hora fin '17:00'
├── hours (REAL) - Horas totales (calculado: 8.0)
├── status (TEXT) - Estado: 'scheduled', 'completed', 'cancelled', 'in_progress'
├── notes (TEXT) - Notas adicionales (opcional)
├── created_at (TEXT) - Cuándo se creó
├── updated_at (TEXT) - Última actualización
```

**Ejemplo de registro:**
```json
{
  "id": 1,
  "user_id": "user123",
  "user_name": "Juan Pérez",
  "role": "therapist",
  "date": "2025-11-21",
  "start_time": "09:00",
  "end_time": "17:00",
  "hours": 8.0,
  "status": "scheduled",
  "notes": "Turno de mañana - Terapia física",
  "created_at": "2025-11-20T10:30:00Z",
  "updated_at": "2025-11-20T10:30:00Z"
}
```

**Roles disponibles:**
- `educator` - Educador
- `therapist` - Terapeuta
- `caregiver` - Cuidador
- `nurse` - Enfermero
- `admin` - Administrativo

**Estados disponibles:**
- `scheduled` - Programado (futuro)
- `in_progress` - En curso (ahora)
- `completed` - Completado (pasado)
- `cancelled` - Cancelado

---

### Tabla 2: `shift_templates` (Plantillas de turnos) - OPCIONAL

Para turnos recurrentes:

```sql
shift_templates
├── id (INTEGER PRIMARY KEY)
├── name (TEXT) - Nombre: "Turno mañana educadores"
├── role (TEXT) - Rol
├── start_time (TEXT) - Hora inicio
├── end_time (TEXT) - Hora fin
├── days_of_week (TEXT) - JSON: ["monday", "tuesday", "wednesday"]
├── active (INTEGER) - 1 = activo, 0 = inactivo
├── created_at (TEXT)
```

**Para qué:**
- Crear turnos recurrentes fácilmente
- "Turno de mañana" siempre es 09:00-17:00
- Aplicar plantilla a múltiples días

---

### Tabla 3: `shift_swaps` (Intercambios de turnos) - OPCIONAL

Si el personal puede intercambiar turnos:

```sql
shift_swaps
├── id (INTEGER PRIMARY KEY)
├── shift_id (INTEGER) - Turno original
├── requester_user_id (TEXT) - Quien pide el cambio
├── target_user_id (TEXT) - A quién se lo pide
├── status (TEXT) - 'pending', 'accepted', 'rejected'
├── created_at (TEXT)
├── resolved_at (TEXT)
```

---

## 🛣️ ENDPOINTS DE LA API

### CRUD Básico de Turnos

#### 1. Obtener todos los turnos (con filtros)

```http
GET /api/shifts
GET /api/shifts?date=2025-11-21
GET /api/shifts?user_id=user123
GET /api/shifts?role=therapist
GET /api/shifts?status=scheduled
GET /api/shifts?start_date=2025-11-20&end_date=2025-11-30
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "user_name": "Juan Pérez",
      "role": "therapist",
      "date": "2025-11-21",
      "start_time": "09:00",
      "end_time": "17:00",
      "hours": 8.0,
      "status": "scheduled"
    }
  ],
  "total": 1
}
```

**Query parameters opcionales:**
- `date` - Filtrar por fecha específica (YYYY-MM-DD)
- `user_id` - Filtrar por usuario
- `role` - Filtrar por rol
- `status` - Filtrar por estado
- `start_date` + `end_date` - Rango de fechas
- `page` - Número de página (paginación)
- `limit` - Resultados por página

---

## 📋 RESUMEN DE ENDPOINTS

### CRUD Básico (5 endpoints)
```
GET    /api/shifts              - Listar todos (con filtros)
GET    /api/shifts/:id          - Obtener uno específico
POST   /api/shifts              - Crear nuevo turno
PUT    /api/shifts/:id          - Actualizar turno
DELETE /api/shifts/:id          - Eliminar turno
```

### Consultas Específicas (4 endpoints)
```
GET    /api/shifts/user/:userId - Turnos de un usuario
GET    /api/shifts/date/:date   - Turnos de una fecha
GET    /api/shifts/range        - Turnos en rango de fechas
GET    /api/shifts/role/:role   - Turnos por rol
```

### Funcionalidades Avanzadas (3 endpoints)
```
GET    /api/shifts/stats        - Estadísticas y reportes
PATCH  /api/shifts/:id/status   - Cambiar estado de turno
POST   /api/shifts/check-availability - Verificar disponibilidad
```

**Total: 12 endpoints**



#### 2. Obtener un turno específico

```http
GET /api/shifts/:id
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "user_id": "user123",
    "user_name": "Juan Pérez",
    "role": "therapist",
    "date": "2025-11-21",
    "start_time": "09:00",
    "end_time": "17:00",
    "hours": 8.0,
    "status": "scheduled",
    "notes": "Turno de mañana",
    "created_at": "2025-11-20T10:30:00Z",
    "updated_at": "2025-11-20T10:30:00Z"
  }
}
```

**Error (turno no encontrado):**
```json
{
  "success": false,
  "error": "Turno no encontrado"
}
```

---

#### 3. Crear un turno

```http
POST /api/shifts
```

**Body (JSON):**
```json
{
  "user_id": "user123",
  "user_name": "Juan Pérez",
  "role": "therapist",
  "date": "2025-11-21",
  "start_time": "09:00",
  "end_time": "17:00",
  "notes": "Turno de mañana"
}
```

**Campos obligatorios:**
- `user_id` - ID del usuario
- `user_name` - Nombre del usuario
- `role` - Rol del personal
- `date` - Fecha del turno
- `start_time` - Hora de inicio
- `end_time` - Hora de fin

**Campos opcionales:**
- `notes` - Notas adicionales

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Turno creado exitosamente",
  "data": {
    "id": 1,
    "user_id": "user123",
    "user_name": "Juan Pérez",
    "role": "therapist",
    "date": "2025-11-21",
    "start_time": "09:00",
    "end_time": "17:00",
    "hours": 8.0,
    "status": "scheduled",
    "created_at": "2025-11-20T10:30:00Z"
  }
}
```

**Validaciones:**
- Las horas se calculan automáticamente (end_time - start_time)
- El estado se establece como 'scheduled' por defecto
- Se verifica que end_time > start_time
- Se verifica formato de fecha (YYYY-MM-DD)
- Se verifica formato de hora (HH:MM)

---

#### 4. Actualizar un turno

```http
PUT /api/shifts/:id
```

**Body (JSON):**
```json
{
  "start_time": "10:00",
  "end_time": "18:00",
  "notes": "Turno modificado"
}
```

**Campos actualizables:**
- `start_time` - Nueva hora de inicio
- `end_time` - Nueva hora de fin
- `date` - Nueva fecha
- `role` - Nuevo rol
- `status` - Nuevo estado
- `notes` - Nuevas notas

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Turno actualizado exitosamente",
  "data": {
    "id": 1,
    "user_id": "user123",
    "start_time": "10:00",
    "end_time": "18:00",
    "hours": 8.0,
    "notes": "Turno modificado",
    "updated_at": "2025-11-20T11:00:00Z"
  }
}
```

---

#### 5. Eliminar un turno

```http
DELETE /api/shifts/:id
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Turno eliminado exitosamente"
}
```

**Error:**
```json
{
  "success": false,
  "error": "Turno no encontrado"
}
```

---

### Endpoints Especializados

#### 6. Obtener turnos por usuario

```http
GET /api/shifts/user/:userId
GET /api/shifts/user/:userId?month=11&year=2025
```

**Para qué:** Ver todos los turnos de un empleado específico

**Respuesta:**
```json
{
  "success": true,
  "user_id": "user123",
  "user_name": "Juan Pérez",
  "data": [
    {
      "id": 1,
      "date": "2025-11-21",
      "start_time": "09:00",
      "end_time": "17:00",
      "hours": 8.0,
      "role": "therapist",
      "status": "scheduled"
    }
  ],
  "total_hours": 160,
  "total_shifts": 20
}
```

---

#### 7. Obtener turnos por fecha

```http
GET /api/shifts/date/:date
```

**Ejemplo:** `GET /api/shifts/date/2025-11-21`

**Para qué:** Ver quién trabaja un día específico

**Respuesta:**
```json
{
  "success": true,
  "date": "2025-11-21",
  "data": [
    {
      "id": 1,
      "user_name": "Juan Pérez",
      "role": "therapist",
      "start_time": "09:00",
      "end_time": "17:00"
    },
    {
      "id": 2,
      "user_name": "María García",
      "role": "educator",
      "start_time": "08:00",
      "end_time": "16:00"
    }
  ],
  "total_staff": 2
}
```

---

#### 8. Obtener turnos por rango de fechas

```http
GET /api/shifts/range?start=2025-11-20&end=2025-11-30
```

**Para qué:** Planificación semanal/mensual

**Respuesta:**
```json
{
  "success": true,
  "start_date": "2025-11-20",
  "end_date": "2025-11-30",
  "data": [
    {
      "id": 1,
      "user_name": "Juan Pérez",
      "date": "2025-11-21",
      "start_time": "09:00",
      "end_time": "17:00"
    }
  ],
  "total": 45
}
```

---

#### 9. Obtener turnos por rol

```http
GET /api/shifts/role/:role
```

**Ejemplo:** `GET /api/shifts/role/therapist`

**Para qué:** Ver todos los turnos de terapeutas, educadores, etc.

**Respuesta:**
```json
{
  "success": true,
  "role": "therapist",
  "data": [
    {
      "id": 1,
      "user_name": "Juan Pérez",
      "date": "2025-11-21",
      "start_time": "09:00",
      "end_time": "17:00"
    }
  ],
  "total": 30
}
```

---

#### 10. Estadísticas de turnos

```http
GET /api/shifts/stats
GET /api/shifts/stats?month=11&year=2025
```

**Para qué:** Panel de control, reportes para dirección

**Respuesta:**
```json
{
  "success": true,
  "period": "2025-11",
  "data": {
    "total_shifts": 120,
    "total_hours": 960,
    "by_role": {
      "therapist": 40,
      "educator": 50,
      "caregiver": 30
    },
    "by_status": {
      "scheduled": 80,
      "completed": 35,
      "cancelled": 5
    },
    "by_user": [
      {
        "user_id": "user123",
        "user_name": "Juan Pérez",
        "total_hours": 160,
        "total_shifts": 20
      },
      {
        "user_id": "user456",
        "user_name": "María García",
        "total_hours": 144,
        "total_shifts": 18
      }
    ],
    "coverage": {
      "average_staff_per_day": 4.2,
      "days_with_full_coverage": 25,
      "days_with_gaps": 5
    }
  }
}
```

---

#### 11. Cambiar estado de turno

```http
PATCH /api/shifts/:id/status
```

**Body:**
```json
{
  "status": "completed"
}
```

**Estados válidos:**
- `scheduled` - Programado
- `in_progress` - En curso
- `completed` - Completado
- `cancelled` - Cancelado

**Para qué:** Marcar turno como completado al finalizar el día

**Respuesta:**
```json
{
  "success": true,
  "message": "Estado actualizado",
  "data": {
    "id": 1,
    "status": "completed",
    "updated_at": "2025-11-21T18:00:00Z"
  }
}
```

---

#### 12. Verificar disponibilidad

```http
POST /api/shifts/check-availability
```

**Body:**
```json
{
  "user_id": "user123",
  "date": "2025-11-21",
  "start_time": "09:00",
  "end_time": "17:00"
}
```

**Para qué:** Evitar asignar turnos solapados al mismo empleado

**Respuesta (disponible):**
```json
{
  "success": true,
  "available": true,
  "message": "El usuario está disponible en este horario"
}
```

**Respuesta (conflicto):**
```json
{
  "success": true,
  "available": false,
  "message": "El usuario ya tiene turnos asignados en este horario",
  "conflicts": [
    {
      "id": 5,
      "date": "2025-11-21",
      "start_time": "08:00",
      "end_time": "16:00",
      "role": "therapist"
    }
  ]
}
```
---

## 🎯 PRIORIDADES DE IMPLEMENTACIÓN

### Fase 1 - Básico (Empezar aquí)
1. ✅ GET /api/shifts (listar)
2. ✅ GET /api/shifts/:id (obtener uno)
3. ✅ POST /api/shifts (crear)
4. ✅ PUT /api/shifts/:id (actualizar)
5. ✅ DELETE /api/shifts/:id (eliminar)

### Fase 2 - Consultas
6. ✅ GET /api/shifts/user/:userId
7. ✅ GET /api/shifts/date/:date
8. ✅ GET /api/shifts/range

### Fase 3 - Avanzado
9. ✅ GET /api/shifts/stats
10. ✅ PATCH /api/shifts/:id/status
11. ✅ POST /api/shifts/check-availability
12. ✅ GET /api/shifts/role/:role

---

## 🔐 CONSIDERACIONES DE SEGURIDAD

**Autenticación:**
- Todos los endpoints (excepto health checks) requieren autenticación
- El token JWT debe venir en el header: `Authorization: Bearer TOKEN`
- El Gateway inyecta `x-user-id` y `x-username` en las peticiones

**Autorización:**
- `admin` puede ver/modificar todos los turnos
- Personal puede ver solo sus propios turnos
- Coordinadores pueden ver turnos de su equipo

**Validaciones:**
- Verificar que las fechas sean válidas
- Verificar que end_time > start_time
- Verificar que no haya solapamientos
- Verificar que el rol sea válido

---

## 📊 CASOS DE USO PRINCIPALES

### 1. Crear turno semanal para un terapeuta
```
POST /api/shifts (× 5 veces, lunes a viernes)
```

### 2. Ver quién trabaja mañana
```
GET /api/shifts/date/2025-11-22
```

### 3. Ver mis turnos del mes
```
GET /api/shifts/user/user123?month=11&year=2025
```

### 4. Generar reporte mensual
```
GET /api/shifts/stats?month=11&year=2025
```

### 5. Marcar turno como completado
```
PATCH /api/shifts/5/status
{ "status": "completed" }
```

### 6. Verificar antes de asignar turno
```
POST /api/shifts/check-availability
```

---

## 🎨 INTEGRACIÓN CON OTROS MÓDULOS

### Con User Management Service:
- `user_id` viene de allí
- `user_name` se cachea aquí para performance
- Roles del personal definidos allá

### Con Panel de Control:
- Endpoint `/api/shifts/stats` provee datos
- Gráficas de cobertura de personal
- Horas trabajadas por empleado

### Con Comunicación Interna:
- Notificar cambios de turno
- Alertas de turnos sin cubrir
- Recordatorios de turnos próximos

---

## ✅ VALIDACIONES A IMPLEMENTAR

**En creación de turno:**
- ✅ Fecha no puede ser en el pasado (opcional, puede ser para registro histórico)
- ✅ start_time < end_time
- ✅ Formato de fecha: YYYY-MM-DD
- ✅ Formato de hora: HH:MM
- ✅ Rol válido (de la lista permitida)
- ✅ user_id y user_name obligatorios

**En actualización:**
- ✅ Turno existe
- ✅ Mismas validaciones que en creación

**En eliminación:**
- ✅ Turno existe
- ✅ (Opcional) Solo se pueden eliminar turnos futuros

---

Este diseño cubre todas las necesidades de gestión de turnos para la Fundación Nexe. 🚀