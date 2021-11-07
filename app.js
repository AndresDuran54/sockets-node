//Cargar las variables de entorno de nuestro .env
require("dotenv").config();

const Server = require("./models/server");

const server = new Server();

server.listen();