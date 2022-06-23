const { response, query } = require("express");





const clienteGet = (req, res) => {

const{q, nombre, apiKey}= req.query;

  res.json({
    msg: "get-controlador  cliente",
    q, nombre, apiKey

  });
};

const clientePost = (req, res) => {
  const {nombre,edad} = req.body;

  res.status(201).json({
    msg: "post -controlador cliente",
  nombre,edad
  });

};

const clientePut = (req, res) => {
  const id = req.params.id
  res.json({
    msg: "put-controlador  cliente",
    id
  });
};

const clienteDelete = (req, res) => {
  res.json({
    msg: "delete - controlador cliente ",
  });
};




module.exports = {
  clienteGet,
  clientePost,
  clientePut,
  clienteDelete,
};
