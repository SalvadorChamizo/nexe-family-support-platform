# ⚡ INICIO RÁPIDO - Para Empezar YA

## ✅ PASO 1: Levantar el proyecto

```bash
# Desde la raíz del proyecto
cd /home/sbenitez/repositorios/nexe-family-support-platform

# Levantar todo
sudo docker-compose up -d

# Ver que todo está corriendo
sudo docker-compose ps

# Ver logs en tiempo real
sudo docker-compose logs -f
```

## ✅ PASO 2: Probar que funciona

```bash
# Probar el gateway
curl http://localhost:8080/ping
# Debería responder: {"pong":true}

# Ver info del sistema
curl http://localhost:8080/info
```

## ✅ PASO 3: Probar la autenticación

### Registrar un usuario
```bash
curl -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test_user",
    "password": "Test1234!",
    "email": "test@example.com"
  }'
```

### Hacer login
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test_user",
    "password": "Test1234!"
  }'
```

Esto te dará un `accessToken`. Guárdalo:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "test_user",
    "email": "test@example.com"
  }
}
```

### Usar el token en requests protegidas
```bash
# Guarda el token en una variable
TOKEN="tu-token-aqui"

# Usa el token en headers
curl http://localhost:8080/users/profile \
  -H "Authorization: Bearer $TOKEN"
```

## ✅ PASO 4: Comandos útiles

```bash
# Ver logs de un servicio específico
sudo docker-compose logs -f gateway
sudo docker-compose logs -f auth-service

# Reiniciar un servicio
sudo docker-compose restart gateway

# Parar todo
sudo docker-compose down

# Parar y borrar volúmenes (⚠️ borra datos)
sudo docker-compose down -v

# Rebuild un servicio específico
sudo docker-compose up -d --build gateway

# Ver qué puertos están expuestos
sudo docker-compose ps
```

## ✅ PASO 5: Crear TU servicio

1. **Copia el template:**
```bash
cp -r service_template/ shift-scheduling-service
```

2. **Sigue el tutorial:**
Abre y lee `TUTORIAL_SHIFT_SERVICE.md`

3. **Añádelo al docker-compose.yml**

4. **Levántalo:**
```bash
sudo docker-compose up -d --build shift-scheduling-service
```

## 🐛 Troubleshooting

### El servicio no arranca
```bash
# Ver logs
sudo docker-compose logs nombre-del-servicio

# Rebuild limpio
sudo docker-compose build --no-cache nombre-del-servicio
sudo docker-compose up -d nombre-del-servicio
```

### Puerto en uso
```bash
# Ver qué usa el puerto 8080
sudo lsof -i :8080

# Matar el proceso
sudo kill -9 <PID>

# O cambiar el puerto en docker-compose.yml
```

### Los cambios no se reflejan
```bash
# Rebuild completo
sudo docker-compose down
sudo docker-compose up --build -d
```

### Error "Cannot connect to Docker daemon"
```bash
# Iniciar Docker
sudo systemctl start docker

# Ver estado
sudo systemctl status docker
```

## 📚 Próximos pasos

1. ✅ Lee `GUIA_INICIO.md` - Guía completa y detallada
2. ✅ Lee `TUTORIAL_SHIFT_SERVICE.md` - Cómo crear tu servicio paso a paso
3. ✅ Prueba los endpoints con Postman o Thunder Client
4. ✅ Empieza a codificar tu servicio

## 🎯 Estado actual del sistema

- ✅ Gateway funcionando en puerto 8080
- ✅ Auth Service funcionando en puerto 8081
- ⚠️ User Management Service - comentado (no existe la carpeta)
- ⚠️ Frontend - comentado (no existe la carpeta)
- ✅ Base de datos SQLite con persistencia en volúmenes

## 🚀 ¡Ya puedes empezar!

El sistema está listo. Ahora:
1. Experimenta con los endpoints existentes
2. Crea tu servicio de shift-scheduling
3. Añade nuevas funcionalidades

**¿Dudas?** Consulta las guías:
- `GUIA_INICIO.md` - Conceptos y explicaciones
- `TUTORIAL_SHIFT_SERVICE.md` - Tutorial paso a paso
- Este archivo - Comandos rápidos
