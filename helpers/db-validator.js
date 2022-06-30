const pool = require("../database/db");

const esRolvalido = async (rol_idrol = "") => {
  return new Promise(async (resolve, reject) => {
    await pool.query(
      "select * from rol where idrol = ?",
      rol_idrol,
      (error, res) => {
        if (res.length <= 0) {
          reject(new Error("El rol no existe "));
        }
        resolve(true);
      }
    );
  });
};

const esEstadovalido = async (idestado = "") => {
  return new Promise(async (resolve, reject) => {
    await pool.query(
      "select * from estado where idestado = ?",
      idestado,
      (error, res) => {
        if (res.length <= 0) {
          reject(new Error("El Estado no existe "));
        }
        resolve(true);
      }
    );
  });
};



const EmailExiste =async (email = "") => {
    return new Promise(async (resolve, reject) => {
      await pool.query(
        "select * from usuarios where email = ?",
     email,
        (error, res) => {
          if (res.length > 0) {
            reject(new Error("Ya existe un correo registrado "));
          }
          resolve(true);
        }
      );
    });
  }; 

  const UsuarioExiste =async (id = "") => {
    return new Promise(async (resolve, reject) => {
      await pool.query(
        "select * from usuarios where id = ? ",
     id,
        (error, res) => {

          if (res.length <= 0) {
            reject(new Error("Identificador invalido "));
          }
          resolve(true);
        }
      );
    });
  }; 

 

module.exports = {
  esRolvalido,
  EmailExiste,
  UsuarioExiste,
  esEstadovalido
};
