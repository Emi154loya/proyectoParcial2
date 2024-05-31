# Usa una imagen base de Node.js
FROM node:16

# Establece el directorio de trabajo en la imagen
WORKDIR /app

# Copia el contenido del proyecto al directorio de trabajo en la imagen
COPY server /app/server
COPY WWW /app/WWW


# Exponer el puerto en el que corre el servidor
EXPOSE 8888

# Define el entrypoint y el comando por defecto para ejecutar tu servidor
ENTRYPOINT ["node", "/app/server/server.js"]


