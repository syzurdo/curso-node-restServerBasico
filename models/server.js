const express = require("express");
const cors = require("express");


class server {
  constructor() {
    this.app = express();
    this.usuarisoPath = "/api/usuarios";
    //middlewares
    this.middlewares();

    //rutas
    this.routes();

    //ruta del env
    this.port = process.env.port;
  }

  middlewares() {
    //cors
    this.app.use(cors());

    //parseo y lectura del body
    this.app.use(express.json());

    //directorio publico directorio raiz
    this.app.use(express.static("public"));
  }

  //rutas
  routes() {
    this.app.use(this.usuarisoPath, require("../routers/user"));
  }

  //servidor
  listen() {
    this.app.listen(process.env.port || 8080 , () => {
      console.log("servidor en  puerto ", process.env.port );
    });
  }
}

module.exports = server;
