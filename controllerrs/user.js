const { response, query, json } = require("express");
const bcrypjs = require("bcryptjs");
const pool = require("../database/db");

const usuariosGet = async (req, res) => {
  const { q, nombre, apiKey } = req.query;

// await pool.query(
//     "select count(*) as total from usuarios ;",
//     (error, resultado) => {
//       if (error) throw error;
//       res.status(201).json({
//         usuario: resultado[0].total,
//       });
//     }
//   );


  await pool.query(
    "select * from usuarios where idestado=1", 
    (error, resultado) => {
      if (error) throw error;
      res.status(201).json({
        usuario: resultado,
      });
    }
  );
  
};
const usuariosGetId = async (req, res) => {
id=req.params.id
  await pool.query(
    "select * from usuarios where idestado=1 and id=?",id, 
    (error, resultado) => {
      if (error) throw error;
      res.status(201).json({
        usuario: resultado,
      });
    }
  );
  
};
const usuariosEliminados = async (req, res) => {

  await pool.query(
    "select * from usuarios where idestado=2", 
    (error, resultado) => {
      if (error) throw error;
      res.status(201).json({
        usuario: resultado,
      });
    }
  );
  
};

const usuariosPost = async (req, res) => {
  //validaciones del express validator

  //variables recibidas del body
  const { nombre, email, password, rol_idrol, idestado } = req.body;
  const newuser = {
    nombre,
    email,
    password,
    rol_idrol,
    idestado

  };

  //encriptar la contraseña
  const salt = bcrypjs.genSaltSync(10);
  newuser.password = bcrypjs.hashSync(password, salt);

  //guardar en base de datos
  await pool.query(
    "insert into usuarios set ?",
    [newuser],
    (error, resultado) => {
      const newuser = {
        nombre,
        email,
        rol_idrol,
      };
      if (error) throw error;
      res.status(201).json({
        msg: "Ingresado exitosamente",
        usuario: newuser,
      });
    }
  );
};

const usuariosPut = async (req, res) => {
  const ids = req.params.id;
  const { nombre, email, password, rol_idrol,idestado } = req.body;
  const newuser = { nombre, email, password, rol_idrol,idestado };
  const pass = { nombre, email, rol_idrol,idestado };

  await pool.query(
    "select * from usuarios where email = ? and id !=?; ",
    [email, ids],
    async (err, resu) => {
      if (err) throw error;
      if (resu.length > 0) {
        res.json({
          msg: "Correo ya registrado",
        });
      } else {
        if (password) {
          const salt = bcrypjs.genSaltSync(10);
          newuser.password = bcrypjs.hashSync(password, salt);
          await pool.query(
            "update usuarios set ? where id=?",
            [newuser, ids],
            (err, resu) => {
              if (err) throw error;
            }
          );
        } else if (password == "" || !password) {
          await pool.query(
            "update usuarios set ? where id=?",
            [pass, ids],
            (err, resu) => {
              if (err) throw error;
            }
          );
        }

        res.status(201).json({
          msg: "Ingresado exitosamente",
          usuario: pass,
        });
      }
    }
  );
};

const usuariosDelete = async (req, res) => {
  id=req.params.id
  const { idestado } = req.body;
const idestados ={
  idestado};
idestados.idestado=2;
await pool.query(
  "update usuarios set ? where id=?",
  [idestados, id],
  (err, resu) => {
    res.json({
             msg: "Borrado exitosamente ",
             id
           });
  }
);
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosEliminados ,
  usuariosGetId 
};
