const express = require("express");
const cors = require("express");


class server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuarisoPath = "/api/usuarios";
    //middlewares
    this.middlewares();

    //rutas
    this.routes();

    //ruta del env
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
    this.app.listen(this.port, () => {
      console.log("servidor en  puerto ", this.port);
    });
  }
}

module.exports = server;
