const express = require("express");
const cors = require("express");

class server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuarisoPath = "/api/usuarios";
    this.cllentePath = "/api/cliente";

    //middlewares
    this.middlewares();

    //rutas
    this.routes();

    //conexion base de datos
    this.pool();
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
    this.app.use(this.cllentePath, require("../routers/cliente"));
  }
  pool() {
    const pool = require("../database/db");
  }
  //servidor
  async listen() {
    this.app.listen(this.port, () => {
      console.log("servidor en  puerto ", this.port);
    });
  }
}

module.exports = server;
