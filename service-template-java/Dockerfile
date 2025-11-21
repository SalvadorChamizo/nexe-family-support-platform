FROM maven:3.9.6-eclipse-temurin-17 as dev

WORKDIR /app

# Copy only pom.xml first to cache dependencies
COPY pom.xml ./
RUN mvn -q dependency:resolve

# Copy the rest of the project
COPY src ./src

# Default command: run application in dev mode
CMD ["mvn", "spring-boot:run"]