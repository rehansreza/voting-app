# Use lightweight JDK 17 image
FROM eclipse-temurin:17-jdk-alpine

# Set working directory
WORKDIR /app

# Copy the Spring Boot JAR (adjust name if needed)
COPY target/votingapp-*.jar app.jar

# Expose backend port
EXPOSE 8090

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
