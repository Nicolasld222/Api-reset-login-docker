# Usar una imagen base de Node.js
FROM node:18-alpine

# Crear un directorio de trabajo
WORKDIR /app

# Copiar los archivos del proyecto
COPY package*.json ./
RUN npm install
COPY . .

# Exponer el puerto donde corre tu API
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]