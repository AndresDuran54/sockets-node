//Importamos express
const express = require('express');
var cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server{

    constructor(){
        //Obtenemos una instacia de expres
        this.app = express();
        
        //Obtenemos nuestro número de puerto
        this.port = process.env.PORT;

        this.server = require("http").createServer(this.app);

        this.io = require("socket.io")(this.server);

        this.paths = {
        }

        //Middlewares -> funciónes que añaden funcionalidades a nuestro RestServer, que se
        //ejecutan cuando levantamos el servidor
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();

        //Sockets
        this.sockets();
    }

    async conectarDb(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Directorio público
        this.app.use( express.static('public') );

        //La informacion que viene hacia el backend va a estar en formato de tipo JSON
        //Parsea el body en formato JSON
        this.app.use(express.json());
    }

    routes(){
        //Declaramos los path con sus respectivas subrutas para cada tipo de petición
        //this.app.use(this.paths.uploads, require('../routes/uploads'));
    }

    sockets(){
        this.io.on('connection', socketController);
    };

    listen(){
        //Iniciamos el servidor
        this.server.listen(this.port, () => {
            console.log("Servidor corriendo el puerto ", this.port);
        });
    };

}

module.exports = Server;