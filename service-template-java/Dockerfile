# Etapa de build con Maven
FROM maven:3.9.6-eclipse-temurin-17 AS builder

WORKDIR /app

# Copiar pom.xml y resolver dependencias
COPY pom.xml .
RUN mvn dependency:resolve

# Copiar el código fuente
COPY src ./src

# Construir JAR (skip tests si quieres más rápido)
RUN mvn package -DskipTests

# Etapa de runtime
FROM eclipse-temurin:17-jre

WORKDIR /app

# Copiar JAR desde la etapa builder
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
