const { response, query } = require("express");





const usuariosGet = (req, res) => {

const{q, nombre, apiKey}= req.query;

  res.json({
    msg: "get-controlador ",
    q, nombre, apiKey

  });
};

const usuariosPost = (req, res) => {
  const {nombre,edad} = req.body;

  res.status(201).json({
    msg: "post -controlador",
  nombre,edad
  });

};

const usuariosPut = (req, res) => {
  const id = req.params.id
  res.json({
    msg: "put-controlador ",
    id
  });
};

const usuariosDelete = (req, res) => {
  res.json({
    msg: "delete - controlador ",
  });
};




module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
};
