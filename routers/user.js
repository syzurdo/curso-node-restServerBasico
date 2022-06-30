const { Router } = require("express");
const { check } = require("express-validator");
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosEliminados, 
  usuariosGetId,
} = require("../controllerrs/user");
const { esRolvalido, EmailExiste, UsuarioExiste, esEstadovalido } = require("../helpers/db-validator");

const { validarCampos } = require("../middleware/valida-campos");

const router = Router();

router.get("/", usuariosGet);

//b[usquueda de usuarios por id
router.get("/:id",[
  check ('id','no es un id valido').custom( UsuarioExiste),
  validarCampos
], usuariosGetId);
//usuarios eliminados
router.get("/eli", usuariosEliminados);

router.post("/",[
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe ser obligatorio y mas de 6 letras').isLength({min:6}),
  check('email', 'El correo no es valido').isEmail().custom(EmailExiste),
  check('rol_idrol').custom(  esRolvalido ),
  check('idestado').custom(esEstadovalido), 
  
validarCampos
] ,usuariosPost);





router.put("/:id",[
  check ('id','no es un id valido').custom( UsuarioExiste),
  check('email', 'El correo no es valido').isEmail(),
  check('rol_idrol').custom(  esRolvalido ),
  check('idestado').custom(esEstadovalido),
  validarCampos
], usuariosPut);





router.delete("/:id",[
check ('id','no es un id valido').custom( UsuarioExiste),
validarCampos],
usuariosDelete);

module.exports = router;
