const { Router } = require("express");
const {
  clienteGet,
  clientePost,
  clientePut,
  clienteDelete,
} = require("../controllerrs/cliente");

const router = Router();

router.get("/", clienteGet);

router.post("/", clientePost);

router.put("/:id", clientePut);
router.delete("/:id", clienteDelete);

module.exports = router;
